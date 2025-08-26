const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://elhadad3593:NIqGTCLDJJFOFbtf@cluster0.3vqlnfg.mongodb.net/paypass?retryWrites=true&w=majority';

async function addCarSizes() {
  try {
    console.log('🔗 الاتصال بقاعدة البيانات...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ تم الاتصال بنجاح!');

    const db = mongoose.connection;

    // مسح أحجام السيارات الموجودة
    console.log('🧹 مسح أحجام السيارات الموجودة...');
    const carSizesCollection = db.db.collection('carsizes');
    await carSizesCollection.deleteMany({});
    console.log('✅ تم مسح أحجام السيارات الموجودة');

    // إنشاء أحجام السيارات مع الأسعار
    console.log('\n🚗 إنشاء أحجام السيارات مع الأسعار...');

    const carSizes = [
      {
        name: 'صغيرة',
        englishName: 'small',
        description: 'سيارات صغيرة مثل تويوتا ياريس، هوندا سيفيك، نيسان سنترا',
        examples: ['تويوتا ياريس', 'هوندا سيفيك', 'نيسان سنترا', 'هيونداي أكسنت'],
        basePrice: 30, // السعر الأساسي للغسلة الواحدة
        multiplier: 1.0, // معامل السعر
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'متوسطة',
        englishName: 'medium',
        description: 'سيارات متوسطة مثل تويوتا كامري، هوندا أكورد، نيسان ألتيما',
        examples: ['تويوتا كامري', 'هوندا أكورد', 'نيسان ألتيما', 'هيونداي سوناتا'],
        basePrice: 40, // السعر الأساسي للغسلة الواحدة
        multiplier: 1.33, // معامل السعر
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'كبيرة',
        englishName: 'large',
        description: 'سيارات كبيرة مثل تويوتا لاند كروزر، نيسان باترول، شيفروليه تاهو',
        examples: ['تويوتا لاند كروزر', 'نيسان باترول', 'شيفروليه تاهو', 'فورد إكسبيديشن'],
        basePrice: 50, // السعر الأساسي للغسلة الواحدة
        multiplier: 1.67, // معامل السعر
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await carSizesCollection.insertMany(carSizes);
    console.log('✅ تم إنشاء أحجام السيارات!');

    console.log('\n🚗 === أحجام السيارات المضافة ===');
    console.log('='.repeat(50));

    carSizes.forEach((size, index) => {
      console.log(`${index + 1}. ${size.name} (${size.englishName})`);
      console.log(`   الوصف: ${size.description}`);
      console.log(`   أمثلة: ${size.examples.join(', ')}`);
      console.log(`   السعر الأساسي: ${size.basePrice} ريال للغسلة الواحدة`);
      console.log(`   معامل السعر: ${size.multiplier}x`);
      console.log('');
    });

    console.log('📊 === حساب الأسعار حسب الحجم ===');
    console.log('='.repeat(50));

    // حساب الأسعار للباقات حسب حجم السيارة
    const packages = [
      { name: 'الباقة الأساسية', washes: 5, basePrice: 150 },
      { name: 'الباقة المتقدمة', washes: 10, basePrice: 280 },
      { name: 'الباقة الشاملة', washes: 18, basePrice: 490 },
      { name: 'الباقة VIP', washes: 1, basePrice: 150 }
    ];

    carSizes.forEach(size => {
      console.log(`\n🚗 ${size.name}:`);
      packages.forEach(pkg => {
        const adjustedPrice = Math.round(pkg.basePrice * size.multiplier);
        const pricePerWash = Math.round(adjustedPrice / pkg.washes);
        console.log(`   ${pkg.name}: ${adjustedPrice} ريال (${pricePerWash} ريال/غسلة)`);
      });
    });

    console.log('\n🎉 تم إضافة أحجام السيارات بنجاح!');

  } catch (error) {
    console.error('❌ خطأ في إضافة أحجام السيارات:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال');
  }
}

addCarSizes(); 