import apiClient from './axios.config';

export const transactionAPI = {
    initiateTransaction: (data) =>
        apiClient.post('/core/transaction/initiate/', data),

    getTransactions: (params) => apiClient.get('/core/transactions/', { params }),

    getUserStatistics: () => apiClient.get('/core/stats/user/'),
};
