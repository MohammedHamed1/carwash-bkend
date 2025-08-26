import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    RefreshCw,
    Clock,
    CreditCard,
    Home,
    Phone
} from 'lucide-react';

const PaymentSessionHandler = ({ 
    error, 
    onRetry, 
    onGoHome, 
    onContactSupport,
    sessionType = 'payment' 
}) => {
    const [showDetails, setShowDetails] = useState(false);

    const getSessionTypeText = () => {
        switch (sessionType) {
            case 'payment':
                return 'جلسة الدفع';
            case 'checkout':
                return 'جلسة الطلب';
            default:
                return 'الجلسة';
        }
    };

    const getErrorDetails = () => {
        if (error?.includes('200.300.404') || error?.includes('expired')) {
            return {
                title: `${getSessionTypeText()} انتهت صلاحيتها`,
                description: 'انتهت صلاحية الجلسة بسبب مرور وقت طويل على العملية',
                solutions: [
                    'إنشاء طلب جديد',
                    'التأكد من اتصال الإنترنت',
                    'التواصل مع الدعم الفني'
                ],
                icon: Clock,
                color: 'yellow'
            };
        }
        
        return {
            title: 'مشكلة في التحقق من الدفع',
            description: 'حدث خطأ أثناء التحقق من حالة الدفع',
            solutions: [
                'إعادة المحاولة',
                'التأكد من اتصال الإنترنت',
                'التواصل مع الدعم الفني'
            ],
            icon: AlertTriangle,
            color: 'red'
        };
    };

    const errorInfo = getErrorDetails();
    const IconComponent = errorInfo.icon;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md mx-auto p-8"
            >
                <div className={`w-20 h-20 bg-${errorInfo.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-12 h-12 text-${errorInfo.color}-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{errorInfo.title}</h2>
                
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                    <p className="text-gray-600 mb-4">{errorInfo.description}</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                        <h4 className="font-semibold text-blue-800 mb-2">الحلول المقترحة:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            {errorInfo.solutions.map((solution, index) => (
                                <li key={index}>• {solution}</li>
                            ))}
                        </ul>
                    </div>

                    {showDetails && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
                            <h4 className="font-semibold text-gray-800 mb-2">تفاصيل تقنية:</h4>
                            <p className="text-sm text-gray-600">
                                رمز الخطأ: 200.300.404<br />
                                نوع الخطأ: انتهاء صلاحية الجلسة<br />
                                الوقت: {new Date().toLocaleString('ar-SA')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onRetry}
                        className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        إعادة المحاولة
                    </button>
                    
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                        {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                    </button>
                    
                    <button
                        onClick={onContactSupport}
                        className="w-full bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5" />
                        التواصل مع الدعم
                    </button>
                    
                    <button
                        onClick={onGoHome}
                        className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                    >
                        العودة للرئيسية
                    </button>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    <p>إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم الفني</p>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSessionHandler;
