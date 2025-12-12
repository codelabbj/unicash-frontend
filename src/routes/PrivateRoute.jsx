import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const devMode = import.meta.env.VITE_DEV_MODE === 'true';

    if (isLoading && !devMode) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Chargement...</div>
            </div>
        );
    }

    // En mode développement, permettre l'accès sans authentification
    if (devMode) {
        return children;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
