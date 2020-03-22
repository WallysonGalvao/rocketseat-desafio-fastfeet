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

    async function handleSearchOrders(key) {
        if (key === 'Enter') {
            const { data } = await api.get('orders', {
                params: {
                    productName: search,
                },
            });
            const addStatus = data.map(response => ({
                ...response,
                status: response.canceled_at
                    ? status.canceled
                    : response.end_date
                    ? status.delivered
                    : response.start_date
                    ? status.withdrawn
                    : status.pending,
            }));
            setLoad(addStatus);
        }
    }

    async function handleSearchCouries(key) {
        if (key === 'Enter') {
            const { data } = await api.get('deliveryman', {
                params: {
                    deliverymanName: search,
                },
            });
            setLoad(data);
        }
    }

    async function handleSearchProblems(key) {
        if (key === 'Enter') {
            const { data } = await api.get('/orders/problems/list', {
                params: {
                    q: search,
                },
            });
            setLoad(data);
        }
    }

    function handleSearch(input) {
        setSearch(input);
    }
    return (
        <>
            <ContentHeader>
                <h2>{Title}</h2>

                <div>
                    <InputContainer>
                        <div>
                            <MdSearch size={20} color="#666" />
                            {/* Encomendas */}
                            {searchItem === 'orders' && (
                                <input
                                    placeholder="Pesquisar"
                                    onChange={e => handleSearch(e.target.value)}
                                    onKeyPress={e => handleSearchOrders(e.key)}
                                />
                            )}

                            {/* Entregadores */}
                            {searchItem === 'couries' && (
                                <input
                                    placeholder="Pesquisar"
                                    onChange={e => handleSearch(e.target.value)}
                                    onKeyPress={e => handleSearchCouries(e.key)}
                                />
                            )}

                            {/* Destinatários */}
                            {searchItem === 'recipients' && (
                                <input
                                    placeholder="Pesquisar"
                                    onChange={e => handleSearch(e.target.value)}
                                    onKeyPress={e =>
                                        handleSearchProblems(e.key)
                                    }
                                />
                            )}

                            {/* Problemas */}
                            {searchItem === 'problems' && (
                                <input
                                    placeholder="Pesquisar"
                                    onChange={e => handleSearch(e.target.value)}
                                    onKeyPress={e =>
                                        handleSearchProblems(e.key)
                                    }
                                />
                            )}
                        </div>
                    </InputContainer>

                    {noAdd ? (
                        undefined
                    ) : (
                        <ButtonContainer to={to}>
                            <MdAdd size={25} color="#fff" />
                            <span>Cadastrar</span>
                        </ButtonContainer>
                    )}
                </div>
            </ContentHeader>
        </>
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
