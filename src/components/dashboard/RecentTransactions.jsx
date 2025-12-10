import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';

const RecentTransactions = ({ transactions = [] }) => {
    if (!transactions.length) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center py-12">
                <p className="text-gray-500">Aucune transaction récente</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Transactions Récentes</h3>
                <button className="text-sm text-primary font-medium hover:underline">Voir tout</button>
            </div>
            <div className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                    <div key={tx.uid} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${tx.type === 'DEBIT' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {tx.type === 'DEBIT' ? <FiArrowUpRight /> : <FiArrowDownLeft />}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{tx.recipient}</p>
                                <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${tx.type === 'DEBIT' ? 'text-gray-900' : 'text-green-600'}`}>
                                {tx.type === 'DEBIT' ? '-' : '+'}{tx.amount} FCFA
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${tx.status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                                    tx.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
