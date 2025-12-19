import { FiHeadphones } from 'react-icons/fi';

const SupportCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center flex-1">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                <FiHeadphones size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Besoin d'aide ?</h3>
            <p className="text-gray-500 text-sm mb-4">
                Notre équipe de support est disponible 24/7
            </p>
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-primary font-medium py-2 px-4 rounded-lg transition-colors border border-gray-200">
                Contacter le support
            </button>
        </div>
    );
};

export default SupportCard;
