import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const devMode = import.meta.env.VITE_DEV_MODE === 'true';

    // Mock user for development mode
    const mockUser = {
        user_id: 1,
        email: 'dev@unicash.com',
        first_name: 'Dev',
        last_name: 'User',
        exp: Math.floor(Date.now() / 1000) + 86400, // expires in 24 hours
    };

    useEffect(() => {
        // In dev mode, auto-login with mock user
        if (devMode) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: mockUser },
            });
            dispatch({ type: 'SET_LOADING', payload: false });
            return;
        }

        // Check if user is already logged in
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp > currentTime) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: { user: decoded },
                    });
                } else {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    }, [devMode]);

    const login = async (email, password) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await authAPI.login({ email, password });

            const { access, refresh, user_id, email: userEmail } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            const decoded = jwtDecode(access);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: { ...decoded, user_id, email: userEmail } },
            });

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Login failed';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            await authAPI.register(userData);
            dispatch({ type: 'SET_LOADING', payload: false });
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Registration failed';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        dispatch({ type: 'LOGOUT' });
    };

    const value = {
        ...state,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
