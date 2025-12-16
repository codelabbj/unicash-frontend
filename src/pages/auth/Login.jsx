import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiLock, FiDollarSign, FiMail } from 'react-icons/fi';
import logo from '../../assets/Unicash.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating money bill decorations */}
            <div className="absolute top-10 left-10 text-gray-200 opacity-50 animate-pulse">
                <FiDollarSign className="w-12 h-12" />
            </div>
            <div className="absolute top-20 right-20 text-gray-200 opacity-30">
                <FiDollarSign className="w-16 h-16" />
            </div>
            <div className="absolute bottom-32 left-1/4 text-gray-200 opacity-40">
                <FiDollarSign className="w-10 h-10" />
            </div>
            <div className="absolute bottom-20 right-1/3 text-gray-200 opacity-30 animate-pulse">
                <FiDollarSign className="w-14 h-14" />
            </div>

            {/* Login Card */}
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img
                        src={logo}
                        alt="UniCash"
                        className="w-48 h-auto mx-auto"
                    />
                    <p className="text-gray-600 text-xl mt-2">Connexion</p>
                </div>

                {/* Money icon decoration */}


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
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

                    {/* Dollar sign decoration between inputs */}


                    {/* Password Input */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiLock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            placeholder="Mot de Passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Connexion...' : 'Se Connecter'}
                    </button>
                </form>

                {/* Bottom Links */}
                <div className="mt-6 text-sm space-y-4">
                    <div className="text-right">
                        <Link
                            to="/password-reset"
                            className="text-primary font-medium relative hover:no-underline after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                        >
                            Mot de passe oublié
                        </Link>
                    </div>
                    <div className="text-center">
                        Pas de compte ?
                        <Link
                            to="/register"
                            className="text-primary font-medium ml-1 relative hover:no-underline after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                        >
                            Inscrivez-vous
                        </Link>
                    </div>
                </div>
            </div>

            {/* More floating money decorations */}
            <div className="absolute top-1/3 right-10 text-gray-200 opacity-40">
                <FiDollarSign className="w-12 h-12" />
            </div>
            <div className="absolute bottom-1/4 left-20 text-gray-200 opacity-30 animate-pulse">
                <FiDollarSign className="w-10 h-10" />
            </div>
        </div>
    );
};

export default Login;
