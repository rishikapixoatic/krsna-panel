import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
    const { Component } = props;
    const { accessToken } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken && window.location.pathname !== '/') {
            navigate('/');
        }
    }, [accessToken, navigate]);

    return (
        <div className="flex h-screen">
            {accessToken && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
            <div className="h-full w-full flex flex-col">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="flex h-full w-full overflow-auto bg-gray-100">
                    <main className='flex h-full w-full'>
                        <Component />
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
