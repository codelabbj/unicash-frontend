import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiRepeat, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { transactionAPI } from '../../api/transaction.api';
import { mockTransactions } from '../../utils/mockData';

const TransactionHistory = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, SUCCESS, PENDING, FAILED
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await transactionAPI.getTransactions();
                console.log('Transactions API Response:', response.data);

                let data = response.data;
                if (data && !Array.isArray(data)) {
                    if (Array.isArray(data.results)) data = data.results;
                    else if (Array.isArray(data.transactions)) data = data.transactions;
                    else if (Array.isArray(data.data)) data = data.data;
                }

                setTransactions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching transactions', err);
                setTransactions([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SUCCESS': return 'bg-green-100 text-green-700';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'FAILED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTransactionColor = () => {
        return 'bg-blue-50 text-primary';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'SUCCESS': return <FiCheckCircle className="w-4 h-4" />;
            case 'PENDING': return <FiClock className="w-4 h-4" />;
            case 'FAILED': return <FiXCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'SUCCESS': return 'Succès';
            case 'PENDING': return 'En attente';
            case 'FAILED': return 'Échec';
            case 'ALL': return 'Tout voir';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Historique des Transactions</h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary w-full md:w-64"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        <FiFilter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filters Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-6">
                    {['ALL', 'SUCCESS', 'PENDING', 'FAILED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${filter === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {getStatusLabel(tab)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-gray-500">Chargement...</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {Array.isArray(transactions) && transactions
                            .filter(t => {
                                const matchesFilter = filter === 'ALL' || t.status === filter;
                                const matchesSearch = (t.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                                    (t.amount?.toString() || '').includes(searchTerm);
                                return matchesFilter && matchesSearch;
                            })
                            .map((tx) => (
                                <div
                                    key={tx.uid}
                                    onClick={() => navigate(`/transaction/${tx.uid}`)}
                                    className="p-4 md:p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 md:gap-4 min-w-0">
                                            <div className={`p-2.5 md:p-3 rounded-full flex-shrink-0 ${getTransactionColor()}`}>
                                                <FiRepeat className="w-5 h-5 md:w-6 h-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 text-sm md:text-base truncate">Ref: {tx.reference}</p>
                                                <p className="text-[11px] md:text-sm text-gray-500 truncate">
                                                    {new Date(tx.date).toLocaleDateString()} à {new Date(tx.date).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right flex-shrink-0">
                                            <p className="text-base md:text-lg font-bold text-gray-900">
                                                {tx.amount} FCFA
                                            </p>
                                            <div className={`inline-flex items-center gap-1 px-2 md:px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium mt-1 whitespace-nowrap ${getStatusColor(tx.status)}`}>
                                                {getStatusIcon(tx.status)}
                                                {getStatusLabel(tx.status)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {transactions.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                Aucune transaction trouvée
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;
