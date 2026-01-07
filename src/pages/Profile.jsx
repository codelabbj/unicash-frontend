import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiShield, FiLock, FiCheckCircle, FiHelpCircle, FiFileText, FiLogOut, FiChevronRight } from 'react-icons/fi';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const supportSections = [
        {
            title: 'Support & Informations',
            items: [
                {
                    icon: FiHelpCircle,
                    label: 'Service Client',
                    action: () => window.open('mailto:support@unicash.com'),
                    color: 'text-purple-600 bg-purple-50'
                },
                {
                    icon: FiFileText,
                    label: 'Politique de Confidentialité',
                    action: () => { },
                    color: 'text-green-600 bg-green-50'
                },
                {
                    icon: FiFileText,
                    label: "Conditions d'Utilisation",
                    action: () => { },
                    color: 'text-orange-600 bg-orange-50'
                },
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            <h1 className="text-2xl font-bold text-gray-900">Profil</h1>

            {/* User Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold shadow-lg shadow-primary/20">
                        {user?.first_name ? user.first_name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {user?.first_name} {user?.last_name}
                        </h2>
                        <p className="text-gray-500">{user?.email}</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                                <FiCheckCircle className="w-4 h-4" /> Vérifié
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
                                Particulier
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100">
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <FiUser className="text-primary" /> Informations Personnelles
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Prénom</label>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user?.first_name || '-'}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Nom</label>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user?.last_name || '-'}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Téléphone</label>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2 font-medium">
                                    <FiPhone className="text-gray-400" />
                                    {user?.phone_number || '-'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2 font-medium">
                                    <FiMail className="text-gray-400" />
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <FiShield className="text-primary" /> Sécurité
                        </h3>

                        <div className="space-y-4">
                            <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                        <FiLock className="text-gray-400" /> Mot de passe
                                    </h4>
                                    <button className="text-primary font-bold text-sm hover:underline">Modifier</button>
                                </div>
                                <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                            </div>

                            <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                                <h4 className="font-medium text-gray-900 mb-2">Double Authentification (2FA)</h4>
                                <p className="text-sm text-gray-500 mb-4">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                                <button className="w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                                    Activer 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Sections */}
                <div className="p-6 md:p-8 space-y-6">
                    {supportSections.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 ml-1">
                                {section.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {section.items.map((item, itemIdx) => (
                                    <button
                                        key={itemIdx}
                                        onClick={item.action}
                                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl transition-all group shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm text-left">{item.label}</span>
                                        </div>
                                        <FiChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full md:w-auto px-8 py-3 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                        <FiLogOut className="w-5 h-5" />
                        Se déconnecter
                    </button>
                </div>
            </div>

            {/* Footer Credits */}
            <div className="text-center pt-4 opacity-50">
                <p className="text-gray-400 font-medium text-sm text-primary">UniCa$h</p>
                <p className="text-gray-400 text-xs mt-1">
                    © {new Date().getFullYear()} - Tous droits réservés • v1.0.0
                </p>
            </div>
        </div>
    );
};

export default Profile;
