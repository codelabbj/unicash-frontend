import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';
import { FiDollarSign, FiMail, FiCheckCircle } from 'react-icons/fi';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1: Request, 2: Confirm
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await authAPI.requestPasswordReset(email);
            setSuccess('Code de réinitialisation envoyé à votre email.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || "Impossible d'envoyer le code. Vérifiez l'email.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await authAPI.confirmPasswordReset({ email, otp, new_password: newPassword });
            setSuccess('Mot de passe réinitialisé avec succès !');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Échec de la réinitialisation');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating money decorations */}
            <div className="absolute top-10 right-10 text-gray-200 opacity-50 animate-pulse">
                <FiDollarSign className="w-12 h-12" />
            </div>
            <div className="absolute bottom-20 left-20 text-gray-200 opacity-30">
                <FiDollarSign className="w-16 h-16" />
            </div>

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-6">
                    <img
                        src="/uni-logo.png"
                        alt="UniCash"
                        className="w-48 h-auto mx-auto mb-2"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">
                        {step === 1 ? 'Mot de passe oublié' : 'Nouveau mot de passe'}
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4 flex items-center gap-2">
                        <FiCheckCircle /> {success}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleRequestSubmit} className="space-y-6">
                        <p className="text-gray-600 text-center text-sm">
                            Entrez votre email pour recevoir un code de réinitialisation.
                        </p>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Votre Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Envoi...' : 'Envoyer le code'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleConfirmSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Code reçu
                                </label>
                                <input
                                    type="text"
                                    placeholder="Code (6 chiffres)"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    placeholder="Nouveau mot de passe"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Réinitialisation...' : 'Changer le mot de passe'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="text-gray-600 hover:text-primary underline text-sm">
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
