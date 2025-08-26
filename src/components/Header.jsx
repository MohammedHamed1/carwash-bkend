import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Phone, Mail, Star, Shield, ChevronDown, ChevronUp, User, LogIn, LogOut, Settings
} from 'lucide-react';
import logo from '../assets/logo.png';
import googlePlayBadge from '../assets/google-play-badge.png';
import appStoreBadge from '../assets/app-store-badge.png';
import useAuth from '../useAuth';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const userDropdownRef = useRef(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-200'
      : 'bg-white/90 backdrop-blur-sm shadow-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* الشعار */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img src={logo} alt="PayPass Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PayPass</h1>
              <p className="text-xs text-green-600 font-medium">غسيل السيارات الذكي</p>
            </div>
          </Link>

          {/* القائمة الرئيسية - للدسكتوب */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`relative font-semibold text-base transition-colors duration-200 ${isActive('/')
                ? 'text-green-600'
                : 'text-gray-700 hover:text-green-600'
                }`}
            >
              الرئيسية
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/packages"
              className={`relative font-semibold text-base transition-colors duration-200 ${isActive('/packages')
                ? 'text-green-600'
                : 'text-gray-700 hover:text-green-600'
                }`}
            >
              الباقات
              {isActive('/packages') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/services"
              className={`relative font-semibold text-base transition-colors duration-200 ${isActive('/services')
                ? 'text-green-600'
                : 'text-gray-700 hover:text-green-600'
                }`}
            >
              الخدمات
              {isActive('/services') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/about"
              className={`relative font-semibold text-base transition-colors duration-200 ${isActive('/about')
                ? 'text-green-600'
                : 'text-gray-700 hover:text-green-600'
                }`}
            >
              من نحن
              {isActive('/about') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/contact"
              className={`relative font-semibold text-base transition-colors duration-200 ${isActive('/contact')
                ? 'text-green-600'
                : 'text-gray-700 hover:text-green-600'
                }`}
            >
              اتصل بنا
              {isActive('/contact') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>
          </nav>

          {/* الأزرار - للدسكتوب */}
          <div className="hidden lg:flex items-center gap-4">
            {/* أيقونات التطبيقات */}
            {/* تم حذف أيقونات جوجل بلاي وأبل ستور */}

            {/* أزرار تسجيل الدخول وإنشاء الحساب */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  onMouseEnter={() => setIsUserDropdownOpen(true)}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-semibold bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-green-50 border border-gray-200 hover:border-green-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{user.username || user.name || user.email}</span>
                  {isUserDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                    className="absolute top-full right-0 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{user.username || user.name || user.email}</h3>
                          <p className="text-green-100 text-sm mt-1">عضو نشط</p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Menu Items */}
                    <div className="p-4 space-y-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-4 w-full px-4 py-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center transition-colors">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">الملف الشخصي</span>
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-4 w-full px-4 py-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                          <Settings className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold">لوحة التحكم</span>
                      </Link>

                      <div className="my-4 border-t border-gray-100"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors">
                          <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="font-semibold">تسجيل الخروج</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  <span>تسجيل الدخول</span>
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  إنشاء الحساب
                </Link>
              </>
            )}
          </div>

          {/* زر القائمة - للموبايل */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-green-600" />
            ) : (
              <Menu className="w-6 h-6 text-green-600" />
            )}
          </button>
        </div>

        {/* القائمة المنسدلة - للموبايل */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-green-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">

              {/* أيقونات التطبيقات */}
              {/* تم حذف أيقونات جوجل بلاي وأبل ستور من القائمة المنسدلة */}

              {/* القائمة الرئيسية */}
              <nav className="space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${isActive('/')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                    }`}
                >
                  الرئيسية
                </Link>

                <Link
                  to="/packages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${isActive('/packages')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                    }`}
                >
                  الباقات
                </Link>

                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${isActive('/services')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                    }`}
                >
                  الخدمات
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${isActive('/about')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                    }`}
                >
                  من نحن
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${isActive('/contact')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                    }`}
                >
                  اتصل بنا
                </Link>
              </nav>

              {/* أزرار تسجيل الدخول وإنشاء الحساب */}
              <div className="space-y-3 pt-4 border-t border-green-200">
                {user ? (
                  <>
                    {/* User Info in Mobile Menu */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{user.username || user.name || user.email}</h3>
                          <p className="text-green-100 text-sm mt-1">عضو نشط</p>
                        </div>
                      </div>
                    </div>

                    {/* User Menu Items */}
                    <div className="space-y-3 mt-4">
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 w-full px-4 py-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all duration-300 group bg-gray-50"
                      >
                        <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center transition-colors">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">الملف الشخصي</span>
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 w-full px-4 py-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all duration-300 group bg-gray-50"
                      >
                        <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                          <Settings className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold">لوحة التحكم</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 w-full px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group bg-gray-50"
                      >
                        <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors">
                          <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="font-semibold">تسجيل الخروج</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-white border-2 border-green-600 text-green-600 font-bold text-center px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
                    >
                      تسجيل الدخول
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-center px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      إنشاء الحساب
                    </Link>
                  </>
                )}
              </div>

              {/* معلومات إضافية */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-green-200">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">4.9</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">خدمة موثقة</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 