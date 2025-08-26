import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Package,
  QrCode,
  Car,
  Star,
  Clock,
  MapPin,
  Settings,
  LogOut,
  Edit,
  Download,
  Share2,
  Crown,
  Award,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../useAuth';
import { userPackageAPI, packageAPI } from '../api';

const Profile = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('qr-code');
  const { user, logout, isAuth, token } = useAuth();

  const [userPackages, setUserPackages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [packageInfo, setPackageInfo] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (user) {
        // جلب باقات المستخدم
        // const packagesResponse = await packageAPI.getUserPackages(user.id);
        // console.log('Packages response:', packagesResponse);
        setUserPackages(user.package);

        // Fetch QR code and package info
        await fetchQRCodeData();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('حدث خطأ في تحميل بيانات المستخدم');
    } finally {
      setLoading(false);
    }
  };

  const fetchQRCodeData = async () => {
    try {
      setQrLoading(true);

      // Fetch QR code data
      const qrResponse = await fetch('http://localhost:5000/api/user/package-qr-code', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('QR response:', qrResponse);
      if (qrResponse.ok) {
        const qrData = await qrResponse.json();
        setQrCodeData(qrData.data.qrCode);
        setPackageInfo(qrData.data.packageInfo);
      }

      // Fetch package status
      const statusResponse = await fetch('http://localhost:5000/api/user/package-status', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Status response:', statusResponse);

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        if (statusData.data.hasPackage) {
          setPackageInfo(prev => ({
            ...prev,
            ...statusData.data.package
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    } finally {
      setQrLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'paypass-qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PayPass QR Code',
          text: 'استخدم هذا QR Code للوصول إلى خدمات غسيل السيارات',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط إلى الحافظة');
    }
  };

  const tabs = [
    { id: 'qr-code', label: 'QR Code', icon: <QrCode className="w-5 h-5" /> },
    { id: 'profile', label: 'الملف الشخصي', icon: <User className="w-5 h-5" /> },
    { id: 'packages', label: 'الباقات', icon: <Package className="w-5 h-5" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }


  // console.log('qrCodeData', qrCodeData);
  console.log('userPackes', userPackages);

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
          <User className="w-4 h-4" />
          الملف الشخصي
          <User className="w-4 h-4" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">مرحباً بك، {user?.username}</h1>
        <p className="text-gray-600 text-lg">إدارة حسابك وباقاتك</p>
      </motion.div>





      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mb-8"
      >
        <div className="flex  gap-5 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >

        {/* QR Code Tab */}
        {activeTab === 'qr-code' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <QrCode className="w-4 h-4" />
                  QR Code الخاص بك
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">عرض QR Code للوصول السريع</h3>
                <p className="text-gray-600">استخدم هذا QR Code للوصول إلى خدمات غسيل السيارات</p>
              </div>

              {qrLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                  <span className="ml-3 text-gray-600">جاري تحميل QR Code...</span>
                </div>
              ) : qrCodeData && packageInfo.washesLeft > 0 ? (
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  {/* QR Code */}
                  <div className="text-center">
                    <h1>{packageInfo.washesLeft === 0 || packageInfo.washesLeft === null ? 'لا يوجد غسلات متبقية' : 'يوجد غسلات متبقية'}</h1>
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 inline-block">
                      <img
                        src={qrCodeData}
                        alt="QR Code"
                        className="w-48 h-48 mx-auto"
                        id="qr-code-canvas"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={downloadQRCode}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                      >
                        <Download className="w-4 h-4" />
                        تحميل QR Code
                      </button>
                      <button
                        onClick={shareQRCode}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                      >
                        <Share2 className="w-4 h-4" />
                        مشاركة
                      </button>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5 text-green-600" />
                        معلومات الباقة
                      </h4>

                      {packageInfo ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">اسم الباقة:</span>
                            <span className="font-semibold text-gray-900">{packageInfo.packageName || packageInfo.name}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">عدد الغسلات المتبقية:</span>
                            <span className="font-semibold text-green-600">
                              {packageInfo.washesLeft || packageInfo.paidWashesLeft || 0}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">حجم السيارة:</span>
                            <span className="font-semibold text-gray-900 capitalize">
                              {packageInfo.size === 'small' ? 'صغير' :
                                packageInfo.size === 'medium' ? 'متوسط' :
                                  packageInfo.size === 'large' ? 'كبير' : packageInfo.size}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">السعر الأساسي:</span>
                            <span className="font-semibold text-gray-900">{packageInfo.basePrice} ريال</span>
                          </div>

                          {packageInfo.originalPrice && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">السعر الأصلي:</span>
                              <span className="font-semibold text-gray-500 line-through">{packageInfo.originalPrice} ريال</span>
                            </div>
                          )}

                          {packageInfo.savings && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">التوفير:</span>
                              <span className="font-semibold text-green-600">{packageInfo.savings} ريال</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">لا توجد باقة نشطة</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">لا يمكن تحميل QR Code في الوقت الحالي</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid gap-8">
            {/* User Info Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{user?.name || user?.email || 'المستخدم'}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-semibold text-gray-900">{user?.email || 'غير محدد'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">رقم الهاتف</p>
                    <p className="font-semibold text-gray-900">{user?.phone || 'غير محدد'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">تاريخ الانضمام</p>
                    <p className="font-semibold text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-SA') : 'غير محدد'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => navigate('/update-profile')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  تعديل الملف الشخصي
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full border-2 border-red-500 text-red-600 font-bold py-3 px-6 rounded-xl hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="grid gap-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <Package className="w-4 h-4" />
                  باقاتي
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">الباقات المشتركة</h3>
                <p className="text-gray-600">عرض جميع الباقات المشتركة وتفاصيلها</p>
              </div>

              {userPackages ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-900">{userPackages.name}</h4>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        نشطة
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">عدد الغسلات المتبقية:</span>
                          <span className="font-semibold text-green-600">{userPackages.washes || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">حجم السيارة:</span>
                          <span className="font-semibold text-gray-900">
                            {userPackages.size === 'small' ? 'صغير' :
                              userPackages.size === 'medium' ? 'متوسط' :
                                userPackages.size === 'large' ? 'كبير' : userPackages.size}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">مدة الباقة:</span>
                          <span className="font-semibold text-gray-900">{userPackages.duration} يوم</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">السعر الأساسي:</span>
                          <span className="font-semibold text-gray-900">{userPackages.basePrice} ريال</span>
                        </div>
                        {userPackages.originalPrice && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">السعر الأصلي:</span>
                            <span className="font-semibold text-gray-500 line-through">{userPackages.originalPrice} ريال</span>
                          </div>
                        )}
                        {userPackages.savings && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">التوفير:</span>
                            <span className="font-semibold text-green-600">{userPackages.savings} ريال</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    {userPackages.features && userPackages.features.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-green-200">
                        <h5 className="font-semibold text-gray-900 mb-3">المميزات:</h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {userPackages.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">لا توجد باقات</h4>
                  <p className="text-gray-600 mb-6">لم تقم بشراء أي باقات بعد</p>
                  <button
                    onClick={() => navigate('/packages')}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                  >
                    <Package className="w-5 h-5" />
                    تصفح الباقات
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default Profile; 