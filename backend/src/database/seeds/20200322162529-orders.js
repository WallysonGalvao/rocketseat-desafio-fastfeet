module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'orders',
            [
                {
                    product: 'Kit Faber Castel',
                    recipient_id: '1',
                    deliveryman_id: '1',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    product: 'Caderno Brochura 96 Folhas',
                    recipient_id: '2',
                    deliveryman_id: '2',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    product: 'Kit Tesoura Escolar ',
                    recipient_id: '3',
                    deliveryman_id: '3',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    product: 'Pasta De Plastico Com Elastico',
                    recipient_id: '4',
                    deliveryman_id: '4',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    product: 'Kit Escolar Réguas Geométrico',
                    recipient_id: '5',
                    deliveryman_id: '5',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    product: 'Mochila Nike Brasilia Academy Team',
                    recipient_id: '6',
                    deliveryman_id: '6',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: QueryInterface => QueryInterface.bulkDelete('orders', null, {}),
};
