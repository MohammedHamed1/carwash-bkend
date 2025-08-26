import React, { useState } from 'react';
import { FaCreditCard, FaApple, FaLock, FaShieldAlt, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import applePayIcon from '../assets/apple-pay.png';
import visaIcon from '../assets/Visa.png';
import madaIcon from '../assets/Mada.png';
import mastercardIcon from '../assets/mastercard.png';

const PaymentMethods = ({ onPaymentMethodChange, selectedMethod, onPaymentDataChange }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    showCvv: false
  });

  const paymentMethods = [
    {
      id: 'hyperpay',
      name: 'HyperPay الآمن',
      icon: FaShieldAlt,
      description: 'فيزا، ماستركارد، مدى - دفع آمن ومشفر',
      color: 'from-green-600 to-green-800',
      bgColor: 'from-green-50 to-green-100',
      isApplePay: false
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: applePayIcon,
      description: 'دفع سريع وآمن',
      color: 'from-gray-800 to-gray-900',
      bgColor: 'from-gray-50 to-gray-100',
      isApplePay: true
    },
    {
      id: 'credit',
      name: 'بطاقة ائتمان',
      icon: FaCreditCard,
      description: 'فيزا، ماستركارد، مدى',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      isApplePay: false
    }
  ];

  const handleMethodSelect = (methodId) => {
    onPaymentMethodChange(methodId);
    if (methodId === 'credit') {
      setShowCardForm(true);
    } else {
      setShowCardForm(false);
    }
  };

  const handleApplePay = () => {
    // محاكاة فتح Apple Pay
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
      alert('جاري فتح Apple Pay...');
      // هنا يمكن إضافة منطق Apple Pay الحقيقي
    } else {
      alert('Apple Pay غير متاح على هذا الجهاز');
    }
  };

  const handleCardInputChange = (field, value) => {
    const newCardData = { ...cardData, [field]: value };
    setCardData(newCardData);
    onPaymentDataChange(newCardData);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('6')) return 'mada';
    return 'unknown';
  };

  const cardType = getCardType(cardData.cardNumber);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        {/* العنوان الرئيسي */}
        <div className="payment-header">
          <div className="payment-header-icon">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="payment-header-text">طرق الدفع الآمنة</h3>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`payment-option-card ${selectedMethod === method.id ? 'selected' : ''}`}
            >
              {/* علامة الاختيار */}
              {selectedMethod === method.id && (
                <div className="payment-option-check">
                  <svg className="payment-option-check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="payment-option-content">
                <div className={`payment-option-icon ${method.isApplePay ? 'apple-pay-icon-container' : 'credit-card-icon-container'}`}>
                  {method.isApplePay ? (
                    <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="apple-pay-icon" />
                  ) : (
                    <svg className="credit-card-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  )}
                </div>
                <div className="payment-option-text">
                  <h3 className="payment-option-title">{method.name}</h3>
                  <p className="payment-option-description">{method.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* أيقونات البطاقات المقبولة */}
      {selectedMethod === 'card' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="card-icons-section"
        >
          <div className="card-icons-header">
            <h4 className="card-icons-title">البطاقات المقبولة</h4>
            <p className="card-icons-subtitle">نقبل جميع البطاقات الرئيسية</p>
          </div>
          <div className="card-icons-grid">
            <div className="card-icon-item">
              <img src="/src/assets/Visa.png" alt="Visa" className="card-icon-image" />
              <span className="card-icon-label">Visa</span>
            </div>
            <div className="card-icon-item">
              <img src="/src/assets/mastercard.png" alt="Mastercard" className="card-icon-image" />
              <span className="card-icon-label">Mastercard</span>
            </div>
            <div className="card-icon-item">
              <img src="/src/assets/Mada.png" alt="Mada" className="card-icon-image" />
              <span className="card-icon-label">مدى</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* نموذج بطاقة الائتمان */}
      {showCardForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaCreditCard className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-gray-800">معلومات البطاقة</h3>
          </div>

          <div className="space-y-4">
            {/* رقم البطاقة */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                رقم البطاقة *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardData.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-lg"
                />
                {cardType !== 'unknown' && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <img
                      src={
                        cardType === 'visa' ? visaIcon :
                          cardType === 'mastercard' ? mastercardIcon :
                            cardType === 'mada' ? madaIcon : null
                      }
                      alt={cardType}
                      className="h-6"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* اسم حامل البطاقة */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                اسم حامل البطاقة *
              </label>
              <input
                type="text"
                value={cardData.cardHolder}
                onChange={(e) => handleCardInputChange('cardHolder', e.target.value.toUpperCase())}
                placeholder="AHMED MOHAMMED"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* تاريخ الانتهاء */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  تاريخ الانتهاء *
                </label>
                <input
                  type="text"
                  value={cardData.expiryDate}
                  onChange={(e) => handleCardInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-lg"
                />
              </div>

              {/* رمز الأمان */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  رمز الأمان *
                </label>
                <div className="relative">
                  <input
                    type={cardData.showCvv ? "text" : "password"}
                    value={cardData.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setCardData(prev => ({ ...prev, showCvv: !prev.showCvv }))}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {cardData.showCvv ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* معلومات الأمان */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt className="w-5 h-5 text-green-600" />
              <h4 className="font-bold text-green-800">دفع آمن ومحمي</h4>
            </div>
            <ul className="space-y-1 text-sm text-green-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="w-3 h-3" />
                <span>تشفير SSL 256-bit</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="w-3 h-3" />
                <span>حماية من الاحتيال</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="w-3 h-3" />
                <span>ضمان استرداد الأموال</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* زر Apple Pay */}
      {selectedMethod === 'apple' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleApplePay}
          className="w-full bg-black text-white py-4 px-6 rounded-2xl font-bold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <img src={applePayIcon} alt="Apple Pay" className="w-8 h-8" />
          <span>استخدم Apple Pay</span>
        </motion.button>
      )}
    </div>
  );
};

export default PaymentMethods; 