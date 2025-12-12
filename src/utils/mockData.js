// Mock data for transactions - used across the application
export const mockTransactions = [
    { uid: 1, type: 'TRANSFER', amount: '5000', date: '2023-10-25T10:00:00', status: 'SUCCESS', reference: 'TX123456789' },
    { uid: 2, type: 'TRANSFER', amount: '150000', date: '2023-10-24T14:30:00', status: 'SUCCESS', reference: 'TX987654322' },
    { uid: 3, type: 'TRANSFER', amount: '2500', date: '2023-10-24T14:30:00', status: 'PENDING', reference: 'TX987654321' },
    { uid: 4, type: 'TRANSFER', amount: '10000', date: '2023-10-22T11:20:00', status: 'SUCCESS', reference: 'TX654789123' },
    { uid: 5, type: 'TRANSFER', amount: '10000', date: '2023-10-20T09:15:00', status: 'FAILED', reference: 'TX456123789' },
    { uid: 6, type: 'TRANSFER', amount: '1000', date: '2023-10-18T18:45:00', status: 'SUCCESS', reference: 'TX789123456' },
];

export const getRecentTransactions = (limit = 5) => {
    return mockTransactions.slice(0, limit);
};
