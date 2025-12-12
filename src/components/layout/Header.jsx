import { useState } from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuClick }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hasUnread, setHasUnread] = useState(true);

    const handleNotificationClick = () => {
        setHasUnread(false);
        navigate('/notifications');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>

                    <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
                        Bonjour, {user?.first_name || 'Utilisateur'}
                    </h2>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Notifications */}
                    <button
                        onClick={handleNotificationClick}
                        className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors"
                    >
                        <FiBell className="w-6 h-6" />
                        {hasUnread && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
