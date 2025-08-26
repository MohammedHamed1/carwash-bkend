import React, { useState, useEffect } from 'react';

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [usageRecords, setUsageRecords] = useState([]);

  useEffect(() => {
    // تحميل البيانات من localStorage
    loadData();
  }, []);

  const loadData = () => {
    // محاكاة بيانات الاشتراكات
    const mockSubscriptions = [
      {
        id: 'SUB_001',
        clientId: 'CLIENT_001',
        name: 'أحمد محمد علي',
        phone: '+966501234567',
        packageType: 'VIP',
        carSize: 'كبير',
        totalWashes: 12,
        remainingWashes: 8,
        startDate: '2024-01-01',
        expiryDate: '2024-01-31',
        remainingDays: 15,
        status: 'active'
      },
      {
        id: 'SUB_002',
        clientId: 'CLIENT_002',
        name: 'فاطمة أحمد',
        phone: '+966502345678',
        packageType: 'Premium',
        carSize: 'متوسط',
        totalWashes: 8,
        remainingWashes: 3,
        startDate: '2024-01-05',
        expiryDate: '2024-02-04',
        remainingDays: 20,
        status: 'active'
      },
      {
        id: 'SUB_003',
        clientId: 'CLIENT_003',
        name: 'محمد عبدالله',
        phone: '+966503456789',
        packageType: 'Basic',
        carSize: 'صغير',
        totalWashes: 5,
        remainingWashes: 0,
        startDate: '2023-12-15',
        expiryDate: '2024-01-14',
        remainingDays: 0,
        status: 'expired'
      }
    ];

    setSubscriptions(mockSubscriptions);

    // تحميل سجل الاستخدام
    const records = JSON.parse(localStorage.getItem('usageRecords') || '[]');
    setUsageRecords(records);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPackageColor = (packageType) => {
    switch (packageType) {
      case 'VIP':
        return 'text-purple-600 bg-purple-100';
      case 'Premium':
        return 'text-blue-600 bg-blue-100';
      case 'Advanced':
        return 'text-green-600 bg-green-100';
      case 'Basic':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleRenewSubscription = (subscriptionId) => {
    // محاكاة تجديد الاشتراك
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === subscriptionId) {
        return {
          ...sub,
          remainingWashes: sub.totalWashes,
          remainingDays: 30,
          startDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'active'
        };
      }
      return sub;
    });
    setSubscriptions(updatedSubscriptions);
    alert('تم تجديد الاشتراك بنجاح!');
  };

  const getUsageStats = () => {
    const totalSubscriptions = subscriptions.length;
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
    const totalWashesUsed = subscriptions.reduce((sum, sub) => sum + (sub.totalWashes - sub.remainingWashes), 0);
    const totalWashesRemaining = subscriptions.reduce((sum, sub) => sum + sub.remainingWashes, 0);

    return {
      totalSubscriptions,
      activeSubscriptions,
      totalWashesUsed,
      totalWashesRemaining
    };
  };

  const stats = getUsageStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">إدارة الاشتراكات</h1>
          <p className="text-gray-600">عرض وإدارة جميع اشتراكات العملاء</p>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalSubscriptions}</div>
            <div className="text-gray-600">إجمالي الاشتراكات</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeSubscriptions}</div>
            <div className="text-gray-600">الاشتراكات النشطة</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalWashesUsed}</div>
            <div className="text-gray-600">الغسلات المستخدمة</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalWashesRemaining}</div>
            <div className="text-gray-600">الغسلات المتبقية</div>
          </div>
        </div>

        {/* قائمة الاشتراكات */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">قائمة الاشتراكات</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">العميل</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">نوع الاشتراك</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الغسلات المتبقية</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الأيام المتبقية</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-800">{subscription.name}</div>
                        <div className="text-sm text-gray-600">{subscription.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPackageColor(subscription.packageType)}`}>
                        {subscription.packageType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{subscription.remainingWashes}</div>
                        <div className="text-xs text-gray-500">من {subscription.totalWashes}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <div className="font-bold text-green-600">{subscription.remainingDays}</div>
                        <div className="text-xs text-gray-500">يوم</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(subscription.status)}`}>
                        {subscription.status === 'active' ? 'نشط' : 
                         subscription.status === 'expired' ? 'منتهي' : 'معلق'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => setSelectedSubscription(subscription)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                        >
                          عرض
                        </button>
                        {subscription.status === 'expired' && (
                          <button
                            onClick={() => handleRenewSubscription(subscription.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                          >
                            تجديد
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* سجل الاستخدام */}
        {usageRecords.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">سجل الاستخدام</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {usageRecords.map((record, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">العميل: {record.clientId}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(record.timestamp).toLocaleString('ar-SA')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {record.action === 'scan' ? 'مسح QR Code' : 'استخدام غسلة'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-600">{record.branch}</div>
                      {record.location && (
                        <div className="text-xs text-gray-500">
                          {record.location.lat.toFixed(4)}, {record.location.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تفاصيل الاشتراك المحدد */}
        {selectedSubscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">تفاصيل الاشتراك</h3>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">الاسم</label>
                    <div className="font-semibold">{selectedSubscription.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">الهاتف</label>
                    <div className="font-semibold">{selectedSubscription.phone}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">نوع الاشتراك</label>
                    <div className="font-semibold text-purple-600">{selectedSubscription.packageType}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">حجم السيارة</label>
                    <div className="font-semibold text-orange-600">{selectedSubscription.carSize}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">تاريخ البداية</label>
                    <div className="font-semibold">{selectedSubscription.startDate}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">تاريخ الانتهاء</label>
                    <div className="font-semibold">{selectedSubscription.expiryDate}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">الغسلات المستخدمة</label>
                    <div className="font-semibold text-blue-600">
                      {selectedSubscription.totalWashes - selectedSubscription.remainingWashes}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">الغسلات المتبقية</label>
                    <div className="font-semibold text-green-600">{selectedSubscription.remainingWashes}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  إغلاق
                </button>
                {selectedSubscription.status === 'expired' && (
                  <button
                    onClick={() => {
                      handleRenewSubscription(selectedSubscription.id);
                      setSelectedSubscription(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    تجديد الاشتراك
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManager; 