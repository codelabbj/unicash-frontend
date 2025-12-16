import { Link } from 'react-router-dom';
import { FiSend, FiList, FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import AdCarousel from '../components/common/AdCarousel';
import { getRecentTransactions, mockBanners } from '../utils/mockData';

const Dashboard = () => {
    // Mock data - to be replaced with API call
    const stats = {
        totalSent: '150 FCFA',
        transactionsCount: 12,
        successRate: '98%',
        pendingCount: 2
    };

    const recentTransactions = getRecentTransactions(5);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800 truncate">Vue d'ensemble</h1>
                <Link
                    to="/transaction/new"
                    className="bg-primary hover:bg-primary-hover text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap text-sm md:text-base"
                >
                    <FiSend size={18} />
                    <span className="hidden sm:inline">Nouvelle Transaction</span>
                </Link>
            </div>

            {/* Mobile Ad Carousel */}
            <div className="md:hidden">
                <AdCarousel banners={mockBanners} />
            </div>

            {/* Statistics */}
            <div className="bg-[#1e40af] rounded-3xl p-6 shadow-lg">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatisticsCard
                        title="Total Envoyé"
                        value={stats.totalSent}
                        icon={FiTrendingUp}
                        isDark={true}
                    />
                    <StatisticsCard
                        title="Total Transferts"
                        value={stats.transactionsCount}
                        icon={FiList}
                        isDark={true}
                    />
                    <StatisticsCard
                        title="Taux de Succès"
                        value={stats.successRate}
                        icon={FiCheckCircle}
                        isDark={true}
                    />
                    <StatisticsCard
                        title="En Attente"
                        value={stats.pendingCount}
                        icon={FiClock}
                        isDark={true}
                    />
                </div>
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
