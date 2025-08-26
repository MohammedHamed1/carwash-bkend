import React from 'react';
import { useLoading } from './LoadingManager';

const LoadingExample = () => {
  const { showLoading, hideLoading, withLoading } = useLoading();

  // مثال على تحميل بسيط
  const handleSimpleLoad = () => {
    startLoading('جاري التحميل البسيط...', 'simple');
    
    setTimeout(() => {
      stopLoading('simple');
      alert('تم التحميل البسيط بنجاح!');
    }, 3000);
  };

  // مثال على تحميل مع دالة async
  const handleAsyncLoading = async () => {
    await withLoading(
      async () => {
        // محاكاة طلب API
        await new Promise(resolve => setTimeout(resolve, 2000));
        return { message: 'تم تحميل البيانات بنجاح!' };
      },
      'جاري جلب البيانات من الخادم...'
    );
  };

  // مثال على تحميل الصفحة
  const handlePageLoading = () => {
    showLoading('جاري الانتقال إلى الصفحة الجديدة...');
    
    setTimeout(() => {
      hideLoading();
      // هنا يمكن إضافة منطق الانتقال
      console.log('تم الانتقال بنجاح!');
    }, 2000);
  };

  const handleAdvancedLoad = async () => {
    startLoading('جاري تحميل البيانات المتقدمة...', 'advanced');
    
    try {
      // محاكاة عملية تحميل معقدة
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // محاكاة نجاح العملية
      alert('تم تحميل البيانات المتقدمة بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء التحميل');
    } finally {
      stopLoading('advanced');
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
        أمثلة على استخدام نظام التحميل
      </h2>
      
      <div className="space-y-4">
        <button
          onClick={handleSimpleLoading}
          className="w-full bg-emerald-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-emerald-600 transition-all duration-300"
          style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
        >
          تحميل بسيط (3 ثواني)
        </button>
        
        <button
          onClick={handleAsyncLoading}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-600 transition-all duration-300"
          style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
        >
          تحميل مع دالة async (2 ثانية)
        </button>
        
        <button
          onClick={handlePageLoading}
          className="w-full bg-purple-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-purple-600 transition-all duration-300"
          style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
        >
          محاكاة تحميل الصفحة (2 ثانية)
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
          كيفية الاستخدام:
        </h3>
        <ul className="text-sm text-gray-600 space-y-1" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
          <li>• استخدم useLoading() في أي مكون</li>
          <li>• showLoading(message) - لعرض التحميل</li>
          <li>• hideLoading() - لإخفاء التحميل</li>
          <li>• withLoading(asyncFunction, message) - لتحميل دالة async</li>
        </ul>
      </div>
    </div>
  );
};

export default LoadingExample; 