import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../useAuth';
import Header from '../Header';
import Footer from '../footer/Footer';
import MobileBottomNav from '../common/MobileBottomNav';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedLayout = () => {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

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

export default ProtectedLayout;
