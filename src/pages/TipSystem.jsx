import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Gift, 
  CreditCard, 
  Apple,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  ThumbsUp,
  Smile,
  Lock,
  Shield
} from 'lucide-react';
import { FaCreditCard, FaApple, FaLock, FaShieldAlt, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';
import PageContainer from '../components/common/PageContainer';
import applePayIcon from '../assets/apple-pay.png';
import visaIcon from '../assets/Visa.png';
import madaIcon from '../assets/Mada.png';
import mastercardIcon from '../assets/mastercard.png';

const TipSystem = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [tipMessage, setTipMessage] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    showCvv: false
  });

  const tipAmounts = [5, 10, 15, 20, 25, 30];

  const paymentMethods = [
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
    setSelectedPaymentMethod(methodId);
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
    setCardData(prev => ({ ...prev, [field]: value }));
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

  const handleTipSubmit = async () => {
    if (!selectedAmount && !customAmount) {
      alert('يرجى اختيار قيمة المكافأة');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('يرجى اختيار طريقة الدفع');
      return;
    }

    if (selectedPaymentMethod === 'credit' && (!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv)) {
      alert('يرجى إكمال معلومات البطاقة');
      return;
    }

    setIsProcessing(true);

    // محاكاة عملية الدفع
    setTimeout(() => {
      setIsProcessing(false);
      setShowThankYou(true);
      
      // حفظ بيانات المكافأة
      const tipData = {
        amount: selectedAmount || parseInt(customAmount),
        paymentMethod: selectedPaymentMethod,
        message: tipMessage,
        date: new Date().toISOString(),
        operationId: 'O' + Math.random().toString(36).substr(2, 8).toUpperCase()
      };
      
      localStorage.setItem('tipData', JSON.stringify(tipData));
    }, 2000);
  };

  const handleSkipTip = () => {
    navigate('/washing-completed');
  };

  if (showThankYou) {
    return (
      <PageContainer 
        className="bg-gradient-to-br from-green-50 to-emerald-100 p-4"
        centerContent={true}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">شكراً لمكافأتك! 🙏</h2>
          <p className="text-gray-600 mb-6">
            فريقنا يقدر دعمك وثقتك بنا. سنواصل تقديم أفضل خدمة لك!
          </p>
          
          <UnifiedButton
            variant="gradient"
            size="large"
            onClick={() => navigate('/washing-completed')}
            className="w-full"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            العودة للصفحة الرئيسية
          </UnifiedButton>
        </motion.div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">حابب تكافئنا؟ 💝</h1>
          <p className="text-gray-600">اختر قيمة المكافأة التي تناسبك</p>
        </motion.div>

        {/* Tip Amounts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">قيمة المكافأة</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {tipAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`border-2 rounded-xl py-3 text-center font-bold transition-all duration-300 ${
                  selectedAmount === amount 
                    ? 'bg-green-500 text-white border-green-500 shadow-lg transform scale-105' 
                    : 'bg-white text-green-700 border-green-300 hover:border-green-500 hover:shadow-md'
                }`}
              >
                {amount} ﷼
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">أو أدخل مبلغ مخصص</label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              placeholder="أدخل المبلغ"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-center text-lg"
            />
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">طريقة الدفع</h3>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPaymentMethod === method.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${method.isApplePay ? 'apple-pay-container' : `bg-gradient-to-r ${method.color} text-white shadow-md`} rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105`}>
                    {method.isApplePay ? (
                      <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="w-8 h-8 object-contain apple-pay-icon" />
                    ) : (
                      <method.icon className="w-7 h-7 drop-shadow-sm" />
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{method.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{method.description}</p>
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <FaCheckCircle className="w-6 h-6 text-orange-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* أيقونات البطاقات المقبولة */}
          {selectedPaymentMethod === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100 mb-4"
            >
              <div className="text-center mb-3">
                <h4 className="text-sm font-semibold text-orange-800 mb-1">البطاقات المقبولة</h4>
                <p className="text-xs text-orange-600">نقبل جميع البطاقات الرئيسية</p>
              </div>
                                <div className="card-icons-container">
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
              className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-lg mt-4"
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
          {selectedPaymentMethod === 'apple' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleApplePay}
              className="w-full bg-black text-white py-4 px-6 rounded-2xl font-bold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 mt-4"
            >
              <img src={applePayIcon} alt="Apple Pay" className="w-8 h-8" />
              <span>استخدم Apple Pay</span>
            </motion.button>
          )}
        </motion.div>

        {/* Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-500" />
            رسالة للموظف (اختياري)
          </h3>
          
          <textarea
            value={tipMessage}
            onChange={(e) => setTipMessage(e.target.value)}
            placeholder="اكتب رسالة للموظف..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none"
          />
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <UnifiedButton
            variant="gradient"
            size="large"
            onClick={handleTipSubmit}
            disabled={isProcessing || (!selectedAmount && !customAmount) || !selectedPaymentMethod || (selectedPaymentMethod === 'credit' && (!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv))}
            className="w-full"
            icon={isProcessing ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Heart className="w-5 h-5" />}
          >
            {isProcessing ? 'جاري الدفع...' : `أدفع المكافأة ${selectedAmount || customAmount || 0} ريال`}
          </UnifiedButton>
          
          <UnifiedButton
            variant="secondary"
            size="large"
            onClick={handleSkipTip}
            className="w-full"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            تخطي المكافأة
          </UnifiedButton>
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500">
            المكافأة اختيارية تماماً وستذهب مباشرة للموظف 🎁
          </p>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default TipSystem; 