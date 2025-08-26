# دليل HyperPay المحسن - بناءً على المثال المقدم

## نظرة عامة

تم تطوير نظام HyperPay محسن بناءً على المثال المقدم من GitHub، مع تحسينات شاملة في الواجهة والوظائف.

## الملفات الجديدة

### 1. `api/hyperpay-enhanced.js`
API محسن لـ HyperPay مع جميع الوظائف المطلوبة:

```javascript
// الميزات الرئيسية:
- createCheckout: إنشاء جلسة دفع
- getPaymentStatus: فحص حالة الدفع
- processWebhook: معالجة Webhook
- getWidgetUrl: الحصول على رابط Widget
- getConfig: الحصول على الإعدادات
```

### 2. `components/HyperPayEnhanced.jsx`
مكون React محسن مع:

```javascript
// الميزات:
- تحميل ديناميكي للـ Widget
- معالجة أخطاء متقدمة
- واجهة مستخدم محسنة
- دعم بطاقات الاختبار
- إعدادات قابلة للتخصيص
```

### 3. `pages/HyperPayTest.jsx`
صفحة اختبار شاملة:

```javascript
// الاختبارات المتاحة:
- اختبار API مباشر
- اختبار Widget الدفع
- عرض النتائج التفصيلية
- معلومات التكوين
```

## الإعدادات

### التكوين الأساسي:
```javascript
const HYPERPAY_CONFIG = {
    userId: '8a8294175060823a015060866a48002c',
    password: 'ZR9zWyRP',
    entityId: '8a82941750616e5a01506185ccc3007c',
    isTest: true,
    baseUrl: 'https://test.oppwa.com',
    productionUrl: 'https://oppwa.com'
};
```

### إعدادات Widget:
```javascript
const widgetOptions = {
    style: "card",
    locale: "en",
    brandDetection: true,
    brandDetectionPriority: ["MADA", "VISA", "MASTER"],
    paymentTarget: "_top"
};
```

## كيفية الاستخدام

### 1. إنشاء Checkout:
```javascript
import { hyperpayEnhancedAPI } from '../api/hyperpay-enhanced';

const paymentData = {
    amount: '100.00',
    currency: 'SAR',
    customerEmail: 'customer@example.com',
    customerName: 'أحمد',
    customerSurname: 'محمد',
    billingStreet: 'شارع الملك فهد',
    billingCity: 'الرياض',
    billingState: 'المنطقة الوسطى',
    billingCountry: 'SA'
};

const response = await hyperpayEnhancedAPI.createCheckout(paymentData);
```

### 2. استخدام المكون:
```jsx
import HyperPayEnhanced from '../components/HyperPayEnhanced';

<HyperPayEnhanced
    amount={100.00}
    currency="SAR"
    customer={customerData}
    billing={billingData}
    onSuccess={handleSuccess}
    onError={handleError}
    onCancel={handleCancel}
    options={widgetOptions}
/>
```

### 3. فحص حالة الدفع:
```javascript
const statusResponse = await hyperpayEnhancedAPI.getPaymentStatus(resourcePath);

if (statusResponse.isPaymentSuccessful) {
    console.log('Payment successful!');
} else {
    console.log('Payment failed!');
}
```

## بطاقات الاختبار

### VISA:
```
رقم البطاقة: 4440000009900010
CVV: 100
تاريخ الانتهاء: 01/39
```

### MADA:
```
رقم البطاقة: 5360230159427034
CVV: 850
تاريخ الانتهاء: 11/25
```

### MasterCard:
```
رقم البطاقة: 5204730000002514
CVV: 100
تاريخ الانتهاء: 01/39
```

## معالجة النتائج

### رموز النجاح:
```javascript
const successPattern = /(000\.000\.|000\.100\.1|000\.[36])/;
const manualPattern = /(000\.400\.0[^3]|000\.400\.100)/;
```

### معالجة النتيجة:
```javascript
const result = hyperpayFrontendHelpers.handlePaymentResult(resultCode);

if (result.isSuccessful) {
    // نجح الدفع
} else {
    // فشل الدفع
}
```

## معالجة Webhook

### فك التشفير:
```javascript
const webhookData = {
    secret: 'YOUR_SECRET',
    iv: 'IV_FROM_HEADER',
    authTag: 'AUTH_TAG_FROM_HEADER',
    httpBody: 'ENCRYPTED_BODY'
};

const result = hyperpayEnhancedAPI.processWebhook(webhookData);
```

## التحسينات المطبقة

### 1. واجهة المستخدم:
- تصميم متجاوب
- رسائل واضحة باللغة العربية
- مؤشرات تحميل
- معالجة أخطاء محسنة

### 2. الأداء:
- تحميل ديناميكي للـ Widget
- معالجة غير متزامنة
- تنظيف الذاكرة التلقائي

### 3. الأمان:
- تشفير البيانات
- معالجة آمنة للـ Webhook
- فحص صحة المدخلات

### 4. المرونة:
- إعدادات قابلة للتخصيص
- دعم بيئات متعددة
- تكامل سهل

## الاختبار

### 1. اختبار API:
```bash
# إنشاء checkout
curl -X POST http://localhost:3000/api/hyperpay/create-checkout \
  -H "Content-Type: application/json" \
  -d '{"amount": "10.00", "currency": "SAR"}'
```

### 2. اختبار Widget:
- الوصول لصفحة الاختبار
- اختيار المبلغ
- إدخال بيانات البطاقة
- مراقبة النتيجة

### 3. اختبار Webhook:
```bash
# محاكاة webhook
curl -X POST http://localhost:3000/api/hyperpay/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## النشر

### متطلبات الإنتاج:
1. **شهادة SSL** صالحة
2. **نطاق HTTPS** مفعل
3. **إعدادات HyperPay** للإنتاج
4. **Webhook URL** صالح

### متغيرات البيئة:
```env
HYPERPAY_USER_ID=your_production_user_id
HYPERPAY_PASSWORD=your_production_password
HYPERPAY_ENTITY_ID=your_production_entity_id
HYPERPAY_IS_TEST=false
HYPERPAY_WEBHOOK_SECRET=your_webhook_secret
```

## استكشاف الأخطاء

### مشاكل شائعة:

#### 1. فشل تحميل Widget:
```javascript
// الحل: فحص اتصال الإنترنت وإعدادات CORS
```

#### 2. خطأ في إنشاء Checkout:
```javascript
// الحل: التحقق من صحة البيانات والإعدادات
```

#### 3. فشل في معالجة Webhook:
```javascript
// الحل: التحقق من صحة المفتاح والتشفير
```

### سجلات التصحيح:
```javascript
// تفعيل السجلات التفصيلية
console.log('HyperPay Debug:', {
    config: hyperpayEnhancedAPI.getConfig(),
    response: response,
    error: error
});
```

## الخلاصة

تم تطوير نظام HyperPay محسن وشامل يتضمن:

- ✅ **API محسن** مع جميع الوظائف المطلوبة
- ✅ **مكون React** متقدم ومتجاوب
- ✅ **صفحة اختبار** شاملة
- ✅ **معالجة أخطاء** متقدمة
- ✅ **دعم Webhook** آمن
- ✅ **بطاقات اختبار** مدمجة
- ✅ **توثيق شامل** للاستخدام

النظام جاهز للاستخدام في بيئة التطوير والإنتاج! 🚀
