import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiCopy, FiCheckCircle, FiClock, FiXCircle, FiShare2, FiDownload } from 'react-icons/fi';
import { transactionAPI } from '../../api/transaction.api';
import { mockTransactions } from '../../utils/mockData';

const TransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                // In a real app, we would fetch by ID. 
                // For now, find in mock data or fetch all and find
                // Assuming ID matches uid or reference for now
                const found = mockTransactions.find(t => t.uid.toString() === id || t.reference === id);

                if (found) {
                    setTransaction(found);
                } else {
                    // If not found in mock, try API (mock implementation usually returns list)
                    const data = await transactionAPI.getTransactions();
                    const apiFound = data.find(t => t.uid.toString() === id || t.reference === id);
                    setTransaction(apiFound);
                }
            } catch (err) {
                console.error("Failed to load transaction", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    const handleCopyReference = () => {
        if (transaction?.reference) {
            navigator.clipboard.writeText(transaction.reference);
            setCopySuccess('Copié !');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'SUCCESS':
                return {
                    icon: <FiCheckCircle className="w-12 h-12 text-green-500" />,
                    text: 'Succès',
                    color: 'text-green-600 bg-green-50 border-green-100'
                };
            case 'PENDING':
                return {
                    icon: <FiClock className="w-12 h-12 text-yellow-500" />,
                    text: 'En attente',
                    color: 'text-yellow-600 bg-yellow-50 border-yellow-100'
                };
            case 'FAILED':
                return {
                    icon: <FiXCircle className="w-12 h-12 text-red-500" />,
                    text: 'Échec',
                    color: 'text-red-600 bg-red-50 border-red-100'
                };
            default:
                return {
                    icon: null,
                    text: status,
                    color: 'text-gray-600 bg-gray-50 border-gray-100'
                };
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Chargement des détails...</div>;
    }

    if (!transaction) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">Transaction introuvable</p>
                <button onClick={() => navigate(-1)} className="text-primary hover:underline">Retour</button>
            </div>
        );
    }

    const statusInfo = getStatusInfo(transaction.status);

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <FiArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Détails de la transaction</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Status Banner */}
                <div className="flex flex-col items-center justify-center py-8 bg-gray-50 border-b border-gray-100">
                    <div className="mb-4 bg-white p-4 rounded-full shadow-sm">
                        {statusInfo.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">{transaction.amount} FCFA</h2>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusInfo.color.replace('bg-', 'bg-opacity-50 ')}`}>
                        {statusInfo.text}
                    </span>
                </div>

                {/* Details List */}
                <div className="p-6 space-y-6">
                    {/* Reference Row */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Référence</p>
                            <p className="text-gray-900 font-mono font-medium">{transaction.reference}</p>
                        </div>
                        <button
                            onClick={handleCopyReference}
                            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <FiCopy />
                            <span>{copySuccess || 'Copier'}</span>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Date</p>
                            <p className="font-medium text-gray-900">
                                {new Date(transaction.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Heure</p>
                            <p className="font-medium text-gray-900">
                                {new Date(transaction.date).toLocaleTimeString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-1">Frais</p>
                            <p className="font-medium text-gray-900">0 FCFA</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 mt-6 border-t border-gray-100">
                        <button className="w-full py-4 px-6 bg-[#1e40af] text-white rounded-2xl font-bold text-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                            <FiDownload className="w-6 h-6" />
                            <span>Télécharger le reçu</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
