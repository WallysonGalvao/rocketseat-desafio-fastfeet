import React from 'react';

import PropTypes from 'prop-types';

import { Button } from './styles';

export default function PageButton({ setPage, page, length }) {
    return (
        <section>
            <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                type="button"
            >
                Voltar
            </Button>
            <Button
                disabled={length < 10}
                type="button"
                onClick={() => setPage(page + 1)}
            >
                Próximo
            </Button>
        </section>
    );
}

PageButton.propTypes = {
    setPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    length: PropTypes.arrayOf(PropTypes.object).isRequired,
};
