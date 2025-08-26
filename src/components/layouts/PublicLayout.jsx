import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../footer/Footer';
import MobileBottomNav from '../common/MobileBottomNav';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <Header />
            <main className="pt-16">
                <Outlet />
            </main>
            <Footer />
            <MobileBottomNav />
        </div>
    );
};

export default PublicLayout;
