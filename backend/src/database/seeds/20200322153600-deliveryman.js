module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'deliverymans',
            [
                {
                    name: 'John Doe',
                    email: 'johon_doe@entregador.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Gaspar Antunes',
                    email: 'gaspar_antunes@entregador.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Dai Jiang',
                    email: 'dai_jiang@entregador.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Tom Hanson',
                    email: 'tom_hanson@entregador.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Marc Franklin',
                    email: 'marc_franklin@entregador.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Rosetta Castro',
                    email: 'rosetta_castro@entregador.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: QueryInterface => QueryInterface.bulkDelete('deliverymans', null, {}),
};
