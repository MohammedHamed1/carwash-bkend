# إعداد ملف البيئة للفرونت إند - الربط بالباك إند

## 📝 **إنشاء ملف .env**
قم بإنشاء ملف `.env` في مجلد `frontend` مع المحتوى التالي:

```bash
# Frontend Environment Variables (Connected to Backend)

# App Configuration
VITE_APP_NAME=PayPass
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Backend API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000

# Authentication
VITE_JWT_STORAGE_KEY=frontend_token
VITE_USER_STORAGE_KEY=frontend_user

# Payment Gateway Configuration
VITE_HYPERPAY_MERCHANT_ID=your_hyperpay_merchant_id
VITE_HYPERPAY_ACCESS_TOKEN=your_hyperpay_access_token
VITE_HYPERPAY_ENVIRONMENT=test

# Apple Pay Configuration
VITE_APPLE_PAY_MERCHANT_ID=your_apple_pay_merchant_id
VITE_APPLE_PAY_DOMAIN=localhost

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=false

# Development Settings
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
```

## 🔧 **كيفية الإنشاء**

### **Windows:**
```bash
cd frontend
echo # Frontend Environment Variables (Connected to Backend) > .env
echo. >> .env
echo # App Configuration >> .env
echo VITE_APP_NAME=PayPass >> .env
echo VITE_APP_VERSION=1.0.0 >> .env
echo VITE_APP_ENVIRONMENT=development >> .env
echo. >> .env
echo # Backend API Configuration >> .env
echo VITE_API_BASE_URL=http://localhost:5000/api >> .env
echo VITE_BACKEND_URL=http://localhost:5000 >> .env
echo. >> .env
echo # Authentication >> .env
echo VITE_JWT_STORAGE_KEY=frontend_token >> .env
echo VITE_USER_STORAGE_KEY=frontend_user >> .env
echo. >> .env
echo # Payment Gateway Configuration >> .env
echo VITE_HYPERPAY_MERCHANT_ID=your_hyperpay_merchant_id >> .env
echo VITE_HYPERPAY_ACCESS_TOKEN=your_hyperpay_access_token >> .env
echo VITE_HYPERPAY_ENVIRONMENT=test >> .env
echo. >> .env
echo # Apple Pay Configuration >> .env
echo VITE_APPLE_PAY_MERCHANT_ID=your_apple_pay_merchant_id >> .env
echo VITE_APPLE_PAY_DOMAIN=localhost >> .env
echo. >> .env
echo # Feature Flags >> .env
echo VITE_ENABLE_ANALYTICS=false >> .env
echo VITE_ENABLE_DEBUG=true >> .env
echo VITE_ENABLE_MOCK_DATA=false >> .env
echo. >> .env
echo # Development Settings >> .env
echo VITE_DEV_MODE=true >> .env
echo VITE_LOG_LEVEL=debug >> .env
```

### **Linux/Mac:**
```bash
cd frontend
cat > .env << 'EOF'
# Frontend Environment Variables (Connected to Backend)

# App Configuration
VITE_APP_NAME=PayPass
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Backend API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000

# Authentication
VITE_JWT_STORAGE_KEY=frontend_token
VITE_USER_STORAGE_KEY=frontend_user

# Payment Gateway Configuration
VITE_HYPERPAY_MERCHANT_ID=your_hyperpay_merchant_id
VITE_HYPERPAY_ACCESS_TOKEN=your_hyperpay_access_token
VITE_HYPERPAY_ENVIRONMENT=test

# Apple Pay Configuration
VITE_APPLE_PAY_MERCHANT_ID=your_apple_pay_merchant_id
VITE_APPLE_PAY_DOMAIN=localhost

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=false

# Development Settings
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
EOF
```

## ⚠️ **ملاحظات مهمة**

1. **الباك إند**: تأكد من تشغيل الباك إند على المنفذ 5000
2. **قاعدة البيانات**: تأكد من تشغيل MySQL وربط الباك إند بها
3. **بوابات الدفع**: قم بتحديث بيانات HyperPay و Apple Pay الفعلية
4. **المصادقة**: تم إعداد نظام JWT للمصادقة

## 🚀 **بعد إنشاء الملف**

1. تأكد من تشغيل الباك إند: `cd paypass-backend-main && npm start`
2. شغل الفرونت إند: `cd frontend && npm run dev`
3. افتح المتصفح على: `http://localhost:5173`

## 🔗 **الروابط المهمة**

- **الفرونت إند**: http://localhost:5173
- **الباك إند**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health
- **API Test**: http://localhost:5000/api/test

## 📋 **الخدمات المتاحة**

### **Authentication Service**
- تسجيل الدخول/الخروج
- تسجيل مستخدم جديد
- تحديث الملف الشخصي
- تغيير كلمة المرور

### **Payment Service**
- HyperPay Integration
- Apple Pay Integration
- Cash Payment
- Payment Verification

### **QR Code Service**
- إنشاء رموز QR للطلبات
- إنشاء رموز QR للمدفوعات
- إنشاء رموز QR للباقات
- تحميل وطباعة رموز QR

### **API Services**
- Package Management
- Branch Management
- Order Management
- Feedback Management
- Notification Management 