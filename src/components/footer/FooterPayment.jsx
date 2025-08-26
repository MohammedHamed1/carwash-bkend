import React from 'react';
import visaIcon from '../../assets/Visa.png';
import mastercardIcon from '../../assets/mastercard.png';
import madaIcon from '../../assets/Mada.png';
import applePayIcon from '../../assets/apple-pay.png';

export default function FooterPayment() {
  return (
    <div className="border-t border-gray-700 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* طرق الدفع */}
          <div className="flex items-center gap-3">
            <img src={madaIcon} alt="Mada" className="h-6" />
            <img src={applePayIcon} alt="Apple Pay" className="h-6" />
            <img src={mastercardIcon} alt="Mastercard" className="h-6" />
            <img src={visaIcon} alt="Visa" className="h-6" />
          </div>
          
          {/* حقوق النشر */}
          <div className="text-white text-sm">
            © {new Date().getFullYear()} PayPass جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    </div>
  );
} 