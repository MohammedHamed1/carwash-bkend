import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

// تأكد من أن هذا الرابط صحيح 100%
const API_BASE_URL = 'http://localhost:5000/api';

const PaymentResult = () => {
    const [status, setStatus] = useState('pending');
    const [message, setMessage] = useState('جاري التحقق من حالة الدفع، يرجى الانتظار...');
    const location = useLocation();

    // الحل الجذري: استخدام useRef لإنشاء متغير لا يتأثر بإعادة العرض
    // هذا المتغير سيخبرنا إذا كنا قد قمنا بالتحقق من قبل أم لا
    const hasCheckedStatus = useRef(false);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            // التحقق من العلم (Flag): إذا كان true، فهذا يعني أننا قمنا بالتحقق من قبل، لذا اخرج فورًا
            if (hasCheckedStatus.current) {
                console.log('⚠️ Status already checked, skipping...');
                return;
            }
            // رفع العلم (Flag): قم بتعيين القيمة إلى true فورًا لمنع أي استدعاءات مستقبلية
            hasCheckedStatus.current = true;

            const params = new URLSearchParams(location.search);
            const checkoutId = params.get('id');
            const resourcePath = params.get('resourcePath');

            console.log('🔍 Processing payment result:', { checkoutId, resourcePath });

            if (!checkoutId && !resourcePath) {
                setStatus('failure');
                setMessage('خطأ فادح: معرف العملية غير موجود في الرابط.');
                return;
            }

            try {
                // استدعاء الخادم للتحقق من الحالة (سيحدث مرة واحدة فقط)
                console.log(`[FRONTEND] Checking status for checkoutId: ${checkoutId} - This should run only ONCE.`);
                
                let url = `${API_BASE_URL}/hyperpay/status`;
                let params = {};

                if (resourcePath) {
                    params.resourcePath = resourcePath;
                } else if (checkoutId) {
                    url = `${API_BASE_URL}/hyperpay/status/${checkoutId}`;
                }

                const response = await axios.get(url, { params });

                if (response.data.success) {
                    setStatus('success');
                    setMessage('تمت عملية الدفع بنجاح. شكرًا لك!');
                    console.log('✅ Payment successful!');
                } else {
                    setStatus('failure');
                    setMessage(response.data.message || 'فشلت عملية الدفع.');
                    console.log('❌ Payment failed:', response.data.message);
                }

            } catch (error) {
                console.error('❌ Error checking payment status:', error);
                setStatus('failure');
                
                const errorMsg = error.response?.data?.message || 'حدث خطأ غير متوقع.';
                
                // تحسين رسالة الخطأ للمستخدم
                if (errorMsg.includes('expired or not found') || 
                    errorMsg.includes('200.300.404') ||
                    errorMsg.includes('session')) {
                    setMessage('تم التحقق من حالة الدفع مسبقاً. إذا كنت بحاجة إلى مساعدة، يرجى التواصل مع الدعم الفني.');
                } else {
                    setMessage(errorMsg);
                }
            }
        };

        checkPaymentStatus();
    }, [location]); // useEffect سيعتمد على location

    // واجهة عرض محسّنة
    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            fontFamily: 'sans-serif',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {status === 'pending' && (
                <>
                    <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: '5px solid #f3f3f3',
                        borderTop: '5px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                    }}></div>
                    <h1>{message}</h1>
                </>
            )}
            {status === 'success' && (
                <>
                    <h1 style={{ color: '#28a745', fontSize: '2.5rem' }}>✅ نجحت عملية الدفع!</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>{message}</p>
                </>
            )}
            {status === 'failure' && (
                <>
                    <h1 style={{ color: '#dc3545', fontSize: '2.5rem' }}>❌ فشلت عملية الدفع.</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>{message}</p>
                </>
            )}
            <br />
            <Link to="/" style={{ 
                textDecoration: 'none', 
                padding: '15px 30px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
            }}>
                العودة إلى الصفحة الرئيسية
            </Link>
            
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PaymentResult;
