import apiClient from './axios.config';

export const authAPI = {
    register: (data) => apiClient.post('/auth/register/', data),

    verifyEmail: (data) => apiClient.post('/auth/verify-email/', data),

    resendOTP: (data) => apiClient.post('/auth/resend-otp/', data),

    login: (data) => apiClient.post('/auth/login/', data),

    refreshToken: (refreshToken) =>
        apiClient.post('/auth/token/refresh/', { refresh: refreshToken }),

    verifyToken: (token) => apiClient.post('/auth/token/verify/', { token }),

    changePassword: (data) => apiClient.post('/auth/change-password/', data),

    requestPasswordReset: (email) =>
        apiClient.post('/auth/password-reset/', { email }),

    confirmPasswordReset: (data) =>
        apiClient.post('/auth/password-reset/confirm/', data),
};
