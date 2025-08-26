import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SimpleHyperPayWidget = ({ amount, currency = 'USD', onSuccess, onError }) => {
    const [step, setStep] = useState('init'); // init, loading, widget, success, error
    const [checkoutId, setCheckoutId] = useState(null);
    const [error, setError] = useState(null);
    
    const widgetContainerRef = useRef(null);

    // ✅ تهيئة الدفع - بسيط وسريع
    const initializePayment = async () => {
        try {
            setStep('loading');
            setError(null);

            console.log('🚀 Initializing HyperPay payment...');

            const checkoutData = {
                amount: Number(amount).toFixed(2),
                currency: currency,
                customer: {
                    email: 'test@example.com',
                    givenName: 'Test',
                    surname: 'User'
                },
                billing: {
                    street1: 'Test Street',
                    city: 'Riyadh',
                    state: 'Riyadh',
                    country: 'SA',
                    postcode: '12345'
                }
            };

            const response = await axios.post('http://localhost:5000/api/hyperpay/create-checkout', checkoutData);

            if (response.data.success && response.data.data.checkoutId) {
                setCheckoutId(response.data.data.checkoutId);
                setStep('widget');
                loadHyperPayWidget(response.data.data.checkoutId);
            } else {
                throw new Error(response.data.error || 'Failed to create checkout');
            }

        } catch (error) {
            console.error('❌ Payment initialization failed:', error);
            setError(error.message);
            setStep('error');
            if (onError) onError(error);
        }
    };

    // ✅ تحميل HyperPay Widget - بسيط وسريع
    const loadHyperPayWidget = (checkoutId) => {
        try {
            console.log('📦 Loading HyperPay widget for checkout:', checkoutId);

            // إزالة أي scripts سابقة
            const existingScript = document.querySelector('script[src*="paymentWidgets.js"]');
            if (existingScript) {
                existingScript.remove();
            }

            // إنشاء script جديد
            const script = document.createElement('script');
            script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
            script.async = true;
            script.onload = () => {
                console.log('✅ HyperPay widget loaded successfully');
                createPaymentForm();
            };
            script.onerror = () => {
                console.error('❌ Failed to load HyperPay widget');
                setError('Failed to load payment form');
                setStep('error');
            };

            document.head.appendChild(script);

        } catch (error) {
            console.error('❌ Error loading HyperPay widget:', error);
            setError('Failed to load payment form');
            setStep('error');
        }
    };

    // ✅ إنشاء نموذج الدفع - بسيط وسريع
    const createPaymentForm = () => {
        try {
            if (!widgetContainerRef.current) return;

            // إعداد خيارات HyperPay
            window.wpwlOptions = {
                paymentTarget: "_top",
                brandDetection: true,
                brandDetectionPriority: ["MADA", "VISA", "MASTER"],
                style: "card",
                locale: "ar",
                onReady: () => {
                    console.log('✅ Payment form ready');
                },
                onError: (error) => {
                    console.error('❌ Payment form error:', error);
                    setError('Payment form error: ' + error.message);
                    setStep('error');
                },
                onBeforeSubmit: () => {
                    console.log('📤 Payment form submitted');
                    setStep('loading');
                }
            };

            // إنشاء النموذج
            const form = document.createElement('form');
            form.action = `${window.location.origin}/payment-result`;
            form.className = 'paymentWidgets';
            form.setAttribute('data-brands', 'VISA MASTER MADA');

            widgetContainerRef.current.innerHTML = '';
            widgetContainerRef.current.appendChild(form);

            console.log('✅ Payment form created successfully');

        } catch (error) {
            console.error('❌ Error creating payment form:', error);
            setError('Failed to create payment form');
            setStep('error');
        }
    };

    // ✅ بدء العملية عند التحميل
    useEffect(() => {
        if (step === 'init') {
            initializePayment();
        }
    }, [step]);

    // ✅ Render Loading State
    if (step === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    جاري إعداد الدفع...
                </h3>
                <p className="text-gray-600 text-center">
                    يرجى الانتظار بينما نقوم بإعداد نموذج الدفع الآمن
                </p>
            </div>
        );
    }

    // ✅ Render Error State
    if (step === 'error') {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">❌</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    خطأ في إعداد الدفع
                </h3>
                <p className="text-gray-600 text-center mb-4">
                    {error || 'حدث خطأ أثناء إعداد نموذج الدفع'}
                </p>
                <button
                    onClick={() => setStep('init')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    // ✅ Render Widget State
    if (step === 'widget') {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="text-green-600 text-2xl">🔒</div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        الدفع الآمن مع HyperPay
                    </h3>
                </div>

                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-blue-600">💳</div>
                        <span className="text-sm font-medium text-blue-800">
                            بطاقات مدعومة:
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white border border-blue-300 rounded text-xs text-blue-700">
                            MADA
                        </span>
                        <span className="px-2 py-1 bg-white border border-blue-300 rounded text-xs text-blue-700">
                            VISA
                        </span>
                        <span className="px-2 py-1 bg-white border border-blue-300 rounded text-xs text-blue-700">
                            MasterCard
                        </span>
                    </div>
                </div>

                <div ref={widgetContainerRef} className="min-h-[200px]">
                    {/* HyperPay Widget سيتم تحميله هنا */}
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                    🔒 جميع المعاملات محمية بتقنية التشفير المتقدمة
                </div>
            </div>
        );
    }

    return null;
};

export default SimpleHyperPayWidget;
