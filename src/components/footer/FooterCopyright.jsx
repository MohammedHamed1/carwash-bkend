import { Link } from 'react-router-dom';
import sbcLogo from '../../assets/sbc.webp';
import visaIcon from '../../assets/Visa.png';
import mastercardIcon from '../../assets/mastercard.png';
import madaIcon from '../../assets/Mada.png';
import applePayIcon from '../../assets/apple-pay.png';

export default function FooterCopyright() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="mt-12 sm:mt-16 border-t border-gray-600 pt-8 sm:pt-12 text-center space-y-6 sm:space-y-8">
      {/* الاعتماد مع شعار المركز */}
      <div className="flex items-center justify-center gap-3">
        <img src={sbcLogo} alt="شعار المركز السعودي للأعمال" className="h-6 sm:h-8 object-contain" />
        <span className="text-gray-300 text-sm sm:text-base">منصة موثقة من قبل المركز السعودي للأعمال</span>
      </div>
      
      {/* الروابط القانونية مع حقوق النشر */}
      <div className="flex justify-between items-center flex-wrap gap-4 text-gray-300 text-sm sm:text-base">
        {/* حقوق النشر على اليسار */}
        <div className="flex items-center">
          <span className="px-3 py-2">© {currentYear} PayPass جميع الحقوق محفوظة.</span>
        </div>
        
        {/* الروابط القانونية على اليمين */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {["سياسة الخصوصية", "الشروط والأحكام", "شروط الاستخدام", "خريطة الموقع"].map((item, i) => (
            <Link
              key={i}
              to="#"
              className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 