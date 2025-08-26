import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, FaPhone, FaClock, FaCar, FaUsers, 
  FaMoneyBillWave, FaStar, FaEdit, FaPlus, FaEye,
  FaChartLine, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { branchAPI, orderAPI } from '../api';

const BranchManager = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
    workingHours: '',
    capacity: 10
  });

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const [branchesResponse, ordersResponse] = await Promise.all([
        branchAPI.getAll(),
        orderAPI.getAll()
      ]);

      const branchesData = branchesResponse.data.branches || [];
      const ordersData = ordersResponse.data.orders || [];

      // إضافة إحصائيات لكل فرع
      const branchesWithStats = branchesData.map(branch => {
        const branchOrders = ordersData.filter(order => order.branchName === branch.name);
        const activeOrders = branchOrders.filter(order => 
          ['pending', 'in_progress'].includes(order.status)
        ).length;
        const completedOrders = branchOrders.filter(order => 
          order.status === 'completed'
        ).length;
        const totalRevenue = branchOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        return {
          ...branch,
          stats: {
            totalOrders: branchOrders.length,
            activeOrders,
            completedOrders,
            totalRevenue,
            efficiency: branchOrders.length > 0 ? Math.round((completedOrders / branchOrders.length) * 100) : 0
          }
        };
      });

      setBranches(branchesWithStats);
    } catch (error) {
      console.error('Error loading branches:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBranch = async () => {
    try {
      // هنا سيتم إرسال البيانات للباك إند
      console.log('Adding new branch:', newBranch);
      setShowAddModal(false);
      setNewBranch({
        name: '',
        city: '',
        address: '',
        phone: '',
        workingHours: '',
        capacity: 10
      });
      await loadBranches();
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyIcon = (efficiency) => {
    if (efficiency >= 90) return <FaCheckCircle className="h-4 w-4 text-green-600" />;
    if (efficiency >= 70) return <FaExclamationTriangle className="h-4 w-4 text-yellow-600" />;
    return <FaExclamationTriangle className="h-4 w-4 text-red-600" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="mr-3 text-gray-600">جاري تحميل الفروع...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaMapMarkerAlt className="h-8 w-8 text-green-600 mr-3" />
          إدارة الفروع
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <FaPlus className="h-4 w-4 mr-2" />
          إضافة فرع جديد
        </button>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch._id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedBranch(branch)}
          >
            {/* Branch Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                <p className="text-sm text-gray-600">{branch.city}</p>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                نشط
              </span>
            </div>

            {/* Branch Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaPhone className="h-4 w-4 mr-2" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaClock className="h-4 w-4 mr-2" />
                <span>{branch.workingHours || '8:00 ص - 10:00 م'}</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <FaCar className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm text-gray-600">الطلبات النشطة</span>
                </div>
                <p className="text-lg font-bold text-blue-600">{branch.stats.activeOrders}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <FaMoneyBillWave className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-gray-600">الإيرادات</span>
                </div>
                <p className="text-lg font-bold text-green-600">${branch.stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            {/* Efficiency */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">الكفاءة:</span>
              <div className="flex items-center">
                {getEfficiencyIcon(branch.stats.efficiency)}
                <span className={`mr-1 font-semibold ${getEfficiencyColor(branch.stats.efficiency)}`}>
                  {branch.stats.efficiency}%
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                <FaEye className="h-4 w-4 inline mr-1" />
                عرض
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">
                <FaEdit className="h-4 w-4 inline mr-1" />
                تعديل
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Branch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">إضافة فرع جديد</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الفرع</label>
                <input
                  type="text"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="اسم الفرع"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                <input
                  type="text"
                  value={newBranch.city}
                  onChange={(e) => setNewBranch({...newBranch, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="المدينة"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                <input
                  type="text"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({...newBranch, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="العنوان الكامل"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+966XXXXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ساعات العمل</label>
                <input
                  type="text"
                  value={newBranch.workingHours}
                  onChange={(e) => setNewBranch({...newBranch, workingHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="8:00 ص - 10:00 م"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعة القصوى</label>
                <input
                  type="number"
                  value={newBranch.capacity}
                  onChange={(e) => setNewBranch({...newBranch, capacity: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={addBranch}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                إضافة الفرع
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">تفاصيل الفرع: {selectedBranch.name}</h3>
              <button
                onClick={() => setSelectedBranch(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">معلومات الفرع</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">المدينة:</span>
                    <p className="font-medium">{selectedBranch.city}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">العنوان:</span>
                    <p className="font-medium">{selectedBranch.address}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">الهاتف:</span>
                    <p className="font-medium">{selectedBranch.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">ساعات العمل:</span>
                    <p className="font-medium">{selectedBranch.workingHours || '8:00 ص - 10:00 م'}</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">الإحصائيات</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">إجمالي الطلبات:</span>
                    <span className="font-medium">{selectedBranch.stats.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">الطلبات النشطة:</span>
                    <span className="font-medium text-blue-600">{selectedBranch.stats.activeOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">الطلبات المكتملة:</span>
                    <span className="font-medium text-green-600">{selectedBranch.stats.completedOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">إجمالي الإيرادات:</span>
                    <span className="font-medium text-green-600">${selectedBranch.stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">الكفاءة:</span>
                    <div className="flex items-center">
                      {getEfficiencyIcon(selectedBranch.stats.efficiency)}
                      <span className={`mr-1 font-medium ${getEfficiencyColor(selectedBranch.stats.efficiency)}`}>
                        {selectedBranch.stats.efficiency}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSelectedBranch(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  // تحرير الفرع
                  setSelectedBranch(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                تحرير الفرع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchManager; 