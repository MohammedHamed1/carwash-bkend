import React from 'react';
import googlePlayBadge from '../../assets/google-play-badge.png';
import appStoreBadge from '../../assets/app-store-badge.png';

export default function FooterAppDownload() {
  return (
    <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-600">
      <div className="text-center">
        <h3 className="text-white font-bold text-xl sm:text-3xl mb-4 sm:mb-6">حمّل تطبيق PayPass الآن</h3>
        <p className="text-gray-300 text-sm sm:text-lg mb-8 sm:mb-10">استمتع بخصومات حصرية وتتبع غسيل سيارتك بسهولة</p>
        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap mb-8 sm:mb-10">
          <a 
            href="https://play.google.com/store/apps/details?id=com.paypass.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src={googlePlayBadge} alt="Get it on Google Play" className="h-10 sm:h-12" />
          </a>
          <a 
            href="https://apps.apple.com/app/paypass/id1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src={appStoreBadge} alt="Download on the App Store" className="h-10 sm:h-12" />
          </a>
        </div>
      </div>
    </div>
  );
} 