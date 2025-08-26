import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../useAuth';

const UserProfile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState({ name: 'اسم المستخدم', email: 'user@email.com' });
  const [userPackages, setUserPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchUserPackages = async () => {
      try {
        setLoading(true);
        const response = await api.get('/user-packages/by-user/686e153b07a61649a239107a');
        setUserPackages(response.data);
        
        // If we have user data in the response, update the user state
        if (response.data.length > 0 && response.data[0].user) {
          const userData = response.data[0].user;
          setUser({
            name: userData.name,
            email: userData.email
          });
          setForm({
            name: userData.name,
            email: userData.email
          });
        }
      } catch (err) {
        console.error('Error fetching user packages:', err);
        setError('حدث خطأ أثناء تحميل بيانات الباقات');
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchUserPackages();
    }
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    setUser(form);
    setEditing(false);
    // updateUserProfile(form);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">الملف الشخصي</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
              <p className="text-gray-600">جاري التحميل...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-center py-4 px-6 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          ) : (
            <>
              {editing ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">الاسم</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">البريد الإلكتروني</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div className="flex space-x-4 space-x-reverse">
                    <button className="bg-primary px-6 py-3 rounded-xl text-white font-bold hover:bg-primary-dark transition-colors" onClick={handleSave}>حفظ</button>
                    <button className="bg-gray-100 px-6 py-3 rounded-xl text-gray-700 font-bold hover:bg-gray-200 transition-colors" onClick={() => setEditing(false)}>إلغاء</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="mr-4">
                        <div className="text-lg font-bold text-primary">{user.name}</div>
                        <div className="text-gray-600">{user.email}</div>
                      </div>
                    </div>
                    <button 
                      className="bg-primary px-6 py-3 rounded-xl text-white font-bold hover:bg-primary-dark transition-colors w-full" 
                      onClick={() => setEditing(true)}
                    >
                      تعديل البيانات الشخصية
                    </button>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      باقاتي
                    </h3>
                    {userPackages.length === 0 ? (
                      <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-600 font-medium">لا توجد باقات مشتراة</p>
                        <p className="text-gray-500 text-sm mt-2">يمكنك شراء باقة جديدة من صفحة الباقات</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {userPackages.map((pkg) => (
                          <div key={pkg._id} className="border border-green-100 rounded-xl p-6 bg-gradient-to-r from-green-50 to-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-bold text-primary text-lg">{pkg.package.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {pkg.status === 'active' ? 'نشط' : 'منتهي'}
                              </span>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
                              <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-gray-700">الغسلات المتبقية:</span>
                                </div>
                                <span className="font-bold text-primary text-lg">{pkg.washesLeft}</span>
                              </div>
                              <div className="flex justify-between">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-gray-700">تاريخ الانتهاء:</span>
                                </div>
                                <span className="font-bold text-gray-700">{new Date(pkg.expiry).toLocaleDateString('ar-EG')}</span>
                              </div>
                            </div>
                            
                            {pkg.barcodeImage && (
                              <div className="mt-4 flex flex-col items-center bg-white p-4 rounded-lg border border-gray-100">
                                <p className="text-sm text-gray-700 mb-3 font-medium">رمز الباركود الخاص بك</p>
                                <img 
                                  src={pkg.barcodeImage} 
                                  alt="Barcode" 
                                  className="h-28 w-auto border border-gray-200 rounded shadow-sm"
                                />
                                <p className="text-xs text-gray-500 mt-2 font-mono">{pkg.barcode}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;