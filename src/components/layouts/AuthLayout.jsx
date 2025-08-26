import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;
