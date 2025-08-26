import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, MessageCircle, User } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();

  const isActive = (path) => {
    // تحسين منطق Active State ليشمل الصفحات الفرعية
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      path: '/',
      label: 'الرئيسية',
      icon: Home,
      activePaths: ['/']
    },
    {
      path: '/packages',
      label: 'الباقات',
      icon: Package,
      activePaths: ['/packages', '/package-details', '/vip-package', '/vip-hotels']
    },
    {
      path: '/contact',
      label: 'تواصل معنا',
      icon: MessageCircle,
      activePaths: ['/contact', '/support', '/help-center', '/faq']
    },
    {
      path: '/profile',
      label: 'حسابي',
      icon: User,
      activePaths: ['/profile', '/signin', '/signup', '/login']
    }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isItemActive = item.activePaths.some(path => 
          location.pathname === path || location.pathname.startsWith(path)
        );
        
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${isItemActive ? 'active' : ''}`}
          >
            <div className="icon-wrapper">
              <Icon className="icon" size={22} />
              {isItemActive && <div className="active-indicator" />}
            </div>
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
} 