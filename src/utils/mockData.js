// Mock data for transactions - used across the application
export const mockTransactions = [
    {
        uid: 1,
        type: 'TRANSFER',
        amount: '5000',
        date: '2023-10-25T10:00:00',
        status: 'SUCCESS',
        reference: 'TX123456789',
        source_network: 'MTN_BJ',
        source_number: '97000101',
        destination_network: 'MOOV_BJ',
        destination_number: '66000202'
    },
    {
        uid: 2,
        type: 'TRANSFER',
        amount: '150000',
        date: '2023-10-24T14:30:00',
        status: 'SUCCESS',
        reference: 'TX987654322',
        source_network: 'CELTIIS_BJ',
        source_number: '40000303',
        destination_network: 'MTN_BJ',
        destination_number: '97000404'
    },
    {
        uid: 3,
        type: 'TRANSFER',
        amount: '2500',
        date: '2023-10-24T14:30:00',
        status: 'PENDING',
        reference: 'TX987654321',
        source_network: 'MOOV_BJ',
        source_number: '95000505',
        destination_network: 'CELTIIS_BJ',
        destination_number: '61000606'
    },
    {
        uid: 4,
        type: 'TRANSFER',
        amount: '10000',
        date: '2023-10-22T11:20:00',
        status: 'SUCCESS',
        reference: 'TX654789123',
        source_network: 'MTN_BJ',
        source_number: '67000707',
        destination_network: 'MTN_BJ',
        destination_number: '96000808'
    },
    {
        uid: 5,
        type: 'TRANSFER',
        amount: '10000',
        date: '2023-10-20T09:15:00',
        status: 'FAILED',
        reference: 'TX456123789',
        source_network: 'CELTIIS_BJ',
        source_number: '40000909',
        destination_network: 'MOOV_BJ',
        destination_number: '95001010',
        failure_reason: 'Solde insuffisant sur le compte source'
    },
    {
        uid: 6,
        type: 'TRANSFER',
        amount: '1000',
        date: '2023-10-18T18:45:00',
        status: 'SUCCESS',
        reference: 'TX789123456',
        source_network: 'MOOV_BJ',
        source_number: '61001111',
        destination_network: 'MOOV_BJ',
        destination_number: '94001212'
    },
];

export const getRecentTransactions = (limit = 5) => {
    return mockTransactions.slice(0, limit);
};

export const mockBanners = [
    {
        id: 1,
        title: "Bienvenue sur Unicash 👋",
        description: "Transférez votre argent entre tous les réseaux, instantanément et en toute sécurité.",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1000&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 2,
        title: "Faites vos transactions sans bouger",
        description: "Faites vos transactions sans bouger de votre lit.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 3,
        title: "Faites vos transactions en toute sécurité",
        description: "Faites vos transactions en toute sécurité avec UniCash.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
        link: "#"
    }
];
