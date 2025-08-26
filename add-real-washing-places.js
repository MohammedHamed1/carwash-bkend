const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://elhadad3593:NIqGTCLDJJFOFbtf@cluster0.3vqlnfg.mongodb.net/paypass?retryWrites=true&w=majority';

async function addRealWashingPlaces() {
  try {
    console.log('🔗 الاتصال بقاعدة البيانات...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ تم الاتصال بنجاح!');

    const db = mongoose.connection;

    // مسح المغاسل الموجودة
    console.log('🧹 مسح المغاسل الموجودة...');
    const washingPlacesCollection = db.db.collection('washingplaces');
    await washingPlacesCollection.deleteMany({});
    console.log('✅ تم مسح المغاسل الموجودة');

    // إنشاء المغاسل الحقيقية في الرياض
    console.log('\n🏢 إنشاء المغاسل الحقيقية في الرياض...');

    const washingPlaces = [
      {
        name: 'مغسلة الرياض الأولى',
        address: 'الرياض، شارع الملك فهد، حي النزهة',
        phone: '+966501234567',
        hours: '24/7',
        email: 'branch1@paypass.com',
        location: 'Point',
        city: 'الرياض',
        rating: 4.5,
        customers: 150,
        status: 'active',
        activeOrders: 8,
        googleMapsUrl: 'https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'مغسلة الرياض الثانية',
        address: 'الرياض، شارع التحلية، حي السليمانية',
        phone: '+966501234568',
        hours: '24/7',
        email: 'branch2@paypass.com',
        location: 'Point',
        city: 'الرياض',
        rating: 4.3,
        customers: 120,
        status: 'active',
        activeOrders: 6,
        googleMapsUrl: 'https://maps.app.goo.gl/khhqHgaRFZXqELYTA?g_st=iw',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'مغسلة الرياض الثالثة',
        address: 'الرياض، شارع العليا، حي العليا',
        phone: '+966501234569',
        hours: '24/7',
        email: 'branch3@paypass.com',
        location: 'Point',
        city: 'الرياض',
        rating: 4.7,
        customers: 180,
        status: 'active',
        activeOrders: 12,
        googleMapsUrl: 'https://maps.app.goo.gl/uB82K6Tj8jsPmXFeA?g_st=iw',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'مغسلة الرياض الرابعة',
        address: 'الرياض، شارع الملك عبدالله، حي الملقا',
        phone: '+966501234570',
        hours: '24/7',
        email: 'branch4@paypass.com',
        location: 'Point',
        city: 'الرياض',
        rating: 4.4,
        customers: 140,
        status: 'active',
        activeOrders: 9,
        googleMapsUrl: 'https://maps.app.goo.gl/VY5rRk7oLZ2YpSmb7?g_st=iw',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await washingPlacesCollection.insertMany(washingPlaces);
    console.log('✅ تم إنشاء المغاسل الحقيقية!');

    console.log('\n🏢 === المغاسل الحقيقية المضافة ===');
    console.log('='.repeat(50));

    washingPlaces.forEach((place, index) => {
      console.log(`${index + 1}. ${place.name}`);
      console.log(`   العنوان: ${place.address}`);
      console.log(`   المدينة: ${place.city}`);
      console.log(`   الهاتف: ${place.phone}`);
      console.log(`   ساعات العمل: ${place.hours}`);
      console.log(`   التقييم: ${place.rating}/5`);
      console.log(`   عدد العملاء: ${place.customers}`);
      console.log(`   الطلبات النشطة: ${place.activeOrders}`);
      console.log(`   رابط Google Maps: ${place.googleMapsUrl}`);
      console.log('');
    });

    console.log('🎉 تم إضافة المغاسل الحقيقية بنجاح!');

  } catch (error) {
    console.error('❌ خطأ في إضافة المغاسل:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال');
  }
}

addRealWashingPlaces(); 