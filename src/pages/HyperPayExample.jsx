import React, { useState } from 'react';
import HyperPayPayment from '../components/HyperPayPayment';
import { hyperpayAPI } from '../api';
import './HyperPayExample.css';

const HyperPayExample = () => {
    const [showPayment, setShowPayment] = useState(false);
    const [healthStatus, setHealthStatus] = useState(null);

    // Sample data for demonstration
    const samplePackage = {
        _id: '64f1a2b3c4d5e6f7a8b9c0d2',
        name: 'باقة الغسيل الشاملة',
        washes: 10,
        duration: 30,
        price: 225.00
    };

    const sampleCar = {
        _id: '64f1a2b3c4d5e6f7a8b9c0d3',
        brand: 'تويوتا',
        model: 'كامري',
        year: 2022,
        size: 'sedan'
    };

    // Check HyperPay health status
    const checkHealth = async () => {
        try {
            const response = await hyperpayAPI.getHealth();
            setHealthStatus(response);
        } catch (error) {
            setHealthStatus({ success: false, error: error.message });
        }
    };

    // Handle payment success
    const handlePaymentSuccess = (data) => {
        console.log('Payment successful:', data);
        alert('تم إتمام عملية الدفع بنجاح!');
        setShowPayment(false);
    };

    // Handle payment error
    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
        alert('فشل في عملية الدفع: ' + error.message);
    };

    // Handle payment cancellation
    const handlePaymentCancel = () => {
        console.log('Payment cancelled');
        setShowPayment(false);
    };

    return (
        <div className="hyperpay-example-page">
            <div className="container">
                <header className="page-header">
                    <h1>HyperPay Integration Example</h1>
                    <p>مثال على تكامل نظام الدفع HyperPay</p>
                </header>

                <div className="content-section">
                    <div className="health-check-section">
                        <h2>فحص حالة HyperPay</h2>
                        <button
                            className="btn-check-health"
                            onClick={checkHealth}
                        >
                            فحص الحالة
                        </button>

                        {healthStatus && (
                            <div className={`health-status ${healthStatus.success ? 'success' : 'error'}`}>
                                <h3>حالة النظام:</h3>
                                <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
                            </div>
                        )}
                    </div>

                    <div className="payment-demo-section">
                        <h2>تجربة الدفع</h2>

                        <div className="demo-summary">
                            <h3>تفاصيل الطلب التجريبي</h3>
                            <div className="demo-item">
                                <strong>الباقة:</strong> {samplePackage.name}
                            </div>
                            <div className="demo-item">
                                <strong>السيارة:</strong> {sampleCar.brand} {sampleCar.model}
                            </div>
                            <div className="demo-item">
                                <strong>عدد الغسلات:</strong> {samplePackage.washes}
                            </div>
                            <div className="demo-item">
                                <strong>المبلغ:</strong> {samplePackage.price.toFixed(2)} ريال
                            </div>
                        </div>

                        <button
                            className="btn-start-payment"
                            onClick={() => setShowPayment(true)}
                        >
                            بدء عملية الدفع
                        </button>
                    </div>

                    {showPayment && (
                        <div className="payment-modal">
                            <div className="modal-overlay" onClick={() => setShowPayment(false)}></div>
                            <div className="modal-content">
                                <button
                                    className="modal-close"
                                    onClick={() => setShowPayment(false)}
                                >
                                    ×
                                </button>

                                <HyperPayPayment
                                    amount={samplePackage.price}
                                    package={samplePackage}
                                    car={sampleCar}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                    onCancel={handlePaymentCancel}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="documentation-section">
                    <h2>التوثيق</h2>

                    <div className="doc-item">
                        <h3>كيفية الاستخدام</h3>
                        <ol>
                            <li>قم بتثبيت المتطلبات الأساسية</li>
                            <li>أضف متغيرات البيئة المطلوبة</li>
                            <li>استورد مكون HyperPayPayment</li>
                            <li>مرر البيانات المطلوبة (المبلغ، الباقة، السيارة)</li>
                            <li>تعامل مع الأحداث (النجاح، الخطأ، الإلغاء)</li>
                        </ol>
                    </div>

                    <div className="doc-item">
                        <h3>متغيرات البيئة المطلوبة</h3>
                        <pre>
                            {`HYPERPAY_BASE_URL=https://eu-test.oppwa.com
HYPERPAY_ACCESS_TOKEN=your_access_token_here
HYPERPAY_ENTITY_ID=your_entity_id_here
FRONTEND_URL=https://your-frontend-url.com`}
                        </pre>
                    </div>

                    <div className="doc-item">
                        <h3>بيانات الاختبار</h3>
                        <p><strong>بطاقات الاختبار:</strong></p>
                        <ul>
                            <li>Visa: 4440000009900010</li>
                            <li>MasterCard: 5123450000000008</li>
                            <li>MADA: 5360230159427034</li>
                        </ul>
                        <p><strong>أي تاريخ انتهاء صالح وأي رمز CVV</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HyperPayExample;
