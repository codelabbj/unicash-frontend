import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSend, FiSmartphone, FiArrowRight, FiInfo } from 'react-icons/fi';
import { networkAPI } from '../../api/network.api';
import { transactionAPI } from '../../api/transaction.api';

const NewTransaction = () => {
    const [networks, setNetworks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fees, setFees] = useState(0);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            amount: '',
            source_network: '',
            source_number: '',
            destination_network: '',
            destination_number: ''
        }
    });

    const amount = watch('amount');
    const sourceNetwork = watch('source_network');
    const destNetwork = watch('destination_network');

    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const data = await networkAPI.getNetworks();
                setNetworks(data);
            } catch (err) {
                console.error('Failed to fetch networks', err);
                // Fallback for demo if API fails
                setNetworks([
                    { id: 1, name: 'MTN Benin', code: 'MTN_BJ' },
                    { id: 2, name: 'Moov Benin', code: 'MOOV_BJ' },
                    { id: 3, name: 'Celtiis', code: 'CELTIIS_BJ' }
                ]);
            }
        };
        fetchNetworks();
    }, []);

    useEffect(() => {
        // Simple mock fee calculation (1%)
        if (amount && !isNaN(amount)) {
            setFees(Math.ceil(parseFloat(amount) * 0.01));
        } else {
            setFees(0);
        }
    }, [amount]);

    const onSubmit = async (data) => {
        if (data.source_network === data.destination_network) {
            setError('Le réseau source et destination ne peuvent pas être identiques.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await transactionAPI.initiateTransaction({
                amount: parseFloat(data.amount),
                source_network: data.source_network,
                source_number: data.source_number,
                destination_network: data.destination_network,
                destination_number: data.destination_number
            });

            // Redirect to payment URL or confirmation page
            if (result.payment_url) {
                window.location.href = result.payment_url;
            } else {
                // Fallback/Demo
                navigate('/transactions');
            }
        } catch (err) {
            setError(err.response?.data?.error || "Échec de l'initialisation de la transaction");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Nouvelle Transaction</h1>
                <p className="text-gray-500">Envoyez de l'argent vers n'importe quel réseau.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Network Selection Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
                            {/* Arrow Icon Desktop */}
                            <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 justify-center items-center bg-gray-50 rounded-full p-2 border border-gray-100 z-10">
                                <FiArrowRight className="text-gray-400" />
                            </div>

                            {/* Source */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center text-xs">1</span>
                                    Expéditeur (Source)
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Réseau</label>
                                    <select
                                        {...register('source_network', { required: 'Requis' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                                    >
                                        <option value="">Sélectionner...</option>
                                        {networks.map(net => (
                                            <option key={net.id} value={net.code}>{net.name}</option>
                                        ))}
                                    </select>
                                    {errors.source_network && <span className="text-red-500 text-xs">{errors.source_network.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Numéro Téléphone</label>
                                    <div className="relative">
                                        <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Ex: 97000000"
                                            {...register('source_number', {
                                                required: 'Requis',
                                                pattern: { value: /^[0-9]{8,10}$/, message: 'Numéro invalide' }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.source_number && <span className="text-red-500 text-xs">{errors.source_number.message}</span>}
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
                                    Bénéficiaire (Destinataire)
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Réseau</label>
                                    <select
                                        {...register('destination_network', { required: 'Requis' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                                    >
                                        <option value="">Sélectionner...</option>
                                        {networks.map(net => (
                                            <option key={net.id} value={net.code}>{net.name}</option>
                                        ))}
                                    </select>
                                    {errors.destination_network && <span className="text-red-500 text-xs">{errors.destination_network.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Numéro Téléphone</label>
                                    <div className="relative">
                                        <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Ex: 66000000"
                                            {...register('destination_number', {
                                                required: 'Requis',
                                                pattern: { value: /^[0-9]{8,10}$/, message: 'Numéro invalide' }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.destination_number && <span className="text-red-500 text-xs">{errors.destination_number.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 my-6"></div>

                        {/* Amount & Summary */}
                        <div className="bg-blue-50/50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">3</span>
                                Détails du Montant
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Montant à envoyer (FCFA)</label>
                                    <input
                                        type="number"
                                        placeholder="Min 100 FCFA"
                                        {...register('amount', {
                                            required: 'Requis',
                                            min: { value: 100, message: 'Minimum 100 FCFA' }
                                        })}
                                        className="w-full px-4 py-3 text-lg font-semibold text-primary border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                                    />
                                    {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
                                </div>

                                <div className="flex flex-col justify-end space-y-2">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Montant</span>
                                        <span>{amount || 0} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span className="flex items-center gap-1">Frais estimés <FiInfo className="w-3 h-3" /></span>
                                        <span>{fees} FCFA</span>
                                    </div>
                                    <div className="h-px bg-gray-200 my-1"></div>
                                    <div className="flex justify-between font-bold text-gray-800 text-lg">
                                        <span>Total à payer</span>
                                        <span>{(parseFloat(amount || 0) + fees)} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <FiSend className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                            {isLoading ? 'Initialisation...' : 'Confirmer et Payer'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewTransaction;
