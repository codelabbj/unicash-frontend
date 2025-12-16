import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiHelpCircle, FiFileText, FiChevronRight, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sections = [
        {
            title: 'Compte',
            items: [
                {
                    icon: FiUser,
                    label: 'Mon Profil',
                    action: () => navigate('/profile'),
                    color: 'text-blue-600 bg-blue-50'
                },
            ]
        },
        {
            title: 'Support & Informations',
            items: [
                {
                    icon: FiHelpCircle,
                    label: 'Service Client',
                    action: () => window.open('mailto:support@unicash.com'), // Placeholder action
                    color: 'text-purple-600 bg-purple-50'
                },
                {
                    icon: FiFileText,
                    label: 'Politique de Confidentialité',
                    action: () => { }, // Placeholder
                    color: 'text-green-600 bg-green-50'
                },
                {
                    icon: FiFileText,
                    label: "Conditions d'Utilisation",
                    action: () => { }, // Placeholder
                    color: 'text-orange-600 bg-orange-50'
                },
            ]
        }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FiSettings className="w-8 h-8 text-primary" />
                Paramètres
            </h1>

            {/* User Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {user?.first_name ? user.first_name[0].toUpperCase() : 'U'}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {user?.first_name} {user?.last_name}
                    </h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 ml-1">
                            {section.title}
                        </h3>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {section.items.map((item, itemIdx) => (
                                <button
                                    key={itemIdx}
                                    onClick={item.action}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${itemIdx !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl ${item.color}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-900">{item.label}</span>
                                    </div>
                                    <FiChevronRight className="text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Logout Button */}
                <div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-50 text-red-600 font-semibold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors mt-4"
                    >
                        <FiLogOut className="w-5 h-5" />
                        Se déconnecter
                    </button>
                </div>
            </div>

            {/* Credits */}
            <div className="text-center pt-8 pb-4">
                <p className="text-gray-400 font-medium text-sm">UniCa$h</p>
                <p className="text-gray-300 text-xs mt-1">
                    © {new Date().getFullYear()} - Tous droits réservés
                </p>
                <p className="text-gray-300 text-[10px] mt-1">v1.0.0</p>
            </div>
        </div>
    );
};

export default Settings;
