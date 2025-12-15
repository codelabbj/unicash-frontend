import { NavLink } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiList, FiUser } from 'react-icons/fi';

const BottomNav = () => {
    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Accueil' },
        { path: '/transaction/new', icon: FiPlusCircle, label: 'Envoyer' },
        { path: '/transactions', icon: FiList, label: 'Historique' },
        { path: '/profile', icon: FiUser, label: 'Profil' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
            <nav className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex flex-col items-center justify-center w-full h-full space-y-1
                            ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}
                        `}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default BottomNav;
