import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSend, FiSmartphone, FiInfo, FiArrowLeft, FiArrowRight, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { networkAPI } from '../../api/network.api';
import { transactionAPI } from '../../api/transaction.api';

// Network Logos Logic
const LOGO_MAPPING = {
    'MTN': 'https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg',
    'MOOV': 'https://upload.wikimedia.org/wikipedia/commons/2/22/Moov_Africa_logo.png',
    'ORANGE': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg',
    'WAVE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Wave_logo.svg/1200px-Wave_logo.svg.png',
    'CELTIIS': 'https://pbs.twimg.com/profile_images/1583486303038685186/tnk-aQq__400x400.jpg'
};

const getNetworkLogo = (network) => {
    if (!network) return null;
    if (network.logo) return network.logo;

    // Fallback based on code or name
    const code = network.code?.toUpperCase() || '';
    const name = network.name?.toUpperCase() || '';

    if (code.includes('MTN') || name.includes('MTN')) return LOGO_MAPPING.MTN;
    if (code.includes('MOOV') || name.includes('MOOV')) return LOGO_MAPPING.MOOV;
    if (code.includes('ORANGE') || name.includes('ORANGE')) return LOGO_MAPPING.ORANGE;
    if (code.includes('WAVE') || name.includes('WAVE')) return LOGO_MAPPING.WAVE;
    if (code.includes('CELTIIS') || name.includes('CELTIIS') || code.includes('CELTIS')) return LOGO_MAPPING.CELTIIS;

    // Default fallback if we had one, or return null to show initial
    return null;
};

const STEPS = [
    { id: 1, title: 'Expéditeur', description: 'Informations source' },
    { id: 2, title: 'Bénéficiaire', description: 'Informations destination' },
    { id: 3, title: 'Montant', description: 'Confirmation' }
];

const NewTransaction = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [networks, setNetworks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fees, setFees] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            amount: '',
            source_network: '',
            source_number: '',
            source_number_confirm: '',
            destination_network: '',
            destination_number: '',
            destination_number_confirm: ''
        }
    });

    useEffect(() => {
        if (location.state) {
            const { amount, source_network, source_number, destination_network, destination_number } = location.state;
            if (amount) setValue('amount', amount);
            if (source_network) setValue('source_network', source_network);
            if (source_number) {
                setValue('source_number', source_number);
                setValue('source_number_confirm', source_number);
            }
            if (destination_network) setValue('destination_network', destination_network);
            if (destination_number) {
                setValue('destination_number', destination_number);
                setValue('destination_number_confirm', destination_number);
            }
        }
    }, [location.state, setValue]);

    const amount = watch('amount');
    const sourceNetwork = watch('source_network');
    const destNetwork = watch('destination_network');

    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const response = await networkAPI.getNetworks();
                console.log('Networks API Response:', response.data);

                // Extract data from various possible structures
                let data = response.data;
                if (data && !Array.isArray(data)) {
                    if (Array.isArray(data.results)) data = data.results;
                    else if (Array.isArray(data.networks)) data = data.networks;
                    else if (Array.isArray(data.data)) data = data.data;
                }

                if (Array.isArray(data)) {
                    setNetworks(data);
                } else {
                    console.warn('Invalid networks list format from API');
                    setNetworks([]);
                }
            } catch (err) {
                console.error('Failed to fetch networks', err);
                setNetworks([]);
            }
        };
        fetchNetworks();
    }, []);

    useEffect(() => {
        if (amount && !isNaN(amount)) {
            setFees(Math.ceil(parseFloat(amount) * 0.01));
        } else {
            setFees(0);
        }
    }, [amount]);

    const validateStep = async (step) => {
        let fieldsToValidate = [];
        if (step === 1) {
            fieldsToValidate = ['source_network', 'source_number', 'source_number_confirm'];
        } else if (step === 2) {
            fieldsToValidate = ['destination_network', 'destination_number', 'destination_number_confirm'];
        } else if (step === 3) {
            fieldsToValidate = ['amount'];
        }
        return await trigger(fieldsToValidate);
    };

    const handleNext = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingData, setPendingData] = useState(null);

    const onSubmit = (data) => {
        setPendingData(data);
        setIsModalOpen(true);
    };

    const handleConfirmTransaction = async () => {
        if (!pendingData) return;

        setIsLoading(true);
        setError('');

        // Close modal immediately or keep it open with loader? 
        // Better to keep open or show loading state inside modal.
        // For now, let's keep modal open and rely on isLoading state which will disable the button inside modal

        try {
            const response = await transactionAPI.initiateTransaction({
                amount: parseFloat(pendingData.amount),
                source_network: pendingData.source_network,
                source_number: pendingData.source_number,
                dest_network: pendingData.destination_network,
                dest_number: pendingData.destination_number
            });

            const result = response.data;
            console.log('Transaction Initiation Response:', result);

            if (result.payment_url) {
                window.location.href = result.payment_url;
            } else {
                navigate('/transactions');
            }
        } catch (err) {
            console.error('Transaction Error:', err.response?.data);
            const errorMessage = err.response?.data?.error || err.response?.data?.message || err.response?.data?.detail || "Échec de l'initialisation de la transaction";
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
            setIsModalOpen(false); // Close modal on error so user can see error message on form
        } finally {
            setIsLoading(false);
        }
    };

    const getNetworkName = (code) => {
        if (!Array.isArray(networks)) return code;
        const net = networks.find(n => n.code === code);
        return net ? net.name : code;
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-3 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Nouvelle Transaction</h1>
                <p className="text-gray-500 text-sm md:text-base hidden md:block">Envoyez de l'argent vers n'importe quel réseau.</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-6 mb-3 md:mb-6">
                <div className="flex items-center w-full">
                    {STEPS.map((step, idx) => (
                        <div key={step.id} className={`flex items-center ${idx < STEPS.length - 1 ? 'flex-1' : ''}`}>
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all ${currentStep > step.id
                                    ? 'bg-green-500 text-white'
                                    : currentStep === step.id
                                        ? 'bg-primary text-white shadow-lg shadow-blue-200'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {currentStep > step.id ? <FiCheck className="w-4 h-4" /> : step.id}
                                </div>
                                <span className={`mt-1 text-[10px] md:text-xs font-medium whitespace-nowrap ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                            {idx < STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 md:h-1 mx-1 md:mx-3 rounded-full transition-all ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-100'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

                        {/* Step 1: Source */}
                        {currentStep === 1 && (
                            <div className="space-y-3 md:space-y-6">
                                <h3 className="font-semibold text-gray-800 text-base md:text-lg flex items-center gap-2">
                                    <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center text-xs md:text-sm">1</span>
                                    Informations Expéditeur
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Réseau Source</label>
                                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                                        {Array.isArray(networks) && networks.length > 0 ? (
                                            networks.map(net => (
                                                <button
                                                    key={net.id || net.uid || net.code}
                                                    type="button"
                                                    onClick={() => setValue('source_network', net.code, { shouldValidate: true })}
                                                    className={`flex flex-col items-center gap-1.5 md:gap-3 p-2 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-200 ${sourceNetwork === net.code
                                                        ? 'border-primary bg-blue-50/50 shadow-md scale-[1.02]'
                                                        : 'border-gray-100 bg-white hover:border-gray-200'
                                                        }`}
                                                >
                                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-white flex items-center justify-center">
                                                        {getNetworkLogo(net) ? (
                                                            <img src={getNetworkLogo(net)} alt={net.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-sm md:text-lg font-bold text-primary">{net.name?.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <span className={`text-[9px] md:text-xs font-bold uppercase tracking-wider ${sourceNetwork === net.code ? 'text-primary' : 'text-gray-500'}`}>
                                                        {net.name.split(' ')[0]}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="col-span-3 py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                <p className="text-gray-400 text-sm">Aucun réseau disponible pour le moment.</p>
                                            </div>
                                        )}
                                    </div>
                                    <input type="hidden" {...register('source_network', { required: 'Veuillez choisir un réseau' })} />
                                    {errors.source_network && <span className="text-red-500 text-xs mt-2 block">{errors.source_network.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Numéro de Téléphone</label>
                                    <div className="relative">
                                        <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Ex: 97000000"
                                            {...register('source_number', {
                                                required: 'Requis',
                                                pattern: { value: /^[0-9]{8,10}$/, message: 'Numéro invalide' }
                                            })}
                                            className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    {errors.source_number && <span className="text-red-500 text-xs mt-1">{errors.source_number.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Confirmer le Numéro</label>
                                    <div className="relative">
                                        <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Répétez le numéro"
                                            onPaste={(e) => e.preventDefault()}
                                            {...register('source_number_confirm', {
                                                required: 'Confirmation requise',
                                                validate: (val) => watch('source_number') === val || "Les numéros ne correspondent pas"
                                            })}
                                            className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    {errors.source_number_confirm && <span className="text-red-500 text-xs mt-1">{errors.source_number_confirm.message}</span>}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Destination */}
                        {currentStep === 2 && (
                            <div className="space-y-3 md:space-y-6">
                                <h3 className="font-semibold text-gray-800 text-base md:text-lg flex items-center gap-2">
                                    <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs md:text-sm">2</span>
                                    Informations Bénéficiaire
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Réseau Destination</label>
                                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                                        {Array.isArray(networks) && networks.length > 0 ? (
                                            networks.map(net => (
                                                <button
                                                    key={net.id}
                                                    type="button"
                                                    onClick={() => setValue('destination_network', net.code, { shouldValidate: true })}
                                                    className={`flex flex-col items-center gap-1.5 md:gap-3 p-2 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-200 ${destNetwork === net.code
                                                        ? 'border-purple-600 bg-purple-50 shadow-md scale-[1.02]'
                                                        : 'border-gray-100 bg-white hover:border-gray-200'
                                                        }`}
                                                >
                                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-white flex items-center justify-center">
                                                        {getNetworkLogo(net) ? (
                                                            <img src={getNetworkLogo(net)} alt={net.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-sm md:text-lg font-bold text-primary">{net.name?.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <span className={`text-[9px] md:text-xs font-bold uppercase tracking-wider ${destNetwork === net.code ? 'text-purple-700' : 'text-gray-500'}`}>
                                                        {net.name.split(' ')[0]}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="col-span-3 py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                <p className="text-gray-400 text-sm">Aucun réseau disponible pour le moment.</p>
                                            </div>
                                        )}
                                    </div>
                                    <input type="hidden" {...register('destination_network', { required: 'Veuillez choisir un réseau' })} />
                                    {errors.destination_network && <span className="text-red-500 text-xs mt-2 block">{errors.destination_network.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Numéro de Téléphone</label>
                                    <div className="relative">
                                        <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Ex: 66000000"
                                            {...register('destination_number', {
                                                required: 'Requis',
                                                pattern: { value: /^[0-9]{8,10}$/, message: 'Numéro invalide' }
                                            })}
                                            className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    {errors.destination_number && <span className="text-red-500 text-xs mt-1">{errors.destination_number.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Confirmer le Numéro</label>
                                    <div className="relative">
                                        <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="Répétez le numéro"
                                            onPaste={(e) => e.preventDefault()}
                                            {...register('destination_number_confirm', {
                                                required: 'Confirmation requise',
                                                validate: (val) => watch('destination_number') === val || "Les numéros ne correspondent pas"
                                            })}
                                            className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    {errors.destination_number_confirm && <span className="text-red-500 text-xs mt-1">{errors.destination_number_confirm.message}</span>}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Amount & Confirmation */}
                        {currentStep === 3 && (
                            <div className="space-y-3 md:space-y-6">
                                <h3 className="font-semibold text-gray-800 text-base md:text-lg flex items-center gap-2">
                                    <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs md:text-sm">3</span>
                                    Montant & Confirmation
                                </h3>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 gap-2 md:gap-4">
                                    <div className="bg-blue-50/50 rounded-xl p-3 md:p-4 border border-blue-100">
                                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Expéditeur</p>
                                        <p className="font-bold text-gray-900 text-sm md:text-base">{getNetworkName(sourceNetwork)}</p>
                                        <p className="text-xs md:text-sm text-gray-600">{watch('source_number')}</p>
                                    </div>
                                    <div className="bg-purple-50/50 rounded-xl p-3 md:p-4 border border-purple-100">
                                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Bénéficiaire</p>
                                        <p className="font-bold text-gray-900 text-sm md:text-base">{getNetworkName(destNetwork)}</p>
                                        <p className="text-xs md:text-sm text-gray-600">{watch('destination_number')}</p>
                                    </div>
                                </div>

                                <div className="bg-green-50/50 rounded-xl p-4 md:p-6 border border-green-100">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Montant à envoyer (FCFA)</label>
                                    <input
                                        type="number"
                                        placeholder="Min 100 FCFA"
                                        {...register('amount', {
                                            required: 'Requis',
                                            min: { value: 100, message: 'Minimum 100 FCFA' }
                                        })}
                                        className="w-full px-4 py-3 md:py-4 text-lg md:text-xl font-bold text-primary border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 bg-white"
                                    />
                                    {errors.amount && <span className="text-red-500 text-xs mt-1 block">{errors.amount.message}</span>}

                                    <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                                        <div className="flex justify-between text-xs md:text-sm text-gray-500">
                                            <span>Montant</span>
                                            <span>{amount || 0} FCFA</span>
                                        </div>
                                        <div className="flex justify-between text-xs md:text-sm text-gray-500">
                                            <span className="flex items-center gap-1">Frais estimés <FiInfo className="w-3 h-3" /></span>
                                            <span>{fees} FCFA</span>
                                        </div>
                                        <div className="h-px bg-gray-200"></div>
                                        <div className="flex justify-between font-bold text-gray-900 text-base md:text-lg">
                                            <span>Total à payer</span>
                                            <span>{(parseFloat(amount || 0) + fees)} FCFA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <FiArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                                    Retour
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    Continuer
                                    <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <FiSend className={`w-4 h-4 md:w-5 md:h-5 ${isLoading ? 'animate-spin' : ''}`} />
                                    <span className="hidden md:inline">{isLoading ? 'Initialisation...' : 'Confirmer et Payer'}</span>
                                    <span className="md:hidden">{isLoading ? '...' : 'Confirmer'}</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-fade-in relative">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-4">
                                <FiAlertTriangle size={32} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">Attention !</h3>
                            <p className="text-gray-600 mb-6">
                                Une transaction ne peut être annulée après confirmation. Êtes-vous sûr de vouloir continuer ?
                            </p>

                            <div className="flex flex-col gap-3 w-full">
                                <button
                                    onClick={handleConfirmTransaction}
                                    disabled={isLoading}
                                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <FiSend className="animate-spin" />
                                            <span>Traitement...</span>
                                        </>
                                    ) : (
                                        <span>Confirmer</span>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        if (!isLoading) setIsModalOpen(false);
                                    }}
                                    disabled={isLoading}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewTransaction;
