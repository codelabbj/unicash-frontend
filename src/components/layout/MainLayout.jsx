import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar Desktop */}
            <aside className={`
        hidden lg:block w-72 bg-white shadow-xl z-40
        transition-all duration-300 fixed inset-y-0 left-0
      `}>
                <Sidebar />
            </aside>

            {/* Sidebar Mobile/Tablet (Overlay) */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden">
                        <Sidebar onClose={() => setSidebarOpen(false)} />
                    </aside>
                </>
            )}

            {/* Bottom Navigation for Mobile */}
            <div className="md:hidden">
                <BottomNav />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-72">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
