import React, { useState } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import PropTypes from 'prop-types';

import api from '~/services/api';

import { InputContainer, ButtonContainer, ContentHeader } from './styles';

export default function MenuBar({
    setLoad,
    status,
    Title,
    searchItem,
    to,
    noAdd,
}) {
    const [search, setSearch] = useState('');

    async function handleSearchOrders() {
        const { data } = await api.get('orders', {
            params: {
                search,
            },
        });
        /* const addStatus = data.map(response => ({
            ...response,
            status: response.canceled_at
                ? status.canceled
                : response.end_date
                ? status.delivered
                : response.start_date
                ? status.withdrawn
                : status.pending,
        }));
        debugger; */

        const newStatus = [
            'canceled_at',
            'end_date',
            'start_date',
        ].find(value => data.find(res => res[value]));

        if (newStatus === 'canceled_at') status = status.canceled;
        if (newStatus === 'start_date') status = status.withdrawn;
        if (newStatus === 'end_date') status = status.delivered;
        else status = status.pending;

        const addStatus = data.map(response => ({
            ...response,
            status,
        }));

        setLoad(addStatus);
    }

    async function handleSearchDeliverymen() {
        const { data } = await api.get('deliveryman', {
            params: {
                search,
            },
        });
        setLoad(data);
    }

    async function handleSearchRecipient() {
        const { data } = await api.get('recipients', {
            params: {
                search,
            },
        });
        setLoad(data);
    }

    async function handleSearchProblems() {
        const { data } = await api.get('/orders/problems/list', {
            params: {
                search,
            },
        });
        setLoad(data);
    }

    function handleSearch(input) {
        setSearch(input);
    }
    return (
        <ContentHeader>
            <h2>{Title}</h2>
            <div>
                <InputContainer>
                    <MdSearch size={20} color="#666" />
                    {/* Encomendas */}
                    {searchItem === 'orders' && (
                        <input
                            placeholder="Pesquisar"
                            onChange={e => handleSearch(e.target.value)}
                            onKeyPress={handleSearchOrders}
                        />
                    )}

                    {/* Entregadores */}
                    {searchItem === 'deliverymen' && (
                        <input
                            placeholder="Pesquisar"
                            onChange={e => handleSearch(e.target.value)}
                            onKeyPress={handleSearchDeliverymen}
                        />
                    )}

                    {/* Destinatários */}
                    {searchItem === 'recipient' && (
                        <input
                            placeholder="Pesquisar"
                            onChange={e => handleSearch(e.target.value)}
                            onKeyPress={handleSearchRecipient}
                        />
                    )}

                    {/* Problemas */}
                    {searchItem === 'problems' && (
                        <input
                            placeholder="Pesquisar"
                            onChange={e => handleSearch(e.target.value)}
                            onKeyPress={handleSearchProblems}
                        />
                    )}
                </InputContainer>

                {!noAdd && (
                    <ButtonContainer to={to}>
                        <MdAdd size={25} color="#fff" />
                        <span>Cadastrar</span>
                    </ButtonContainer>
                )}
            </div>
        </ContentHeader>
    );
}

MenuBar.propTypes = {
    searchItem: PropTypes.string.isRequired,
    noAdd: PropTypes.bool,
    Title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    setLoad: PropTypes.func.isRequired,
    status: PropTypes.objectOf(
        PropTypes.shape({
            title: PropTypes.string,
            background: PropTypes.string,
            textColor: PropTypes.string,
        })
    ).isRequired,
};

MenuBar.defaultProps = {
    noAdd: false,
};
