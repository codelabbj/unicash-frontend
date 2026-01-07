import { Link } from 'react-router-dom';
import { FiSend, FiList, FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import AdCarousel from '../components/common/AdCarousel';
import SupportCard from '../components/dashboard/SupportCard';
import { getRecentTransactions, mockBanners } from '../utils/mockData';

const Dashboard = () => {
    // Mock data - to be replaced with API call
    const stats = {
        totalSent: '150 000 FCFA',
        transactionsCount: 12,
        successRate: '98%',
        pendingCount: 2
    };

    const recentTransactions = getRecentTransactions(5);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800 truncate">Bienvenue sur UniCash</h1>
                <Link
                    to="/transaction/new"
                    className="hidden md:flex bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
                >
                    <FiSend size={18} />
                    <span>Nouvelle Transaction</span>
                </Link>
            </div>

            {/* Mobile Ad Carousel */}
            <div className="md:hidden">
                <AdCarousel banners={mockBanners} />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                <StatisticsCard
                    title="Total Envoyé"
                    value={stats.totalSent}
                    icon={FiTrendingUp}
                    color="blue"
                />
                <StatisticsCard
                    title="Total Transferts"
                    value={stats.transactionsCount}
                    icon={FiList}
                    color="purple"
                />
                <StatisticsCard
                    title="Taux de Succès"
                    value={stats.successRate}
                    icon={FiCheckCircle}
                    color="green"
                />
                <StatisticsCard
                    title="En Attente"
                    value={stats.pendingCount}
                    icon={FiClock}
                    color="orange"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <RecentTransactions transactions={recentTransactions} />
                </div>

                <div className="hidden lg:flex flex-col gap-6 h-full">
                    <AdCarousel banners={mockBanners} />
                    <SupportCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
