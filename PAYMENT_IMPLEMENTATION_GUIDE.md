# دليل تنفيذ الدفع في الفرونت إند

## نظرة عامة
هذا الدليل يوضح كيفية تنفيذ عمليات الدفع بشكل صحيح في الفرونت إند مع دعم HyperPay و Apple Pay.

## المكونات المحدثة

### 1. ملف API المحدث (`api-hyperpay-fixed.js`)
```javascript
// المسارات المحدثة:
- /api/hyperpay/prepare - إعداد عملية الدفع
- /api/hyperpay/form - إنشاء نموذج الدفع
- /api/hyperpay/status/:checkoutId - فحص حالة الدفع
- /api/hyperpay/test - اختبار الدفع
- /api/hyperpay/health - فحص صحة الخدمة
```

### 2. مكون HyperPay (`HyperPayPayment.jsx`)
**الميزات:**
- دعم 3D Secure
- معالجة الأخطاء المتقدمة
- واجهة مستخدم محسنة
- بطاقات اختبار مدمجة

**الاستخدام:**
```jsx
<HyperPayPayment
  amount={100.00}
  currency="SAR"
  customer={customerData}
  billing={billingData}
  package={packageData}
  car={carData}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
  onCancel={handleCancel}
/>
```

### 3. مكون Apple Pay (`ApplePayPayment.jsx`)
**الميزات:**
- فحص توفر Apple Pay
- دعم البطاقات المحلية (مدى)
- معالجة الأخطاء
- واجهة مستخدم محسنة

**الاستخدام:**
```jsx
<ApplePayPayment
  amount={100.00}
  currency="SAR"
  customer={customerData}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
  onCancel={handleCancel}
/>
```

### 4. صفحة نتائج الدفع (`PaymentResult.jsx`)
**الميزات:**
- معالجة جميع حالات الدفع
- إعادة المحاولة التلقائية
- رسائل خطأ واضحة
- واجهة مستخدم محسنة

## تدفق الدفع الكامل

### الخطوة 1: إعداد البيانات
```javascript
// في صفحة Checkout
const reservationData = {
  package: { _id: '...', name: '...', washes: 10, basePrice: 100 },
  customer: { name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966501234567' },
  carType: 'medium',
  totalPrice: 100.00
};

localStorage.setItem('reservationData', JSON.stringify(reservationData));
```

### الخطوة 2: اختيار طريقة الدفع
```javascript
const paymentMethods = [
  {
    id: 'hyperpay',
    name: 'HyperPay الآمن',
    description: 'فيزا، ماستركارد، مدى - دفع آمن ومشفر'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'الدفع السريع عبر Apple Pay'
  }
];
```

### الخطوة 3: معالجة الدفع
```javascript
const handlePaymentSuccess = async (paymentData) => {
  try {
    // إنشاء الطلب
    const orderResponse = await orderAPI.create(orderData);
    
    // إنشاء QR Code
    const qrResponse = await qrAPI.generate(orderResponse.data.id);
    
    // حفظ البيانات النهائية
    localStorage.setItem('finalOrderData', JSON.stringify(finalOrderData));
    
    // الانتقال لصفحة النجاح
    navigate('/payment-success');
    
  } catch (error) {
    showErrorNotification('حدث خطأ أثناء معالجة الدفع');
  }
};
```

### الخطوة 4: معالجة النتائج
```javascript
// في صفحة PaymentResult
const processPaymentResult = async () => {
  const resourcePath = searchParams.get('resourcePath');
  const checkoutId = searchParams.get('id');
  const resultCode = searchParams.get('resultCode');
  
  if (resultCode) {
    // معالجة النتيجة المباشرة
    handleDirectResult(resultCode);
  } else {
    // فحص الحالة من الباك إند
    const statusResponse = await hyperpayAPI.getPaymentStatus(checkoutId, resourcePath);
    handleBackendResult(statusResponse);
  }
};
```

## بطاقات الاختبار

### HyperPay Test Cards:
```
VISA (3DS): 4440000009900010
MADA (3DS): 5360230159427034
CVV: 100 (VISA) / 850 (MADA)
Expiry: 01/39 (VISA) / 11/25 (MADA)
Name: Any Name
```

### Apple Pay Test Cards:
```
VISA: 4440000009900010
MasterCard: 5204730000002514
MADA: 5360230159427034
```

## معالجة الأخطاء

### أنواع الأخطاء:
1. **أخطاء الشبكة** - مشاكل في الاتصال
2. **أخطاء المصادقة** - بيانات اعتماد غير صحيحة
3. **أخطاء البطاقة** - بطاقة مرفوضة أو غير صحيحة
4. **أخطاء الجلسة** - انتهاء صلاحية الجلسة

### استراتيجية معالجة الأخطاء:
```javascript
const handlePaymentError = (error) => {
  if (error.code === 'NETWORK_ERROR') {
    showErrorNotification('مشكلة في الاتصال. يرجى المحاولة مرة أخرى.');
  } else if (error.code === 'CARD_DECLINED') {
    showErrorNotification('تم رفض البطاقة. يرجى التحقق من البيانات.');
  } else if (error.code === 'SESSION_EXPIRED') {
    showErrorNotification('انتهت صلاحية الجلسة. يرجى المحاولة مرة أخرى.');
  } else {
    showErrorNotification('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
  }
};
```

## الأمان

### HyperPay:
- تشفير SSL/TLS
- 3D Secure
- معايير PCI DSS
- حماية من الاحتيال

### Apple Pay:
- تشفير متقدم
- مصادقة بيومترية
- عدم مشاركة بيانات البطاقة
- حماية من الاحتيال

## التحسينات المطبقة

### 1. واجهة المستخدم:
- تصميم متجاوب
- رسائل واضحة
- مؤشرات تحميل
- ألوان متناسقة (أخضر وأبيض)

### 2. تجربة المستخدم:
- تدفق سلس
- معالجة أخطاء محسنة
- إعادة المحاولة التلقائية
- حفظ البيانات

### 3. الأداء:
- تحميل تدريجي
- معالجة غير متزامنة
- تحسين الطلبات
- تخزين مؤقت

## الاختبار

### اختبار HyperPay:
```bash
# فحص صحة الخدمة
curl http://localhost:5000/api/hyperpay/health

# إنشاء checkout تجريبي
curl http://localhost:5000/api/hyperpay/test

# إنشاء عملية دفع كاملة
curl -X POST http://localhost:5000/api/hyperpay/prepare \
  -H "Content-Type: application/json" \
  -d '{"amount": 100.00, "currency": "SAR"}'
```

### اختبار Apple Pay:
- استخدام جهاز Apple حقيقي
- متصفح Safari
- بطاقة مدعومة في Apple Pay

## النشر

### متطلبات الإنتاج:
1. **شهادة SSL** صالحة
2. **نطاق HTTPS** مفعل
3. **إعدادات HyperPay** للإنتاج
4. **شهادة Apple Pay** للإنتاج

### متغيرات البيئة:
```env
NODE_ENV=production
HYPERPAY_BASE_URL=https://oppwa.com
HYPERPAY_ACCESS_TOKEN=YOUR_PRODUCTION_TOKEN
HYPERPAY_ENTITY_ID=YOUR_PRODUCTION_ENTITY_ID
```

## الدعم

### للمطورين:
- توثيق شامل للـ API
- أمثلة كود
- معالجة أخطاء مفصلة
- اختبارات شاملة

### للمستخدمين:
- رسائل خطأ واضحة
- نصائح للمساعدة
- دعم فني متاح
- دليل استخدام

## الخلاصة

تم تنفيذ نظام دفع شامل ومتقدم يدعم:
- ✅ HyperPay مع 3D Secure
- ✅ Apple Pay
- ✅ معالجة أخطاء متقدمة
- ✅ واجهة مستخدم محسنة
- ✅ أمان عالي
- ✅ أداء محسن
- ✅ توثيق شامل

النظام جاهز للاستخدام في بيئة التطوير والإنتاج.
