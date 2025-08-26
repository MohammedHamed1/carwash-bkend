import React, { useState, useEffect } from 'react';
import {
  FaUsers, FaCar, FaCog, FaMoneyBillWave,
  FaStar, FaMapMarkerAlt, FaClock, FaChartLine,
  FaEye, FaEdit, FaTrash, FaPlus, FaSearch,
  FaFilter, FaDownload, FaPrint, FaBell,
  FaTachometerAlt, FaShieldAlt, FaSignOutAlt
} from 'react-icons/fa';
import {
  authAPI, packageAPI, branchAPI, orderAPI,
  paymentAPI, feedbackAPI, userPackageAPI, qrAPI
} from '../api';
import LiveWashingTracker from '../components/LiveWashingTracker';
import BranchManager from '../components/BranchManager';

const API_BASE = 'http://localhost:5000';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    totalBranches: 0,
    totalPackages: 0,
    averageRating: 0,
    todayOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [liveTracking, setLiveTracking] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Map different possible API response shapes to our stats object
  const mapDashboardPayload = (payload) => {
    // payload may be { data: {...} } or {...}
    const p = payload && typeof payload === 'object' && payload.data ? payload.data : payload || {};

    // Try a bunch of common keys (fallbacks). If a key not present, keep null to skip.
    const mapped = {
      totalUsers: p.totalUsers ?? p.usersCount ?? p.total_users ?? p.users ?? null,
      totalOrders: p.totalOrders ?? p.ordersCount ?? p.total_orders ?? p.orders ?? null,
      totalRevenue: p.totalRevenue ?? p.revenue ?? p.total_revenue ?? p.totalRevenueAmount ?? 0,
      activeOrders: p.activeOrders ?? p.active_orders ?? p.active ?? null,
      totalBranches: p.totalBranches ?? p.branchesCount ?? p.total_branches ?? p.branches ?? null,
      totalPackages: p.totalPackages ?? p.packagesCount ?? p.total_packages ?? p.packages ?? null,
      averageRating: p.averageRating ?? p.avgRating ?? p.ratingAvg ?? p.average_rating ?? null,
      todayOrders: p.todayOrders ?? p.ordersToday ?? p.today_orders ?? p.today ?? null
    };

    return mapped;
  };

  // تحميل بيانات المستخدم والإحصائيات - original loader
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // جلب بيانات المستخدم
      const userData = await authAPI.getCurrentUser();
      setUser(userData.data.user);

      // جلب الإحصائيات
      const [
        usersResponse,
        ordersResponse,
        paymentsResponse,
        branchesResponse,
        packagesResponse,
        feedbacksResponse
      ] = await Promise.all([
        authAPI.getAllUsers(),
        orderAPI.getAll(),
        paymentAPI.getAll(),
        branchAPI.getAll(),
        packageAPI.getAll(),
        feedbackAPI.getAll()
      ]);

      // حساب الإحصائيات
      const orders = ordersResponse.data.orders || [];
      const payments = paymentsResponse.data.payments || [];
      const feedbacks = feedbacksResponse.data.feedbacks || [];

      const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
      const activeOrders = orders.filter(order => ['pending', 'in_progress'].includes(order.status)).length;
      const todayOrders = orders.filter(order => {
        const today = new Date().toDateString();
        return new Date(order.createdAt).toDateString() === today;
      }).length;

      const averageRating = feedbacks.length > 0
        ? feedbacks.reduce((sum, feedback) => sum + (feedback.rating || 0), 0) / feedbacks.length
        : 0;

      setStats({
        totalUsers: usersResponse.data.users?.length || 0,
        totalOrders: orders.length,
        totalRevenue,
        activeOrders,
        totalBranches: branchesResponse.data.branches?.length || 0,
        totalPackages: packagesResponse.data.packages?.length || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        todayOrders
      });

      // جلب الطلبات الحديثة
      const recentOrdersData = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
      setRecentOrders(recentOrdersData);

      // جلب التتبع المباشر
      const liveOrders = orders.filter(order =>
        ['pending', 'in_progress', 'ready_for_pickup'].includes(order.status)
      );
      setLiveTracking(liveOrders);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect: run original loader + fetch dashboard route and map the response into state
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDashboardRoute = async () => {
      try {
        const res = await fetch(`localhost:5000/api/statistics/dashboard`, {
          method: 'GET',
          signal,
          headers: {
            'Content-Type': 'application/json'
            // add 'Authorization' header here if needed
          }
        });

        if (!res.ok) {
          const txt = await res.text();
          console.error('Dashboard route returned non-OK status', res.status, txt);
          return;
        }

        // parse JSON safely
        const contentType = res.headers.get('content-type') || '';
        const data = contentType.includes('application/json') ? await res.json() : await res.text();
        console.log('dashboard route payload:', data);

        // if we have an object, map it to stats and merge
        if (data && typeof data === 'object') {
          const mapped = mapDashboardPayload(data);

          // Build newStats only with fields that are not null/undefined
          const newStats = {};
          Object.keys(mapped).forEach(k => {
            if (mapped[k] !== null && mapped[k] !== undefined) newStats[k] = mapped[k];
          });

          if (Object.keys(newStats).length > 0) {
            setStats(prev => ({ ...prev, ...newStats }));
          }
        }

      } catch (err) {
        if (err.name === 'AbortError') {
          // aborted, ignore
        } else {
          console.error('Error fetching /api/statistics/dashboard:', err);
        }
      }
    };

    // run both loaders (order doesn't matter)
    fetchDashboardRoute();
    loadDashboardData();

    // optional: refresh every 30s
    // const interval = setInterval(() => {
    //   fetchDashboardRoute();
    //   loadDashboardData();
    // }, 30000);

    return () => {
      // clearInterval(interval); // if used
      controller.abort();
    };
  }, []); // run once on mount

  // تحديث حالة الطلب
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      await loadDashboardData(); // إعادة تحميل البيانات
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // تصفية الطلبات
  const filteredOrders = recentOrders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.branchName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ar-EG');
  };

  // الحصول على لون الحالة
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      ready_for_pickup: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // الحصول على نص الحالة بالعربية
  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'في الانتظار',
      in_progress: 'قيد التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      ready_for_pickup: 'جاهز للاستلام'
    };
    return statusTexts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaTachometerAlt className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">داشبورد PayPass</h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center">
                <FaBell className="h-5 w-5 text-gray-400 mr-2" />
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">3</span>
              </div>
              <div className="flex items-center">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt="User"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-gray-700">{user?.name || 'المستخدم'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 rtl:space-x-reverse">
            {[
              { id: 'overview', name: 'نظرة عامة', icon: FaTachometerAlt },
              { id: 'orders', name: 'الطلبات', icon: FaCar },
              { id: 'tracking', name: 'التتبع المباشر', icon: FaEye },
              { id: 'branches', name: 'الفروع', icon: FaMapMarkerAlt },
              { id: 'users', name: 'المستخدمين', icon: FaUsers },
              { id: 'analytics', name: 'التحليلات', icon: FaChartLine },
              { id: 'settings', name: 'الإعدادات', icon: FaCog }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedTab === tab.id
                  ? 'bg-green-100 text-green-700 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <FaUsers className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <FaCar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <FaMoneyBillWave className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold text-gray-900">${(stats.totalRevenue || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <FaCog className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">الطلبات النشطة</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الفروع</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalBranches}</p>
                  </div>
                  <FaMapMarkerAlt className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الباقات</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalPackages}</p>
                  </div>
                  <FaStar className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                    <p className="text-xl font-bold text-gray-900">{stats.averageRating}/5</p>
                  </div>
                  <FaStar className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">الطلبات الحديثة</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الطلب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العميل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الفرع
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.branchName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            <FaEye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaEdit className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="البحث في الطلبات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">في الانتظار</option>
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                    <option value="ready_for_pickup">جاهز للاستلام</option>
                  </select>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                    <FaPlus className="h-4 w-4 mr-2" />
                    طلب جديد
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">جميع الطلبات</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
                    <FaDownload className="h-4 w-4 mr-1" />
                    تصدير
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
                    <FaPrint className="h-4 w-4 mr-1" />
                    طباعة
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الطلب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العميل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الفرع
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الباقة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        السعر
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={order.customerAvatar || 'https://via.placeholder.com/32'}
                              alt="Customer"
                              className="h-8 w-8 rounded-full ml-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                              <div className="text-sm text-gray-500">{order.customerPhone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.branchName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.packageName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button className="text-green-600 hover:text-green-900" title="عرض">
                              <FaEye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900" title="تعديل">
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900" title="حذف">
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Live Tracking Tab */}
        {selectedTab === 'tracking' && (
          <div className="space-y-6">
            <LiveWashingTracker />
          </div>
        )}

        {/* Branches Tab */}
        {selectedTab === 'branches' && (
          <div className="space-y-6">
            <BranchManager />
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">إدارة المستخدمين</h3>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                  <FaPlus className="h-4 w-4 mr-2" />
                  إضافة مستخدم
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المستخدم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        البريد الإلكتروني
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الدور
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاريخ التسجيل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* User rows will be populated here */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">إحصائيات الطلبات</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">طلبات اليوم</span>
                    <span className="font-medium">{stats.todayOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">طلبات هذا الأسبوع</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">طلبات هذا الشهر</span>
                    <span className="font-medium">180</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">الإيرادات</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">إيرادات اليوم</span>
                    <span className="font-medium">${((stats.totalRevenue || 0) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">إيرادات هذا الأسبوع</span>
                    <span className="font-medium">${((stats.totalRevenue || 0) * 0.3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">إيرادات هذا الشهر</span>
                    <span className="font-medium">${(stats.totalRevenue || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">أفضل الفروع أداءً</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">الفرع الرئيسي</h4>
                    <p className="text-sm text-gray-600">الرياض</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">150 طلب</p>
                    <p className="text-sm text-green-600">+12%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {selectedTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">إعدادات النظام</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">إعدادات الإشعارات</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                      <span className="mr-2 text-gray-700">إشعارات الطلبات الجديدة</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                      <span className="mr-2 text-gray-700">إشعارات إكمال الطلبات</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="mr-2 text-gray-700">إشعارات التقارير اليومية</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">إعدادات الأمان</h4>
                  <div className="space-y-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      تغيير كلمة المرور
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                      تفعيل المصادقة الثنائية
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">إعدادات النظام</h4>
                  <div className="space-y-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      حفظ الإعدادات
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                      إعادة تعيين الإعدادات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
