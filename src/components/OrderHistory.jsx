import React, { useState, useEffect } from 'react';
// import { getOrderHistory } from '../api'; // Uncomment when backend ready

const OrderHistory = () => {
  const [orders] = useState([
    { id: 1, package: 'الباقة الأساسية', date: '2024-05-01', price: 150, status: 'مكتمل' },
    { id: 2, package: 'الباقة المتقدمة', date: '2024-04-15', price: 280, status: 'مكتمل' },
  ]);
  
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // useEffect(() => { getOrderHistory().then(setOrders); }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">سجل الطلبات</h2>
          <table className="w-full text-right">
            <thead>
              <tr>
                <th className="pb-4">رقم الطلب</th>
                <th className="pb-4">الباقة</th>
                <th className="pb-4">التاريخ</th>
                <th className="pb-4">السعر</th>
                <th className="pb-4">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 font-bold">{order.id}</td>
                  <td className="py-2">{order.package}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2 text-primary font-bold">{order.price} ريال</td>
                  <td className="py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderHistory; 