import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/auth.api';
import { FiCheckCircle, FiDollarSign } from 'react-icons/fi';
import logo from '../../assets/Unicash.png';

const VerifyEmail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(state?.email || '');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await authAPI.verifyEmail({ email, otp });
            setSuccess('Email vérifié avec succès ! Redirection...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Échec de la vérification');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (timeLeft > 0) return;

        try {
            await authAPI.resendOTP({ email, purpose: 'VERIFICATION' });
            setSuccess('Un nouveau code a été envoyé');
            setTimeLeft(60);
        } catch (err) {
            setError('Impossible de renvoyer le code');
        }
    };

    useEffect(() => {
        if (!email) {
            // Redirect if accessed directly without email state
            // But allow manual entry if needed (optional design choice, for now let's keep it open or redirect)
            // navigate('/register');
        }

        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, email, navigate]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating money decorations - Match Login/Register */}
            <div className="absolute top-10 left-10 text-gray-200 opacity-50 animate-pulse">
                <FiDollarSign className="w-12 h-12" />
            </div>
            <div className="absolute top-1/3 right-10 text-gray-200 opacity-40">
                <FiDollarSign className="w-12 h-12" />
            </div>
            <div className="absolute bottom-20 right-20 text-gray-200 opacity-30 animate-pulse">
                <FiDollarSign className="w-14 h-14" />
            </div>

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-6">
                    <img
                        src={logo}
                        alt="UniCash"
                        className="w-48 h-auto mx-auto mb-2"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">Vérification Email</h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        Entrez le code envoyé à <span className="font-semibold">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* OTP Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Code de vérification (6 chiffres)
                        </label>
                        <input
                            type="text"
                            maxLength="6"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            required
                            className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <FiCheckCircle /> {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Vérification...' : 'Valider'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        onClick={handleResendOTP}
                        disabled={timeLeft > 0}
                        className="text-sm text-primary hover:text-primary-hover font-medium disabled:text-gray-400"
                    >
                        {timeLeft > 0
                            ? `Renvoyer le code dans ${timeLeft}s`
                            : "Je n'ai pas reçu le code (Renvoyer)"}
                    </button>
                    <div className="mt-4">
                        <Link to="/login"
                            className="text-primary font-medium relative hover:no-underline after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
