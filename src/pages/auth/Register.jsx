import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiLock, FiMail, FiPhone, FiDollarSign } from 'react-icons/fi';
import logo from '../../assets/Unicash.png';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await register(formData);

        if (result.success) {
            navigate('/verify-email', { state: { email: formData.email } });
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating money decorations */}
            <div className="absolute top-10 left-10 text-gray-200 opacity-50 animate-pulse">
                <FiDollarSign className="w-12 h-12" />
            </div>
            <div className="absolute bottom-20 right-20 text-gray-200 opacity-30">
                <FiDollarSign className="w-16 h-16" />
            </div>

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-6">
                    <img
                        src={logo}
                        alt="UniCash"
                        className="w-48 h-auto mx-auto mb-2"
                    />
                    <p className="text-gray-600 text-xl mt-2">Créer un compte</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiMail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* First Name */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiUser className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Prénom"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiUser className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Nom"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiPhone className="w-5 h-5" />
                        </div>
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder="Téléphone"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiLock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>


                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Inscription...' : "S'inscrire"}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                    Déjà un compte ? {' '}
                    <Link to="/login"
                        className="text-primary font-medium relative hover:no-underline after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                    >
                        Connectez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
