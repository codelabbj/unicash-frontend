import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiRepeat, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { transactionAPI } from '../../api/transaction.api';
import { mockTransactions } from '../../utils/mockData';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, SUCCESS, PENDING, FAILED

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await transactionAPI.getTransactions();
                setTransactions(data);
            } catch (err) {
                console.error('Error fetching transactions', err);
                // Mock data for demo if API fails
                setTransactions(mockTransactions);
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
                            {tab === 'ALL' ? 'Tout voir' : tab}
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
                        {transactions
                            .filter(t => filter === 'ALL' || t.status === filter)
                            .map((tx) => (
                                <div key={tx.uid} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${getTransactionColor()}`}>
                                                <FiRepeat className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Ref: {tx.reference}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(tx.date).toLocaleDateString()} à {new Date(tx.date).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                {tx.amount} FCFA
                                            </p>
                                            <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(tx.status)}`}>
                                                {getStatusIcon(tx.status)}
                                                {tx.status}
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
