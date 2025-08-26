import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Play,
    CheckCircle,
    XCircle,
    Loader2,
    RefreshCw
} from 'lucide-react';
import HyperPayEnhanced from '../components/HyperPayEnhanced';
import { hyperpayEnhancedAPI } from '../api/hyperpay-enhanced';

const HyperPayTest = () => {
    const [testStep, setTestStep] = useState('menu'); // menu, checkout, result
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState('10.00');

    const testAmounts = [
        { value: '1.00', label: '1 ريال' },
        { value: '10.00', label: '10 ريال' },
        { value: '50.00', label: '50 ريال' },
        { value: '100.00', label: '100 ريال' }
    ];

    const testCustomer = {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
            phone: '+966501234567'
    };

    const testBilling = {
        street1: 'شارع الملك فهد',
        city: 'الرياض',
        state: 'المنطقة الوسطى',
        country: 'SA'
    };

    const handleTestCheckout = async () => {
        try {
            setIsLoading(true);
            console.log('🧪 Testing HyperPay checkout...');

            const paymentData = {
                amount: selectedAmount,
                currency: 'SAR',
                customerEmail: testCustomer.email,
                customerName: testCustomer.name.split(' ')[0],
                customerSurname: testCustomer.name.split(' ').slice(1).join(' '),
                billingStreet: testBilling.street1,
                billingCity: testBilling.city,
                billingState: testBilling.state,
                billingCountry: testBilling.country
            };

            const response = await hyperpayEnhancedAPI.createCheckout(paymentData);

            if (response.success) {
                setTestResult({
                    success: true,
                    data: response.data,
                    message: 'تم إنشاء جلسة الدفع بنجاح'
                });
            } else {
                setTestResult({
                    success: false,
                    error: response.error,
                    message: 'فشل في إنشاء جلسة الدفع'
                });
            }

        } catch (error) {
            console.error('❌ Test error:', error);
            setTestResult({
                success: false,
                error: error.message,
                message: 'حدث خطأ أثناء الاختبار'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentSuccess = (paymentData) => {
        console.log('✅ Payment successful:', paymentData);
        setTestResult({
            success: true,
            data: paymentData,
            message: 'تم الدفع بنجاح!'
        });
        setTestStep('result');
    };

    const handlePaymentError = (error) => {
        console.error('❌ Payment error:', error);
        setTestResult({
            success: false,
            error: error.message,
            message: 'فشل في الدفع'
        });
        setTestStep('result');
    };

    const resetTest = () => {
        setTestStep('menu');
        setTestResult(null);
    };

    // Render test menu
    if (testStep === 'menu') {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-10 h-10 text-green-600" />
                </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            اختبار HyperPay المحسن
                        </h1>
                        <p className="text-gray-600">
                            اختبار نظام الدفع المحسن بناءً على المثال المقدم
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* API Test */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-lg"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Play className="w-5 h-5 text-blue-600" />
                                اختبار API
                            </h2>

                        <div className="space-y-4">
                            <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        اختر المبلغ:
                                </label>
                                    <select
                                        value={selectedAmount}
                                        onChange={(e) => setSelectedAmount(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        {testAmounts.map((amount) => (
                                            <option key={amount.value} value={amount.value}>
                                                {amount.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={handleTestCheckout}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            جاري الاختبار...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5" />
                                            اختبار إنشاء Checkout
                                        </>
                                    )}
                                </button>
                            </div>

                            {testResult && (
                                <div className={`mt-4 p-4 rounded-xl ${
                                    testResult.success 
                                        ? 'bg-green-50 border border-green-200' 
                                        : 'bg-red-50 border border-red-200'
                                }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {testResult.success ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <span className="font-semibold">
                                            {testResult.success ? 'نجح الاختبار' : 'فشل الاختبار'}
                                        </span>
                                    </div>
                                    <p className="text-sm">
                                        {testResult.message}
                                    </p>
                                    {testResult.data && (
                                        <details className="mt-2">
                                            <summary className="cursor-pointer text-sm font-medium">
                                                عرض التفاصيل
                                            </summary>
                                            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                                {JSON.stringify(testResult.data, null, 2)}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            )}
                        </motion.div>

                        {/* Payment Widget Test */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-lg"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-green-600" />
                                اختبار Widget الدفع
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-2">بيانات الاختبار:</h3>
                                    <div className="text-sm space-y-1">
                                        <p><strong>العميل:</strong> {testCustomer.name}</p>
                                        <p><strong>البريد:</strong> {testCustomer.email}</p>
                                        <p><strong>الهاتف:</strong> {testCustomer.phone}</p>
                                        <p><strong>العنوان:</strong> {testBilling.street1}, {testBilling.city}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setTestStep('checkout')}
                                    className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    اختبار Widget الدفع
                                </button>
                            </div>
                        </motion.div>
                            </div>

                    {/* Configuration Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4">معلومات التكوين</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">إعدادات HyperPay:</h3>
                                <ul className="space-y-1 text-gray-600">
                                    <li>• User ID: {hyperpayEnhancedAPI.getConfig().userId}</li>
                                    <li>• Entity ID: {hyperpayEnhancedAPI.getConfig().entityId}</li>
                                    <li>• Environment: {hyperpayEnhancedAPI.getConfig().isTest ? 'Test' : 'Production'}</li>
                                    <li>• Base URL: {hyperpayEnhancedAPI.getConfig().baseUrl}</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">الميزات المدعومة:</h3>
                                <ul className="space-y-1 text-gray-600">
                                    <li>• VISA / MasterCard / MADA</li>
                                    <li>• 3D Secure</li>
                                    <li>• Webhook Processing</li>
                                    <li>• Test Mode</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                            </div>
                        </div>
        );
    }

    // Render payment widget test
    if (testStep === 'checkout') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <button
                            onClick={resetTest}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            العودة للقائمة
                        </button>
                    </motion.div>

                    <HyperPayEnhanced
                        amount={parseFloat(selectedAmount)}
                            currency="SAR"
                        customer={testCustomer}
                        billing={testBilling}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onCancel={resetTest}
                        options={{
                            style: "card",
                            locale: "en",
                            brandDetection: true,
                            brandDetectionPriority: ["MADA", "VISA", "MASTER"]
                        }}
                        />
                    </div>
                </div>
        );
    }

    // Render result
    if (testStep === 'result') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 shadow-lg text-center"
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                            testResult?.success ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                            {testResult?.success ? (
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            ) : (
                                <XCircle className="w-12 h-12 text-red-600" />
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {testResult?.success ? 'تم الاختبار بنجاح!' : 'فشل في الاختبار'}
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {testResult?.message}
                        </p>

                        {testResult?.data && (
                            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                                <h3 className="font-semibold text-gray-800 mb-2">تفاصيل النتيجة:</h3>
                                <pre className="text-sm overflow-auto">
                                    {JSON.stringify(testResult.data, null, 2)}
                                </pre>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={resetTest}
                                className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                            >
                                اختبار جديد
                            </button>
                        </div>
                    </motion.div>
            </div>
        </div>
    );
    }

    return null;
};

export default HyperPayTest;
