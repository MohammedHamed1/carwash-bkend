import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, 
  ArrowLeft, 
  Save, 
  Loader2, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Palette,
  Hash,
  Tag,
  Settings,
  Type,
  Sparkles
} from 'lucide-react';
import Notification from '../components/common/Notification';

const CreateCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    plateNumber: '',
    size: 'medium',
    licensePlate: '',
    make: 'clean',
    type: 'other'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Notification helpers
  const displayNotification = (type, title, message) => {
    setNotificationData({ type, title, message });
    setShowNotification(true);
  };

  const showSuccessNotification = (message) => {
    displayNotification('success', 'تم بنجاح', message);
  };

  const showErrorNotification = (message) => {
    displayNotification('error', 'خطأ', message);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = 'يرجى إدخال ماركة السيارة';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'يرجى إدخال موديل السيارة';
    }

    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'يرجى إدخال سنة صحيحة';
    }

    if (!formData.color.trim()) {
      newErrors.color = 'يرجى إدخال لون السيارة';
    }

    if (!formData.plateNumber.trim()) {
      newErrors.plateNumber = 'يرجى إدخال رقم اللوحة';
    }

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'يرجى إدخال رقم الترخيص';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showErrorNotification('يرجى التأكد من صحة البيانات المدخلة');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('frontend_token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('data create car',data)

      if (response.ok) {
        showSuccessNotification('تم إضافة السيارة بنجاح');
        
        // Save car data to localStorage for package details
        localStorage.setItem('selectedCar', JSON.stringify(data));
        
        // Navigate to package details after a short delay
        setTimeout(() => {
          // Get the selected package from location state or localStorage
          const selectedPackage = location.state?.selectedPackage || JSON.parse(localStorage.getItem('selectedPackage'));
          
          if (selectedPackage) {
            navigate(`/package-details/${selectedPackage._id || selectedPackage.id}`, {
              state: { 
                selectedPackage,
                selectedCar: data
              }
            });
          } else {
            navigate('/packages');
          }
        }, 1500);
      } else {
        showErrorNotification(data.message || 'حدث خطأ في إضافة السيارة');
      }
    } catch (error) {
      console.error('Error creating car:', error);
      showErrorNotification('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPackages = () => {
    navigate('/packages');
  };

  const carSizes = [
    { value: 'small', label: 'سيارة صغيرة', description: 'سيدان، هاتشباك' },
    { value: 'medium', label: 'سيارة متوسطة', description: 'SUV، كروس أوفر' },
    { value: 'large', label: 'سيارة كبيرة', description: 'فان، بيك أب' }
  ];

  const carTypes = [
    { value: 'sedan', label: 'سيدان' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'هاتشباك' },
    { value: 'pickup', label: 'بيك أب' },
    { value: 'van', label: 'فان' },
    { value: 'other', label: 'أخرى' }
  ];

  const carMakes = [
    { value: 'clean', label: 'نظيفة' },
    { value: 'dirty', label: 'متسخة' },
    { value: 'very_dirty', label: 'متسخة جداً' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
          onClick={handleBackToPackages}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة إلى الباقات
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إضافة سيارة جديدة</h1>
          <p className="text-gray-600">أدخل بيانات سيارتك للمتابعة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Car Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  ماركة السيارة *
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="مثال: Toyota"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Settings className="w-4 h-4 inline mr-2" />
                  موديل السيارة *
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="مثال: Camry"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.model ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  سنة الصنع *
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-2" />
                  لون السيارة *
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="مثال: أبيض"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.color ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.color && (
                  <p className="text-red-500 text-sm mt-1">{errors.color}</p>
                )}
              </div>
            </div>

            {/* License Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
                  رقم اللوحة *
                </label>
                <input
                  type="text"
                  value={formData.plateNumber}
                  onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                  placeholder="مثال: ABC123"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.plateNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.plateNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.plateNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  رقم الترخيص *
                </label>
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                  placeholder="مثال: 1427 S R C"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.licensePlate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.licensePlate && (
                  <p className="text-red-500 text-sm mt-1">{errors.licensePlate}</p>
                )}
              </div>
            </div>

            {/* Car Specifications */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  حجم السيارة
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  {carSizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {carSizes.find(s => s.value === formData.size)?.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Type className="w-4 h-4 inline mr-2" />
                  نوع السيارة
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  {carTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  حالة السيارة
                </label>
                <select
                  value={formData.make}
                  onChange={(e) => handleInputChange('make', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  {carMakes.map(make => (
                    <option key={make.value} value={make.value}>
                      {make.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري الإضافة...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Save className="w-5 h-5" />
                    <span>إضافة السيارة والمتابعة</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Toaster Notification */}
      {showNotification && (
        <Notification
          type={notificationData.type}
          title={notificationData.title}
          message={notificationData.message}
          onClose={() => setShowNotification(false)}
          position="top-right"
          duration={4000}
        />
      )}
    </div>
  );
};

export default CreateCar;
