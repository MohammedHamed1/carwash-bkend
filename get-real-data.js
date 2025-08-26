const mongoose = require('mongoose');

// استخدام بيانات الاتصال الصحيحة
const MONGODB_URI = 'mongodb+srv://elhadad3593:NIqGTCLDJJFOFbtf@cluster0.3vqlnfg.mongodb.net/paypass?retryWrites=true&w=majority';

// تعريف النماذج
const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  features: [{ type: String }],
  popular: { type: Boolean, default: false },
  washes: { type: Number, required: true },
  savings: { type: Number, required: true },
  duration: { type: Number, required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], required: true },
}, { timestamps: true });

const carSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true, unique: true },
  color: { type: String },
  type: { type: String, enum: ['sedan', 'suv', 'truck', 'van', 'coupe', 'convertible', 'wagon', 'other'], required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], required: true },
}, { timestamps: true });

const washingPlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, required: true },
  email: { type: String, default: null },
  location: {
    type: String, default: 'Point'
  },
  city: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  customers: { type: Number }
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);
const Car = mongoose.model('Car', carSchema);
const WashingPlace = mongoose.model('WashingPlace', washingPlaceSchema);

async function getRealData() {
  try {
    console.log('🔗 الاتصال بقاعدة البيانات...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ تم الاتصال بنجاح!');

    console.log('\n📦 === الباقات الموجودة ===');
    const packages = await Package.find();
    if (packages.length === 0) {
      console.log('❌ لا توجد باقات في قاعدة البيانات');
    } else {
      packages.forEach((pkg, index) => {
        console.log(`${index + 1}. ${pkg.name}`);
        console.log(`   السعر الأساسي: ${pkg.basePrice} ريال`);
        console.log(`   السعر الأصلي: ${pkg.originalPrice} ريال`);
        console.log(`   عدد الغسلات: ${pkg.washes}`);
        console.log(`   التوفير: ${pkg.savings} ريال`);
        console.log(`   المدة: ${pkg.duration} يوم`);
        console.log(`   حجم السيارة: ${pkg.size}`);
        console.log(`   المميزات: ${pkg.features.join(', ')}`);
        console.log(`   شائع: ${pkg.popular ? 'نعم' : 'لا'}`);
        console.log('');
      });
    }

    console.log('\n🚗 === أحجام السيارات ===');
    const cars = await Car.find();
    if (cars.length === 0) {
      console.log('❌ لا توجد سيارات في قاعدة البيانات');
    } else {
      const sizes = [...new Set(cars.map(car => car.size))];
      console.log('الأحجام الموجودة:', sizes);
      cars.forEach((car, index) => {
        console.log(`${index + 1}. ${car.make} ${car.model} (${car.year})`);
        console.log(`   اللوحة: ${car.licensePlate}`);
        console.log(`   الحجم: ${car.size}`);
        console.log(`   النوع: ${car.type}`);
        console.log(`   اللون: ${car.color}`);
        console.log('');
      });
    }

    console.log('\n🏢 === المغاسل الموجودة ===');
    const washingPlaces = await WashingPlace.find();
    if (washingPlaces.length === 0) {
      console.log('❌ لا توجد مغاسل في قاعدة البيانات');
    } else {
      washingPlaces.forEach((place, index) => {
        console.log(`${index + 1}. ${place.name}`);
        console.log(`   العنوان: ${place.address}`);
        console.log(`   المدينة: ${place.city}`);
        console.log(`   الهاتف: ${place.phone}`);
        console.log(`   ساعات العمل: ${place.hours}`);
        console.log(`   التقييم: ${place.rating || 'غير محدد'}`);
        console.log(`   عدد العملاء: ${place.customers || 'غير محدد'}`);
        console.log(`   البريد الإلكتروني: ${place.email || 'غير محدد'}`);
        console.log('');
      });
    }

    console.log('\n📊 === ملخص البيانات ===');
    console.log(`عدد الباقات: ${packages.length}`);
    console.log(`عدد السيارات: ${cars.length}`);
    console.log(`عدد المغاسل: ${washingPlaces.length}`);

  } catch (error) {
    console.error('❌ خطأ في استدعاء البيانات:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال');
  }
}

// تشغيل السكريبت
getRealData(); 