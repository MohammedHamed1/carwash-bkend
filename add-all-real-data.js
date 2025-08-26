const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://elhadad3593:NIqGTCLDJJFOFbtf@cluster0.3vqlnfg.mongodb.net/paypass?retryWrites=true&w=majority';

async function addAllRealData() {
  try {
    console.log('🔗 الاتصال بقاعدة البيانات...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ تم الاتصال بنجاح!');

    const db = mongoose.connection;

    // مسح جميع البيانات الموجودة
    console.log('🧹 مسح جميع البيانات الموجودة...');
    const collections = ['packages', 'washingplaces', 'carsizes'];
    
    for (const collectionName of collections) {
      try {
        const collection = db.db.collection(collectionName);
        const result = await collection.deleteMany({});
        console.log(`✅ تم مسح ${result.deletedCount} من ${collectionName}`);
      } catch (error) {
        console.log(`⚠️  لا يمكن مسح ${collectionName}: ${error.message}`);
      }
    }

    // إضافة أحجام السيارات
    console.log('\n🚗 إضافة أحجام السيارات...');
    const carSizesCollection = db.db.collection('carsizes');
    
    const carSizes = [
      {
        name: 'صغيرة',
        englishName: 'small',
        description: 'سيارات صغيرة مثل تويوتا ياريس، هوندا سيفيك، نيسان سنترا',
        examples: ['تويوتا ياريس', 'هوندا سيفيك', 'نيسان سنترا', 'هيونداي أكسنت'],
        basePrice: 30,
        multiplier: 1.0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'متوسطة',
        englishName: 'medium',
        description: 'سيارات متوسطة مثل تويوتا كامري، هوندا أكورد، نيسان ألتيما',
        examples: ['تويوتا كامري', 'هوندا أكورد', 'نيسان ألتيما', 'هيونداي سوناتا'],
        basePrice: 40,
        multiplier: 1.33,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'كبيرة',
        englishName: 'large',
        description: 'سيارات كبيرة مثل تويوتا لاند كروزر، نيسان باترول، شيفروليه تاهو',
        examples: ['تويوتا لاند كروزر', 'نيسان باترول', 'شيفروليه تاهو', 'فورد إكسبيديشن'],
        basePrice: 50,
        multiplier: 1.67,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await carSizesCollection.insertMany(carSizes);
    console.log('✅ تم إضافة أحجام السيارات');

    // إضافة المغاسل
    console.log('\n🏢 إضافة المغاسل...');
    const washingPlacesCollection = db.db.collection('washingplaces');
    
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
    console.log('✅ تم إضافة المغاسل');

    // إضافة الباقات مع الأسعار حسب الحجم
    console.log('\n📦 إضافة الباقات مع الأسعار حسب الحجم...');
    const packagesCollection = db.db.collection('packages');
    
    const packages = [
      {
        name: 'الباقة الأساسية',
        description: 'الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!',
        basePrice: 150,
        originalPrice: 235,
        features: [
          '4 غسلات باستخدام صابون إيطالي فاخر عالي الجودة',
          'غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم',
          'غسلة إضافية مجانية، ليصبح إجمالي الغسلات: 5',
          'إجمالي التوفير: 85 ريال سعودي',
          'متاحة في جميع المغاسل'
        ],
        popular: false,
        washes: 5,
        savings: 85,
        duration: 30,
        size: 'small',
        status: 'active',
        availableIn: 'all',
        priceBySize: {
          small: 150,
          medium: 200,
          large: 250
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'الباقة المتقدمة',
        description: 'الخيار العملي للنظافة المثالية بسعر تنافسي.',
        basePrice: 280,
        originalPrice: 420,
        features: [
          '8 غسلات باستخدام صابون إيطالي فاخر يمنح سيارتك العناية التي تستحقها',
          'غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم',
          'غسلتان مجانيتان، ليصبح إجمالي الغسلات: 10',
          'إجمالي التوفير: 140 ريال سعودي',
          'متاحة في جميع المغاسل'
        ],
        popular: true,
        washes: 10,
        savings: 140,
        duration: 30,
        size: 'medium',
        status: 'active',
        availableIn: 'all',
        priceBySize: {
          small: 280,
          medium: 370,
          large: 470
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'الباقة الشاملة',
        description: 'الخيار الأمثل لمن يريد العناية القصوى بسياراته مع أكبر قدر من التوفير.',
        basePrice: 490,
        originalPrice: 770,
        features: [
          '14 غسلة باستخدام صابون إيطالي فاخر يوفر عناية فائقة بسيارتك',
          'غسيل بطبقتين من الصابون لضمان إزالة الأوساخ بفعالية وحماية طويلة الأمد',
          '4 غسلات مجانية، ليصبح إجمالي الغسلات: 18',
          'إجمالي التوفير: 280 ريال سعودي',
          'متاحة في جميع المغاسل'
        ],
        popular: false,
        washes: 18,
        savings: 280,
        duration: 30,
        size: 'large',
        status: 'active',
        availableIn: 'all',
        priceBySize: {
          small: 490,
          medium: 650,
          large: 820
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'الباقة VIP',
        description: 'الباقة المميزة للعملاء الأوفياء مع أفضل الخدمات والامتيازات.',
        basePrice: 150,
        originalPrice: 200,
        features: [
          'غسلة واحدة باستخدام أفضل أنواع الصابون الإيطالي الفاخر',
          'غسيل بثلاث طبقات من الصابون لضمان نظافة استثنائية',
          'خدمة VIP مع أولوية في الطوابير',
          'إجمالي التوفير: 50 ريال سعودي',
          'متاحة فقط في الفنادق',
          'سعر ثابت مع جميع أحجام السيارات'
        ],
        popular: false,
        washes: 1,
        savings: 50,
        duration: 7,
        size: 'large',
        status: 'active',
        availableIn: 'hotels',
        priceBySize: {
          small: 150,
          medium: 150,
          large: 150
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await packagesCollection.insertMany(packages);
    console.log('✅ تم إضافة الباقات');

    // عرض ملخص البيانات
    console.log('\n📊 === ملخص البيانات المضافة ===');
    console.log('='.repeat(50));
    
    console.log(`🚗 أحجام السيارات: ${carSizes.length}`);
    carSizes.forEach(size => {
      console.log(`   - ${size.name}: ${size.basePrice} ريال/غسلة (معامل: ${size.multiplier}x)`);
    });

    console.log(`\n🏢 المغاسل: ${washingPlaces.length}`);
    washingPlaces.forEach(place => {
      console.log(`   - ${place.name}: ${place.address}`);
    });

    console.log(`\n📦 الباقات: ${packages.length}`);
    packages.forEach(pkg => {
      console.log(`   - ${pkg.name}: ${pkg.washes} غسلة، متاحة في: ${pkg.availableIn === 'all' ? 'جميع المغاسل' : 'الفنادق فقط'}`);
      console.log(`     الأسعار حسب الحجم:`);
      Object.entries(pkg.priceBySize).forEach(([size, price]) => {
        console.log(`       ${size === 'small' ? 'صغيرة' : size === 'medium' ? 'متوسطة' : 'كبيرة'}: ${price} ريال`);
      });
    });

    console.log('\n🎉 تم إضافة جميع البيانات الحقيقية بنجاح!');

  } catch (error) {
    console.error('❌ خطأ في إضافة البيانات:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال');
  }
}

addAllRealData(); 