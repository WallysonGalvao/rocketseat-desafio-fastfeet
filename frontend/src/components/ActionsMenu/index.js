import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEllipsisH, FaEye, FaPen } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import api from '~/services/api';

import {
    Container,
    NotificationList,
    Notification,
    EditButton,
} from './styles';

export default function ActionsMenu({
    id,
    canceled,
    reload,
    page,
    content,
    moldal,
    moldalType,
}) {
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    async function handleDeleteOrder(_id) {
        if (window.confirm('Deseja cancelar este pedido?') === true) {
            await api.delete(`/problem/${_id}/cancel-delivery`);
            reload();
            toast.success('Pedido excluído com sucesso!');
            handleToggleVisible();
        }
    }

    async function handleDeleteCouries(_id) {
        if (window.confirm('Deseja excluir este entregador?') === true) {
            await api.delete(`/deliveryman/${_id}`);
            reload();
            toast.success('Entregador excluído com sucesso!');
            handleToggleVisible();
        }
    }

    async function handleDeleteRecipient(_id) {
        if (window.confirm('Deseja excluir esta encomenda?') === true) {
            await api.delete(`/recipients/${_id}`);
            reload();
            toast.success('Encomenda excluída com sucesso!');
            handleToggleVisible();
        }
    }
    function handleOnClick() {
        setShowModal(true);
    }
    return (
        <Container>
            <FaEllipsisH color="#999" onClick={handleToggleVisible} />

            {/* Encomendas */}
            {page === 'orders' && (
                <NotificationList visible={visible}>
                    <Notification>
                        <button type="button" onClick={() => handleOnClick()}>
                            <FaEye color="#8E5BE8" />
                            <span>Visualizar</span>
                        </button>
                        <EditButton to={`/orders/edit/${id}`}>
                            <FaPen color="#4D85EE" />
                            <span>Editar</span>
                        </EditButton>
                        {canceled ? null : (
                            <button
                                type="button"
                                onClick={() => handleDeleteOrder(id)}
                            >
                                <MdDeleteForever color="#DE3B3B" />
                                <span>Deletar</span>
                            </button>
                        )}
                    </Notification>
                </NotificationList>
            )}

            {/* Entregadores */}
            {page === 'couries' && (
                <NotificationList visible={visible}>
                    <Notification>
                        <EditButton to={`/couriers/edit/${id}`}>
                            <FaPen color="#4D85EE" />
                            <span>Editar</span>
                        </EditButton>
                        {canceled ? null : (
                            <button
                                type="button"
                                onClick={() => handleDeleteCouries(id)}
                            >
                                <MdDeleteForever color="#DE3B3B" />
                                <span>Deletar</span>
                            </button>
                        )}
                    </Notification>
                </NotificationList>
            )}

            {/* Destinatários */}
            {page === 'recipients' && (
                <NotificationList visible={visible}>
                    <Notification>
                        <EditButton to={`/recipients/edit/${id}`}>
                            <FaPen color="#4D85EE" />
                            <span>Editar</span>
                        </EditButton>
                        {canceled ? null : (
                            <button
                                type="button"
                                onClick={() => handleDeleteRecipient(id)}
                            >
                                <MdDeleteForever color="#DE3B3B" />
                                <span>Deletar</span>
                            </button>
                        )}
                    </Notification>
                </NotificationList>
            )}

            {/* Problemas */}
            {page === 'problems' && (
                <NotificationList visible={visible}>
                    <Notification>
                        <button type="button" onClick={() => handleOnClick()}>
                            <FaEye color="#8E5BE8" />
                            <span>Visualizar</span>
                        </button>
                        {canceled ? null : (
                            <button
                                type="button"
                                onClick={() => handleDeleteOrder(id)}
                            >
                                <MdDeleteForever color="#DE3B3B" />
                                <span>Cancelar</span>
                            </button>
                        )}
                    </Notification>
                </NotificationList>
            )}

            {moldal ? (
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    content={content}
                    moldalType={moldalType}
                />
            ) : (
                undefined
            )}
        </Container>
    );
}

ActionsMenu.propTypes = {
    moldal: PropTypes.bool.isRequired,
    moldalType: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    page: PropTypes.string.isRequired,
    canceled: PropTypes.string,
    reload: PropTypes.func.isRequired,
    content: PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.shape({
            name: PropTypes.string,
            street: PropTypes.string,
            number: PropTypes.string,
            city: PropTypes.string,
            postcode: PropTypes.string,
            country: PropTypes.string,
        }),
        signature: PropTypes.shape({
            url: PropTypes.string,
        }),
    }).isRequired,
};

ActionsMenu.defaultProps = {
    canceled: '',
};
