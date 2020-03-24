import React, { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import { MdInsertPhoto } from 'react-icons/md';

import ActionsMenu from '~/components/ActionsMenu';
import ContentContainer from '~/components/ContentContainer';
import MenuBar from '~/components/MenuBar';
import PageButton from '~/components/PageButton';
import api from '~/services/api';

import { TableContainer } from './styles';

export default function ListOrder() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const status = {
        delivered: {
            title: 'Entregue',
            background: '#dff0df',
            textColor: '#2ca42b',
        },
        pending: {
            title: 'Pendente',
            background: '#dff0df',
            textColor: '#C1BC35',
        },
        withdrawn: {
            title: 'Retirada',
            background: '#BAD2FF',
            textColor: '#4D85EE',
        },
        canceled: {
            title: 'Cancelada',
            background: '#FAB0B0',
            textColor: '#DE3B3B',
        },
    };

    async function loadOrders() {
        const { data } = await api.get('/orders', {
            params: {
                page,
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

        setOrders(addStatus);
    }
    useEffect(() => {
        loadOrders();
    }, [page]);

    return (
        <ContentContainer>
            <>
                <MenuBar
                    setLoad={setOrders}
                    searchItem="order"
                    status={status}
                    Title="Gerenciar Encomendas"
                    to="/order/add"
                />

                <TableContainer>
                    <div className="divTable">
                        <div className="divTableRow title">
                            <div className="divTableCell title">ID</div>
                            <div className="divTableCell title">
                                Destinatário
                            </div>
                            <div className="divTableCell title">Entregador</div>
                            <div className="divTableCell title">Estado</div>
                            <div className="divTableCell title">Cidade</div>
                            <div className="divTableCell title">Status</div>
                            <div className="divTableCell title">Ações</div>
                        </div>

                        {orders.map(order => {
                            const { avatar } = order.deliveryman;
                            return (
                                <div
                                    className="divTableRow content"
                                    key={order.id}
                                >
                                    <div className="divTableCell">
                                        #{order.id}
                                    </div>
                                    <div className="divTableCell">
                                        {order.recipient.name}
                                    </div>

                                    <div className="divTableCell deliveryman">
                                        {avatar ? (
                                            <img
                                                src={avatar.url}
                                                alt={order.deliveryman.name}
                                            />
                                        ) : (
                                            <MdInsertPhoto
                                                size={30}
                                                color="#666"
                                            />
                                        )}

                                        <span>{order.deliveryman.name}</span>
                                    </div>
                                    <div className="divTableCell">
                                        {order.recipient.country}
                                    </div>
                                    <div className="divTableCell">
                                        {order.recipient.city}
                                    </div>
                                    <div
                                        className="divTableCell status"
                                        style={{
                                            background: order.status.background,
                                        }}
                                    >
                                        <FaCircle
                                            size={10}
                                            color={order.status.textColor}
                                        />
                                        <span
                                            style={{
                                                color: order.status.textColor,
                                            }}
                                        >
                                            {order.status.title}
                                        </span>
                                    </div>
                                    <div className="divTableCell">
                                        <ActionsMenu
                                            moldal
                                            page="order"
                                            id={order.id}
                                            canceled={order.canceled_at}
                                            reload={loadOrders}
                                            content={order}
                                            moldalType="order"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </TableContainer>
                <PageButton
                    setPage={setPage}
                    page={page}
                    length={orders.length}
                />
            </>
        </ContentContainer>
    );
}
