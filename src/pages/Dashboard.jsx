import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiList, FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';
// import StatisticsCard from '../components/dashboard/StatisticsCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import AdCarousel from '../components/common/AdCarousel';
import SupportCard from '../components/dashboard/SupportCard';
import { transactionAPI } from '../api/transaction.api';
import { mockBanners } from '../utils/mockData';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSent: '0 FCFA',
        transactionsCount: 0,
        successRate: '0%',
        pendingCount: 0
    });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, transRes] = await Promise.all([
                    transactionAPI.getUserStatistics(),
                    transactionAPI.getTransactions({ limit: 5 })
                ]);

                if (statsRes.data) {
                    setStats({
                        totalSent: `${statsRes.data.total_amount || 0} FCFA`,
                        transactionsCount: statsRes.data.total_count || 0,
                        successRate: `${statsRes.data.success_rate || 0}%`,
                        pendingCount: statsRes.data.pending_count || 0
                    });
                }

                const transData = transRes.data;
                const transactions = Array.isArray(transData) ? transData : (transData?.results || []);
                setRecentTransactions(transactions.slice(0, 5));
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

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
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
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
            </div> */}

            {/* Recent Activity Section */}
            <h1 className="text-lg font-bold text-gray-800 truncate">Transactions récentes</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    {isLoading ? (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
                            Chargement des activités...
                        </div>
                    ) : (
                        <RecentTransactions transactions={recentTransactions} />
                    )}
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
