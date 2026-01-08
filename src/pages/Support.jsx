import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMessageCircle, FiChevronRight } from 'react-icons/fi';

const Support = () => {
    const navigate = useNavigate();

    const contactOptions = [
        {
            icon: FiMail,
            label: 'Email',
            value: 'support@unicash.com',
            action: () => window.open('mailto:support@unicash.com'),
            color: 'text-blue-600 bg-blue-50'
        },
        {
            icon: FiMessageCircle,
            label: 'WhatsApp',
            value: '+229 0162241874',
            action: () => window.open('https://wa.me/2290168021401'),
            color: 'text-green-600 bg-green-50'
        },
        {
            icon: FiPhone,
            label: 'Appel',
            value: '+229 0162241874',
            action: () => window.open('tel:+2290168021401'),
            color: 'text-purple-600 bg-purple-50'
        }
    ];

    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-50/30 pb-12">
            <header className="flex items-center gap-4 px-6 py-6 bg-white border-b border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <FiArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Service Client</h1>
            </header>

            <div className="p-6 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Comment pouvons-nous vous aider ?</h2>
                    <p className="text-gray-500">Notre équipe est disponible pour vous accompagner 24h/7j.</p>
                </div>

                <div className="space-y-4">
                    {contactOptions.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={option.action}
                            className="w-full bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex items-center justify-between group transition-all active:scale-[0.98] hover:bg-gray-50 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${option.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                    <option.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{option.label}</p>
                                    <p className="font-bold text-gray-900">{option.value}</p>
                                </div>
                            </div>
                            <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </div>

                <div className="bg-primary/5 p-6 rounded-[32px] border border-primary/10 space-y-4 mt-8">
                    <h3 className="font-bold text-primary flex items-center gap-2">
                        <FiMessageCircle className="w-5 h-5" /> FAQ & Base de connaissance
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Trouvez rapidement des réponses à vos questions les plus fréquentes sur l'utilisation d'UniCash.
                    </p>
                    <button className="w-full py-3 bg-white border border-primary/20 text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-[0.98] shadow-sm">
                        Consulter la FAQ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Support;
