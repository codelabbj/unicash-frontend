import { Link } from 'react-router-dom';
import { FiSend, FiList, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const Dashboard = () => {
    // Mock data - to be replaced with API call
    const stats = {
        totalSent: '150 000 FCFA',
        transactionsCount: 12,
        successRate: '98%'
    };

    const recentTransactions = [
        { uid: 1, type: 'DEBIT', recipient: 'MTN Benin (John Doe)', amount: '5 000', date: '2023-10-25', status: 'SUCCESS' },
        { uid: 2, type: 'DEBIT', recipient: 'Moov Benin (Jane Smith)', amount: '2 500', date: '2023-10-24', status: 'PENDING' },
        { uid: 3, type: 'DEBIT', recipient: 'Orange Money (Ali)', amount: '10 000', date: '2023-10-20', status: 'FAILED' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Vue d'ensemble</h1>
                <Link
                    to="/transaction/new"
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                    <FiSend /> Nouvelle Transaction
                </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatisticsCard
                    title="Total Envoyé"
                    value={stats.totalSent}
                    icon={FiTrendingUp}
                    colorClass="bg-blue-50 text-blue-600"
                />
                <StatisticsCard
                    title="Transactions"
                    value={stats.transactionsCount}
                    icon={FiList}
                    colorClass="bg-purple-50 text-purple-600"
                />
                <StatisticsCard
                    title="Taux de Succès"
                    value={stats.successRate}
                    icon={FiCheckCircle}
                    colorClass="bg-green-50 text-green-600"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentTransactions transactions={recentTransactions} />
                </div>

                {/* Quick Actions or Promo Banner */}
                <div className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-xl mb-2">Envoyez de l'argent rapidement</h3>
                    <p className="text-blue-100 mb-6 text-sm">
                        Transférez de l'argent vers tous les réseaux mobiles instantanément et à moindre coût.
                    </p>
                    <Link
                        to="/transaction/new"
                        className="block w-full bg-white text-primary text-center font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Commencer
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
