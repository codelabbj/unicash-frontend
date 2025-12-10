import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>

            {/* User Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
                        {user?.first_name ? user.first_name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {user?.first_name} {user?.last_name}
                        </h2>
                        <p className="text-gray-500">{user?.email}</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                                <FiCheckCircle className="w-4 h-4" /> Vérifié
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                                Particulier
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <FiUser className="text-primary" /> Informations Personnelles
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Prénom</label>
                                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{user?.first_name || '-'}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Nom</label>
                                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{user?.last_name || '-'}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Téléphone</label>
                                <div className="p-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                                    <FiPhone className="text-gray-400" />
                                    {user?.phone_number || '-'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <div className="p-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
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
                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                        <FiLock className="text-gray-400" /> Mot de passe
                                    </h4>
                                    <button className="text-sm text-primary font-medium hover:underline">Modifier</button>
                                </div>
                                <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl">
                                <h4 className="font-medium text-gray-900 mb-2">Double Authentification (2FA)</h4>
                                <p className="text-sm text-gray-500 mb-4">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                                <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    Activer 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
