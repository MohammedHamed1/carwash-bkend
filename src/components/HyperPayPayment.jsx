import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Shield,
    Loader2,
    AlertTriangle,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { hyperpayAPI } from '../api-hyperpay-fixed';

const HyperPayPayment = ({
    amount,
    currency = 'SAR',
    customer,
    billing,
    package: packageData,
    car,
    onSuccess,
    onError,
    onCancel,
    isVIP = false
}) => {
    const [step, setStep] = useState('init'); // init, checkout, processing, success, error
    const [checkoutId, setCheckoutId] = useState(null);
    const [integrity, setIntegrity] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentFormHtml, setPaymentFormHtml] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [threeDSecure, setThreeDSecure] = useState(true);

    const scriptRef = useRef(null);

    // Initialize payment process
    useEffect(() => {
        if (step === 'init') {
            initializePayment();
        }
    }, [step]);

    // Initialize payment with HyperPay 3D Secure
    const initializePayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log('🚀 Initializing HyperPay payment with 3D Secure...');

            // Prepare checkout data with 3D Secure
            const checkoutData = {
                amount: Number(amount).toFixed(2),
                currency,
                paymentType: 'DB',
                customer: {
                    email: customer?.email || 'test@example.com',
                    givenName: customer?.givenName || customer?.name?.split(' ')[0] || 'Test',
                    surname: customer?.surname || customer?.name?.split(' ').slice(1).join(' ') || 'User'
                },
                billing: {
                    street1: billing?.street1 || 'Test Street',
                    city: billing?.city || 'Riyadh',
                    state: billing?.state || 'Riyadh',
                    country: billing?.country || 'SA',
                    postcode: billing?.postcode || '12345'
                }
            };

            console.log('📤 Preparing checkout with 3D Secure:', checkoutData);

            const response = await hyperpayAPI.prepareCheckout(checkoutData);

            if (response.success) {
                console.log('✅ Checkout prepared successfully with 3D Secure');
                console.log('📋 Response data:', response);
                
                // استخراج checkoutId من الاستجابة
                const checkoutId = response.checkoutId || response.data?.id;
                if (!checkoutId) {
                    throw new Error('No checkoutId received from server');
                }
                
                setCheckoutId(checkoutId);
                setThreeDSecure(true);
                setStep('checkout');
            } else {
                throw new Error(response.error || 'Failed to prepare checkout');
            }

        } catch (error) {
            console.error('❌ Payment initialization error:', error);
            setError(error.message || 'Failed to initialize payment');
            setStep('error');
            if (onError) onError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Create payment form with 3D Secure
    const createPaymentForm = async () => {
        try {
            console.log('📝 Creating payment form with 3D Secure...');

            // --- هنا يبدأ تنفيذ الخطوة الثانية ---
            
            // 1. إنشاء النموذج مباشرة
            const form = document.createElement('form');
            form.action = `${window.location.origin}/payment-result`; // رابط صفحة عرض النتيجة
            form.className = 'paymentWidgets';
            form.setAttribute('data-brands', 'VISA MASTER MADA');
            
            console.log('🔧 Creating form with checkoutId:', checkoutId);
            console.log('🔧 Form action:', form.action);

            // 2. إنشاء السكربت
            const script = document.createElement('script');
            script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;

            // 3. إضافة النموذج والسكربت إلى الصفحة
            const formContainer = document.getElementById('payment-form-container');
            console.log('🔍 Looking for payment-form-container...');
            console.log('🔍 All elements with id:', document.querySelectorAll('[id]'));
            
            if (formContainer) {
                formContainer.innerHTML = ''; // تنظيف أي محتوى قديم
                formContainer.appendChild(form);
                document.body.appendChild(script);
                
                console.log('✅ Payment form created with 3D Secure');
                console.log('✅ Form added to container:', formContainer);
                console.log('✅ Script added to body');
                setShowPaymentForm(true);
            } else {
                console.error('❌ Payment form container not found');
                console.error('❌ Available elements:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
                
                // محاولة إنشاء الحاوية تلقائياً
                console.log('🔄 Trying to create container automatically...');
                const newContainer = document.createElement('div');
                newContainer.id = 'payment-form-container';
                newContainer.className = 'payment-form-container';
                document.body.appendChild(newContainer);
                
                newContainer.appendChild(form);
                document.body.appendChild(script);
                
                console.log('✅ Payment form created with auto-generated container');
                setShowPaymentForm(true);
            }

        } catch (error) {
            console.error('❌ Payment form creation error:', error);
            setError(error.message || 'Failed to create payment form');
            setStep('error');
            if (onError) onError(error);
        }
    };

    // Load HyperPay script with 3D Secure support
    useEffect(() => {
        if (checkoutId && step === 'checkout') {
            // تأخير قليل للتأكد من أن DOM تم تحديثه
            setTimeout(() => {
                loadHyperPayScript();
            }, 100);
        }
    }, [checkoutId, step]);

    // Add wpwlOptions for 3D Secure
    useEffect(() => {
        // Add wpwlOptions before loading the script
        if (!window.wpwlOptions) {
            window.wpwlOptions = {
                paymentTarget: "_top",
                style: "card"
            };
            console.log('✅ wpwlOptions configured:', window.wpwlOptions);
        }
    }, []);

    const loadHyperPayScript = () => {
        try {
            console.log('📜 Loading HyperPay script with 3D Secure...');

            // Remove existing script if any
            if (scriptRef.current) {
                document.head.removeChild(scriptRef.current);
            }

            // Create new script element
            const script = document.createElement('script');
            script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
            script.async = true;

            script.onload = () => {
                console.log('✅ HyperPay script loaded successfully with 3D Secure');
                createPaymentForm();
            };

            script.onerror = (error) => {
                console.error('❌ Failed to load HyperPay script:', error);
                setError('Failed to load payment system');
                setStep('error');
                if (onError) onError(new Error('Failed to load payment system'));
            };

            scriptRef.current = script;
            document.head.appendChild(script);

        } catch (error) {
            console.error('❌ Script loading error:', error);
            setError('Failed to load payment system');
            setStep('error');
            if (onError) onError(error);
        }
    };

    // Handle payment submission with 3D Secure
    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        setStep('processing');

        try {
            console.log('🔄 Processing payment with 3D Secure...');

            // The actual payment processing is handled by HyperPay widget
            // We just need to wait for the redirect to payment-result page
            // The payment status will be checked there

        } catch (error) {
            console.error('❌ Payment submission error:', error);
            setError(error.message || 'Payment submission failed');
            setStep('error');
            if (onError) onError(error);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scriptRef.current && scriptRef.current.parentNode) {
                try {
                    scriptRef.current.parentNode.removeChild(scriptRef.current);
                } catch (error) {
                    console.log('Script already removed');
                }
            }
        };
    }, []);

    // Render loading state
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 text-center"
            >
                <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    جاري إعداد الدفع الآمن...
                </h3>
                <p className="text-gray-600">
                    يرجى الانتظار بينما نقوم بإعداد نظام الدفع مع 3D Secure
                </p>
            </motion.div>
        );
    }

    // Render error state
    if (step === 'error') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        خطأ في إعداد الدفع
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {error || 'حدث خطأ أثناء إعداد نظام الدفع'}
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => {
                            setStep('init');
                            setError(null);
                        }}
                        className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                        إعادة المحاولة
                    </button>

                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                        >
                            إلغاء الدفع
                        </button>
                    )}
                </div>
            </motion.div>
        );
    }

    // Render payment form with 3D Secure
    if (step === 'checkout' && showPaymentForm) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        إتمام الدفع الآمن مع 3D Secure
                    </h3>
                    <p className="text-gray-600">
                        المبلغ: <span className="font-bold text-green-600">{amount} {currency}</span>
                    </p>
                </div>

                {/* 3D Secure Security Info */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                            <h4 className="font-semibold text-green-800">دفع آمن مع 3D Secure</h4>
                            <p className="text-sm text-green-700">
                                جميع المعاملات محمية بتقنيات التشفير المتقدمة و 3D Secure من HyperPay
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3D Secure Authentication Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-blue-600" />
                        <div>
                            <h4 className="font-semibold text-blue-800">مصادقة 3D Secure</h4>
                            <p className="text-sm text-blue-700">
                                قد يتم توجيهك لصفحة البنك للمصادقة الإضافية. هذا إجراء أماني طبيعي.
                            </p>
                        </div>
                    </div>
                </div>

                {/* HyperPay Payment Form with 3D Secure */}
                <div id="payment-form-container" className="payment-form-container">
                    {/* The form will be dynamically created here */}
                </div>

                {/* Test Cards Info for Development */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
                    <h4 className="font-semibold text-yellow-800 mb-3">🧪 بطاقات الاختبار (3D Secure)</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-yellow-700">VISA (3DS):</span>
                            <span className="font-mono">4440000009900010</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-700">MADA (3DS):</span>
                            <span className="font-mono">5360230159427034</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-700">CVV:</span>
                            <span className="font-mono">100 (VISA) / 850 (MADA)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-700">Expiry:</span>
                            <span className="font-mono">01/39 (VISA) / 11/25 (MADA)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-700">Name:</span>
                            <span className="font-mono">Any Name</span>
                        </div>
                    </div>
                </div>

                {/* Cancel Button */}
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="w-full mt-4 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                    >
                        إلغاء الدفع
                    </button>
                )}
            </motion.div>
        );
    }

    // Render processing state
    if (step === 'processing') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 text-center"
            >
                <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    جاري معالجة الدفع...
                </h3>
                <p className="text-gray-600">
                    يرجى الانتظار بينما نعالج الدفع مع 3D Secure
                </p>
            </motion.div>
        );
    }

    // Default render
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-8 text-center"
        >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                إعداد الدفع الآمن
            </h3>
            <p className="text-gray-600 mb-6">
                جاري إعداد نظام الدفع مع 3D Secure...
            </p>
        </motion.div>
    );
};

export default HyperPayPayment;
