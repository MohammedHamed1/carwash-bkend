import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../api';
import { useAuth } from '../useAuth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // التمرير إلى أعلى الصفحة عند تحميل المكون
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupApi({ email, password, name });
      const { token } = res.data;
      login(token);
      navigate('/checkout');
    } catch {
      setError('فشل التسجيل. تحقق من البيانات.');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">إنشاء حساب</h2>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" placeholder="الاسم" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border rounded-xl" required />
            <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-xl" required />
            <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-xl" required />
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">تسجيل</button>
          </form>
          <div className="mt-4 text-center">
            لديك حساب بالفعل؟ <span className="text-green-600 cursor-pointer font-bold" onClick={() => navigate('/login')}>دخول</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup; 