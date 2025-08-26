import React, { useState, useEffect } from 'react';
import { FaCar, FaCog, FaCheckCircle, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { orderAPI } from '../api';

const LiveWashingTracker = () => {
  const [liveOrders, setLiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadLiveOrders();
    // تحديث كل 10 ثوان للتتبع المباشر
    const interval = setInterval(loadLiveOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadLiveOrders = async () => {
    try {
      const response = await orderAPI.getAll({ status: ['pending', 'in_progress', 'ready_for_pickup'] });
      setLiveOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error loading live orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      await loadLiveOrders(); // إعادة تحميل البيانات
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
      ready_for_pickup: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'في الانتظار',
      in_progress: 'قيد التنفيذ',
      ready_for_pickup: 'جاهز للاستلام',
      completed: 'مكتمل'
    };
    return statusTexts[status] || status;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="h-4 w-4" />;
      case 'in_progress':
        return <FaCog className="h-4 w-4" />;
      case 'ready_for_pickup':
        return <FaCheckCircle className="h-4 w-4" />;
      default:
        return <FaCar className="h-4 w-4" />;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedTime = (status, createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const elapsed = Math.floor((now - created) / 1000 / 60); // بالدقائق

    switch (status) {
      case 'pending':
        return '5-10 دقائق';
      case 'in_progress':
        return `${Math.max(0, 30 - elapsed)} دقيقة متبقية`;
      case 'ready_for_pickup':
        return 'جاهز الآن';
      default:
        return 'غير محدد';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="mr-3 text-gray-600">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <FaCog className="h-6 w-6 text-green-600 mr-3" />
          التتبع المباشر للغسلات
        </h2>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">مباشر</span>
        </div>
      </div>

      {liveOrders.length === 0 ? (
        <div className="text-center py-12">
          <FaCog className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">لا توجد غسلات نشطة حالياً</p>
          <p className="text-gray-500 text-sm">سيظهر هنا أي طلب جديد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveOrders.map((order) => (
            <div
              key={order._id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${selectedOrder?._id === order._id ? 'ring-2 ring-green-500' : ''
                }`}
              onClick={() => setSelectedOrder(order)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaCar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-semibold text-gray-900">#{order.orderNumber}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="mr-1">{getStatusText(order.status)}</span>
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex items-center mb-3">
                <FaUser className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">{order.customerName}</span>
              </div>

              {/* Branch Info */}
              <div className="flex items-center mb-3">
                <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">{order.branchName}</span>
              </div>

              {/* Package & Price */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">{order.packageName}</span>
                <span className="font-semibold text-green-600">${order.totalAmount}</span>
              </div>

              {/* Time Info */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-gray-500">
                  بدأ: {formatTime(order.createdAt)}
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  {getEstimatedTime(order.status, order.createdAt)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order._id, 'in_progress');
                    }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    بدء الغسيل
                  </button>
                )}
                {order.status === 'in_progress' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order._id, 'ready_for_pickup');
                    }}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    إكمال الغسيل
                  </button>
                )}
                {order.status === 'ready_for_pickup' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order._id, 'completed');
                    }}
                    className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                  >
                    تسليم للعميل
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // إرسال إشعار للعميل
                  }}
                  className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
                >
                  إشعار
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">تفاصيل الطلب #{selectedOrder.orderNumber}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">العميل:</span>
                <p className="font-medium">{selectedOrder.customerName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">الفرع:</span>
                <p className="font-medium">{selectedOrder.branchName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">الباقة:</span>
                <p className="font-medium">{selectedOrder.packageName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">السعر:</span>
                <p className="font-medium text-green-600">${selectedOrder.totalAmount}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">الحالة:</span>
                <p className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="mr-1">{getStatusText(selectedOrder.status)}</span>
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">وقت البدء:</span>
                <p className="font-medium">{formatTime(selectedOrder.createdAt)}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  // إرسال رسالة للعميل
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                إرسال رسالة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveWashingTracker; 