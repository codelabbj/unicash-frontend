import { useState } from 'react';
import { FiBell, FiCheck, FiClock, FiDollarSign } from 'react-icons/fi';

const Notifications = () => {
    // Mock notifications data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Reçu de transfert",
            message: "Vous avez reçu 15000 FCFA de John Doe.",
            time: "Il y a 2 min",
            read: false,
            type: "money_in"
        },
        {
            id: 2,
            title: "Transaction réussie",
            message: "Votre transfert de 5000 FCFA vers 97000000 a été effectué avec succès.",
            time: "Il y a 1 heure",
            read: true,
            type: "money_out"
        },
        {
            id: 3,
            title: "Maintenance système",
            message: "Une maintenance est prévue ce soir à 23h. Les services seront perturbés.",
            time: "Il y a 5 heures",
            read: true,
            type: "system"
        },
        {
            id: 4,
            title: "Bienvenue sur UniCash",
            message: "Merci d'avoir rejoint notre plateforme. Profitez de transactions rapides !",
            time: "Il y a 1 jour",
            read: true,
            type: "system"
        }
    ]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'money_in':
                return <FiDollarSign className="text-green-600" />;
            case 'money_out':
                return <FiCheck className="text-blue-600" />;
            default:
                return <FiBell className="text-orange-600" />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'money_in': return 'bg-green-100';
            case 'money_out': return 'bg-blue-100';
            default: return 'bg-orange-100';
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary hover:underline font-medium"
                >
                    Tout marquer comme lu
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`p-4 md:p-6 transition-colors hover:bg-gray-50 flex gap-4 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                        >
                            {/* Icon */}
                            <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                                {getIcon(notification.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className={`font-semibold text-gray-900 ${!notification.read ? 'text-primary' : ''}`}>
                                        {notification.title}
                                    </h3>
                                    <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                                        <FiClock className="w-3 h-3" />
                                        {notification.time}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {notification.message}
                                </p>
                            </div>

                            {/* Status Dot */}
                            {!notification.read && (
                                <div className="shrink-0 pt-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <FiBell className="w-12 h-12 text-gray-300 mb-4" />
                        <p>Aucune notification</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
