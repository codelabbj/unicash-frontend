import apiClient from './axios.config';

export const networkAPI = {
    getNetworks: () => apiClient.get('/core/networks/'),
};
