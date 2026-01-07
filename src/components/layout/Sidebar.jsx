import { NavLink } from 'react-router-dom';
import {
    FiHome, FiPlusCircle, FiList, FiUser, FiX, FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

import logo from '../../assets/Unicash-logo.png';

const Sidebar = ({ onClose }) => {
    const { user, logout } = useAuth();

    const menuItems = [
        { path: '/dashboard', icon: FiHome, label: 'Tableau de bord' },
        { path: '/transaction/new', icon: FiPlusCircle, label: 'Nouvelle transaction' },
        { path: '/transactions', icon: FiList, label: 'Historique' },
        { path: '/profile', icon: FiUser, label: 'Profil' },
    ];

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Logo & Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img src={logo} alt="UniCash" className="h-12 w-auto" />
                {onClose && (
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
                        <FiX className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                                ? 'bg-blue-50 text-primary font-semibold shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
            `}
                    >
                        <item.icon className={`w-5 h-5 ${({ isActive }) => isActive ? 'text-primary' : 'text-gray-400'}`} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User & Logout */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                        {user?.first_name ? user.first_name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100 hover:border-red-200"
                >
                    <FiLogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
