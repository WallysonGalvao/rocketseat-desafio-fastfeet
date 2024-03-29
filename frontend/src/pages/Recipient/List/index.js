import React, { useState, useEffect } from 'react';

import ActionsMenu from '~/components/ActionsMenu';
import ContentContainer from '~/components/ContentContainer';
import MenuBar from '~/components/MenuBar';
import PageButton from '~/components/PageButton';

import api from '~/services/api';
import { cpfMask } from '../../../utils/mask';

import { TableContainer } from './styles';

export default function ListRecipient() {
    const [page, setPage] = useState(1);
    const [recipients, setRecipients] = useState([]);

    async function getRecipients() {
        const { data } = await api.get('recipients', {
            params: {
                page,
            },
        });
        data.forEach(el => (el.postcode = cpfMask(el.postcode)));
        setRecipients(data);
    }

    useEffect(() => {
        getRecipients();
    }, [page]);
    return (
        <ContentContainer>
            <>
                <MenuBar
                    Title="Gerenciar Destinatários"
                    searchItem="recipient"
                    setLoad={setRecipients}
                    to="/recipient/add"
                />

                <TableContainer>
                    <div className="divTable">
                        <div className="divTableRow title">
                            <div className="divTableCell title">ID</div>
                            <div className="divTableCell title">Nome</div>
                            <div className="divTableCell title">Endereço</div>
                            <div className="divTableCell title">Ações</div>
                        </div>

                        {recipients.map(item => (
                            <div className="divTableRow content" key={item.id}>
                                <div className="divTableCell">#{item.id}</div>
                                <div className="divTableCell">{item.name}</div>
                                <div className="divTableCell">
                                    {`${item.number}, ${item.street} / ${item.postcode} - ${item.city} / ${item.country}`}
                                </div>
                                <div className="divTableCell status ">
                                    <ActionsMenu
                                        page="recipient"
                                        id={item.id}
                                        reload={getRecipients}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </TableContainer>
                <PageButton
                    setPage={setPage}
                    page={page}
                    length={recipients.length}
                />
            </>
        </ContentContainer>
    );
}
