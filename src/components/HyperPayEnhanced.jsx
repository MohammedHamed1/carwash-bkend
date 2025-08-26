import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Shield,
    Loader2,
    AlertTriangle,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import { hyperpayEnhancedAPI, hyperpayFrontendHelpers } from '../api/hyperpay-enhanced';

const HyperPayEnhanced = ({
    amount,
    currency = 'SAR',
    customer,
    billing,
    onSuccess,
    onError,
    onCancel,
    options = {}
}) => {
    const [step, setStep] = useState('init'); // init, checkout, processing, success, error
    const [checkoutId, setCheckoutId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const scriptRef = useRef(null);

    useEffect(() => {
        if (step === 'init') {
            initializePayment();
        }
    }, [step]);

    const initializePayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log('🚀 Initializing enhanced HyperPay payment...');

            const paymentData = {
                amount: amount.toString(),
                currency,
                customerEmail: customer?.email || 'customer@example.com',
                customerName: customer?.name?.split(' ')[0] || customer?.givenName || 'Customer',
                customerSurname: customer?.name?.split(' ').slice(1).join(' ') || customer?.surname || 'Name',
                billingStreet: billing?.street1 || 'Test Street',
                billingCity: billing?.city || 'Riyadh',
                billingState: billing?.state || 'Central',
                billingCountry: billing?.country || 'SA'
            };

            const response = await hyperpayEnhancedAPI.createCheckout(paymentData);

            if (response.success) {
                console.log('✅ Checkout created successfully');
                setCheckoutId(response.checkoutId);
                setPaymentData(response.data);
                setStep('checkout');
            } else {
                throw new Error(response.error || 'Failed to create checkout');
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

    const loadPaymentWidget = () => {
        try {
            console.log('📜 Loading HyperPay widget...');

            // Remove existing script if any
            if (scriptRef.current) {
                document.head.removeChild(scriptRef.current);
            }

            // Create new script element
            const script = document.createElement('script');
            script.src = hyperpayEnhancedAPI.getWidgetUrl(checkoutId);
            script.async = true;

            script.onload = () => {
                console.log('✅ HyperPay widget loaded successfully');
                initializeWidget();
            };

            script.onerror = (error) => {
                console.error('❌ Failed to load HyperPay widget:', error);
                setError('Failed to load payment system');
                setStep('error');
                if (onError) onError(new Error('Failed to load payment system'));
            };

            scriptRef.current = script;
            document.head.appendChild(script);

        } catch (error) {
            console.error('❌ Widget loading error:', error);
            setError('Failed to load payment system');
            setStep('error');
            if (onError) onError(error);
        }
    };

    const initializeWidget = () => {
        try {
            // Initialize widget with custom options
            if (window.wpwlOptions) {
                window.wpwlOptions = {
                    ...window.wpwlOptions,
                    ...options,
                    paymentTarget: "_top",
                    brandDetection: true,
                    brandDetectionPriority: ["MADA", "VISA", "MASTER"],
                    style: "card",
                    locale: "en",
                    onReady: function () {
                        console.log("✅ HyperPay payment form ready");
                    },
                    onError: function (error) {
                        console.error("❌ HyperPay payment error:", error);
                        setError('Payment form error: ' + error.message);
                        setStep('error');
                    },
                    onBeforeSubmit: function () {
                        console.log("🔄 Payment submission started");
                        setStep('processing');
                        return true;
                    }
                };
            }
        } catch (error) {
            console.error('❌ Widget initialization error:', error);
        }
    };

    useEffect(() => {
        if (checkoutId && step === 'checkout') {
            loadPaymentWidget();
        }
    }, [checkoutId, step]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scriptRef.current) {
                document.head.removeChild(scriptRef.current);
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
                    يرجى الانتظار بينما نقوم بإعداد نظام الدفع
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
                    <p className="text-gray-600 mb-4">{error}</p>
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

    // Render payment form
    if (step === 'checkout' && checkoutId) {
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
                        إتمام الدفع الآمن
                    </h3>
                    <p className="text-gray-600">
                        المبلغ: <span className="font-bold text-green-600">{amount} {currency}</span>
                    </p>
                </div>

                {/* Security Info */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                            <h4 className="font-semibold text-green-800">دفع آمن ومشفر</h4>
                            <p className="text-sm text-green-700">
                                جميع المعاملات محمية بتقنيات التشفير المتقدمة من HyperPay
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="payment-form-container">
                    <form 
                        action="/payment/status" 
                        className="paymentWidgets" 
                        data-brands="VISA MASTER MADA"
                    ></form>
                </div>

                {/* Test Cards Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
                    <h4 className="font-semibold text-yellow-800 mb-3">🧪 بطاقات الاختبار</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-yellow-700">VISA:</span>
                            <span className="font-mono">4440000009900010</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-700">MADA:</span>
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
                    يرجى الانتظار بينما نعالج الدفع
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
                جاري إعداد نظام الدفع...
            </p>
        </motion.div>
    );
};

export default HyperPayEnhanced;
