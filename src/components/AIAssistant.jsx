import React, { useState } from 'react';
import { MessageCircle, X, Package, MapPin } from 'lucide-react';
import { getPackages, getWashingPlaces } from '../api';

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([
    { sender: 'ai', text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleShowPackages = async () => {
    setChat((prev) => [
      ...prev,
      { sender: 'user', text: 'عرض الباقات' }
    ]);
    setLoading(true);
    try {
      const res = await getPackages();
      const pkgs = res.data;
      setTimeout(() => {
        setLoading(false);
        setChat((prev) => [
          ...prev,
          { sender: 'ai', text: 'هذه هي باقاتنا المتاحة:' },
          ...pkgs.map(pkg => ({
            sender: 'ai',
            text: `📦 ${pkg.name}\n💰 السعر: ${pkg.basePrice} ريال\n🔄 عدد الغسلات: ${pkg.washes}\n✨ المميزات: ${(pkg.features || []).join('، ')}`
          }))
        ]);
      }, 1200);
    } catch {
      setLoading(false);
      setChat((prev) => [
        ...prev,
        { sender: 'ai', text: 'حدث خطأ أثناء جلب الباقات.' }
      ]);
    }
  };

  const handleShowPlaces = async () => {
    setChat((prev) => [
      ...prev,
      { sender: 'user', text: 'عرض الفروع' }
    ]);
    setLoading(true);
    try {
      const res = await getWashingPlaces();
      const places = res.data;
      setTimeout(() => {
        setLoading(false);
        setChat((prev) => [
          ...prev,
          { sender: 'ai', text: 'هذه هي فروعنا:' },
          ...places.map(place => ({
            sender: 'ai',
            text: `🏢 ${place.name}\n📍 العنوان: ${place.address || 'غير متوفر'}\n⭐ التقييم: ${place.rating || 'غير متوفر'}\n📞 الهاتف: ${place.phone || 'غير متوفر'}`
          }))
        ]);
      }, 1200);
    } catch {
      setLoading(false);
      setChat((prev) => [
        ...prev,
        { sender: 'ai', text: 'حدث خطأ أثناء جلب الفروع.' }
      ]);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const LoadingDots = () => (
    <div className="flex space-x-1 justify-center items-center">
      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 
                   text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 
                   transition-all duration-200 flex items-center justify-center z-50 
                   hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 
                   focus:ring-green-300 focus:ring-opacity-50"
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-28 right-8 w-96 bg-white rounded-2xl shadow-2xl 
                        border border-gray-100 z-50 overflow-hidden transform animate-in 
                        slide-in-from-bottom-4 fade-in duration-300">
          
            {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 
                          text-white relative">
            <h3 className="text-lg font-semibold text-center">مساعد PayPass الذكي</h3>
              <button
              onClick={handleClose}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 
                         w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full 
                         flex items-center justify-center transition-colors 
                         duration-200 focus:outline-none focus:ring-2 
                         focus:ring-white/50"
              aria-label="إغلاق الدردشة"
            >
              <X size={18} />
              </button>
            </div>

          {/* Chat Body */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 
                          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'ai'
                      ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-tr-sm shadow-sm'
                  }`}
                  style={{ direction: 'rtl' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm 
                                border border-gray-100">
                  <LoadingDots />
                </div>
              </div>
            )}
          </div>

          {/* Footer with Action Buttons */}
          {!loading && (
            <div className="p-4 bg-white border-t border-gray-100 space-y-3">
                <button
                onClick={handleShowPackages}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 
                           text-white font-medium py-3 px-4 rounded-xl 
                           hover:from-green-600 hover:to-green-700 
                           transform hover:scale-[1.02] transition-all duration-200 
                           shadow-sm hover:shadow-md flex items-center justify-center 
                           gap-2 focus:outline-none focus:ring-4 focus:ring-green-300 
                           focus:ring-opacity-50"
              >
                <Package size={18} />
                عرض الباقات
                </button>
              
                <button
                onClick={handleShowPlaces}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 
                           text-white font-medium py-3 px-4 rounded-xl 
                           hover:from-blue-600 hover:to-blue-700 
                           transform hover:scale-[1.02] transition-all duration-200 
                           shadow-sm hover:shadow-md flex items-center justify-center 
                           gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 
                           focus:ring-opacity-50"
              >
                <MapPin size={18} />
                عرض الفروع
                </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistant; 