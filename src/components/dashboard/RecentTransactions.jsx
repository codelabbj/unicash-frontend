import { Link, useNavigate } from 'react-router-dom';
import { FiRepeat, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const RecentTransactions = ({ transactions = [] }) => {
    const navigate = useNavigate();

    if (!transactions.length) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center py-12">
                <p className="text-gray-500">Aucune transaction récente</p>
            </div>
        );
    }

    const getTransactionColor = () => {
        return 'bg-blue-50 text-primary';
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'SUCCESS': return 'bg-green-100 text-green-700';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'FAILED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'SUCCESS': return <FiCheckCircle className="w-3 h-3" />;
            case 'PENDING': return <FiClock className="w-3 h-3" />;
            case 'FAILED': return <FiXCircle className="w-3 h-3" />;
            default: return null;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'SUCCESS': return 'Succès';
            case 'PENDING': return 'En attente';
            case 'FAILED': return 'Échec';
            default: return status;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Transactions Récentes</h3>
                <Link to="/transactions" className="text-sm text-primary font-medium hover:underline">Voir tout</Link>
            </div>
            <div className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                    <div
                        key={tx.uid}
                        onClick={() => navigate(`/transaction/${tx.uid}`)}
                        className="p-3 md:p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                    >
                        <div className="flex items-center gap-2 md:gap-4 min-w-0">
                            <div className={`p-2 rounded-full flex-shrink-0 ${getTransactionColor()}`}>
                                <FiRepeat className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-gray-900 text-xs md:text-sm truncate">Ref: {tx.reference}</p>
                                <p className="text-[10px] md:text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-1">
                            <p className="font-bold text-gray-900 text-sm md:text-base">
                                {tx.amount} FCFA
                            </p>
                            <div className={`inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-medium mt-1 whitespace-nowrap ${getStatusStyles(tx.status)}`}>
                                {getStatusIcon(tx.status)}
                                {getStatusLabel(tx.status)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
