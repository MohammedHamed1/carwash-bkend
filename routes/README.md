# Routes Structure Documentation

## 📁 **هيكل الملفات**

```
routes/
├── index.js          # الملف الرئيسي - يجمع جميع الراوتس
├── api.js            # راوتس API الرئيسية
├── test.js           # راوتس الاختبار والبيانات الوهمية
├── utils.js          # الدوال المساعدة المشتركة
├── validation.js     # قواعد التحقق من صحة البيانات
├── middleware.js     # الوسائط البرمجية المشتركة
├── config.js         # إعدادات وثوابت الراوتس
├── example.js        # أمثلة على الاستخدام
└── README.md         # هذا الملف
```

## 🏗️ **البنية الجديدة**

### **1. `routes/index.js` - الملف الرئيسي**
- يجمع جميع الراوتس
- يعرض وثائق API
- يتعامل مع الأخطاء (404)
- ينظم هيكل الراوتس

### **2. `routes/api.js` - راوتس API**
- راوتس المستخدمين (`/api/user/*`)
- راوتس الباقات (`/api/packages/*`)
- راوتس الطلبات (`/api/washes/*`)
- راوتس المدفوعات (`/api/payments/*`)
- راوتس السيارات (`/api/cars/*`)
- راوتس التقييمات (`/api/feedbacks/*`)
- راوتس الفروع (`/api/washing-places/*`)
- راوتس باقات المستخدم (`/api/user-package/*`)
- راوتس الإحصائيات (`/api/statistics/*`)
- راوتس لوحة التحكم (`/api/dashboard/*`)
- راوتس نظام QR (`/api/qr/*`)

### **3. `routes/test.js` - راوتس الاختبار**
- راوتس الاختبار (`/test`, `/health`)
- بيانات وهمية للاختبار
- محاكاة البيانات

### **4. `routes/utils.js` - الدوال المساعدة**
- دوال تنسيق الاستجابات
- دوال معالجة الأخطاء
- دوال البحث والتصفية
- دوال التصدير والتسجيل

### **5. `routes/validation.js` - قواعد التحقق**
- قواعد التحقق من المستخدمين
- قواعد التحقق من الباقات
- قواعد التحقق من الطلبات
- قواعد التحقق من المدفوعات
- قواعد التحقق من السيارات

### **6. `routes/middleware.js` - الوسائط البرمجية**
- وسائط المصادقة والتفويض
- وسائط تحديد معدل الطلبات
- وسائط تسجيل الطلبات والأخطاء
- وسائط الأمان والتخزين المؤقت
- وسائط رفع الملفات

### **7. `routes/config.js` - إعدادات وثوابت الراوتس**
- إعدادات API والثوابت
- رسائل النجاح والخطأ
- رموز الحالة HTTP
- أنواع البيانات والأنماط

### **8. `routes/example.js` - أمثلة على الاستخدام**
- أمثلة على CRUD operations
- أمثلة على البحث والتصفية
- أمثلة على الإحصائيات
- أمثلة على معالجة الأخطاء

## 🚀 **كيفية الاستخدام**

### **إضافة راوت جديد:**

#### **1. إنشاء راوت في ملف API موجود:**
```javascript
// في routes/api.js
router.get("/new-endpoint", (req, res) => {
  // منطق الراوت
});
```

#### **2. إنشاء راوت في ملف منفصل:**
```javascript
// في modules/newModule/newModule.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // منطق الراوت
});

module.exports = router;
```

#### **3. ربط الراوت الجديد:**
```javascript
// في routes/api.js
router.use("/new-module", require("../modules/newModule/newModule.routes"));
```

### **إضافة راوت اختبار:**
```javascript
// في routes/test.js
router.get("/test-endpoint", (req, res) => {
  res.json({ message: "Test endpoint" });
});
```

### **استخدام الدوال المساعدة:**
```javascript
// في أي راوت
const { sendSuccess, sendError, asyncHandler } = require('./utils');

router.get('/data', asyncHandler(async (req, res) => {
  const data = await getData();
  return sendSuccess(res, data, 'تم جلب البيانات بنجاح');
}));
```

### **استخدام قواعد التحقق:**
```javascript
// في أي راوت
const { userValidation } = require('./validation');

router.post('/register', userValidation.register, (req, res) => {
  // منطق التسجيل
});
```

### **استخدام الوسائط البرمجية:**
```javascript
// في أي راوت
const { authenticateToken, authorizeAdmin, apiRateLimit } = require('./middleware');

router.get('/admin/data', 
  authenticateToken, 
  authorizeAdmin, 
  apiRateLimit, 
  (req, res) => {
    // منطق الراوت
  }
);
```

## 📋 **أمثلة على الراوتس**

### **راوتس API:**
```
GET    /api/user/profile          # جلب الملف الشخصي
POST   /api/user/login            # تسجيل الدخول
GET    /api/packages              # جلب الباقات
POST   /api/washes                # إنشاء طلب غسيل
GET    /api/dashboard/stats       # إحصائيات لوحة التحكم
```

### **راوتس الاختبار:**
```
GET    /test                      # اختبار API
GET    /health                    # حالة الخادم
GET    /users                     # بيانات وهمية للمستخدمين
GET    /packages                  # بيانات وهمية للباقات
```

## 🔧 **إعدادات متقدمة**

### **إضافة Middleware:**
```javascript
// في routes/api.js
const auth = require('../middleware/auth');

router.use('/protected', auth, (req, res, next) => {
  // راوتس محمية
});
```

### **معالجة الأخطاء:**
```javascript
router.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: error.message
  });
});
```

### **Validation:**
```javascript
const { body, validationResult } = require('express-validator');

router.post('/endpoint', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // منطق الراوت
});
```

## 📊 **هيكل الاستجابة**

### **استجابة ناجحة:**
```json
{
  "success": true,
  "message": "تم تنفيذ العملية بنجاح",
  "data": {
    // البيانات المطلوبة
  }
}
```

### **استجابة خطأ:**
```json
{
  "success": false,
  "message": "حدث خطأ",
  "error": "تفاصيل الخطأ"
}
```

## 🎯 **أفضل الممارسات**

1. **استخدم التعليقات** لتوضيح وظيفة كل راوت
2. **نظم الراوتس** حسب الوظيفة
3. **استخدم Middleware** للمصادقة والتحقق
4. **عالج الأخطاء** بشكل مناسب
5. **وثق الراوتس** بشكل واضح
6. **اختبر الراوتس** قبل النشر

## 🔍 **اختبار الراوتس**

### **اختبار محلي:**
```bash
# تشغيل الخادم
npm start

# اختبار راوت
curl http://localhost:3000/test
```

### **اختبار Postman:**
- استورد ملف Postman Collection
- اختبر جميع الراوتس
- تحقق من الاستجابات

## 📝 **ملاحظات مهمة**

- جميع راوتس API تبدأ بـ `/api`
- راوتس الاختبار متاحة مباشرة
- استخدم Middleware للمصادقة عند الحاجة
- وثق أي تغييرات في هذا الملف
