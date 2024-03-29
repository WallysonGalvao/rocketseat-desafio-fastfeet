import React, { useState, useEffect } from 'react';

import ActionsMenu from '~/components/ActionsMenu';
import ContentContainer from '~/components/ContentContainer';
import MenuBar from '~/components/MenuBar';
import PageButton from '~/components/PageButton';
import api from '~/services/api';

import { TableContainer } from './styles';

export default function Problem() {
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);

    async function loadProblems() {
        const { data } = await api.get('/orders/problems/list', {
            params: {
                page,
            },
        });
        setProblems(data);
    }

    useEffect(() => {
        loadProblems();
    }, [page]);
    return (
        <ContentContainer>
            <>
                <MenuBar
                    Title="Problemas na entrega"
                    searchItem="problem"
                    setLoad={setProblems}
                    to="orders/problems/add"
                    noAdd
                />

                <TableContainer>
                    <div className="divTable">
                        <div className="divTableRow title">
                            <div className="divTableCell title">Encomenda</div>
                            <div className="divTableCell title">Problema</div>
                            <div className="divTableCell title">Ações</div>
                        </div>

                        {problems.map(item => (
                            <div className="divTableRow content" key={item.id}>
                                <div className="divTableCell">
                                    #{item.order_id}
                                </div>
                                <div className="divTableCell">
                                    {item.description}
                                </div>
                                <div className="divTableCell status ">
                                    <ActionsMenu
                                        content={item}
                                        page="problem"
                                        id={item.order_id}
                                        reload={loadProblems}
                                        moldalType="problem"
                                        moldal
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </TableContainer>
                <PageButton
                    setPage={setPage}
                    page={page}
                    length={problems.length}
                />
            </>
        </ContentContainer>
    );
}
