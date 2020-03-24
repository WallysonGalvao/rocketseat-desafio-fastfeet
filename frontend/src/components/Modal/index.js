import React from 'react';
import ReactModal from 'react-modal';

import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Modal({
    showModal,
    setShowModal,
    content,
    moldalType,
}) {
    return (
        <ReactModal
            isOpen={showModal}
            shouldCloseOnEsc
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            style={{
                content: {
                    top: '25%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    width: '450px',
                    transform: 'translate(-50%, -10%)',
                },
            }}
        >
            <Container>
                {moldalType === 'problem' ? (
                    <>
                        <h2>Visualizar Problema</h2>
                        <p>{content.description}</p>
                    </>
                ) : (
                    <>
                        <h3>Informação da encomenda</h3>
                        <p>{`${content.recipient.street} - ${content.recipient.number}`}</p>
                        <p>{`${content.recipient.city} - ${content.recipient.country}`}</p>
                        <p>{content.recipient.postcode}</p>
                        <div />
                        <h3>Datas</h3>

                        <p>
                            Retiradas:
                            <span>
                                {content.start_date
                                    ? format(
                                          parseISO(content.start_date),
                                          'dd/MM/yyyy'
                                      )
                                    : 'Pronto para retirada'}
                            </span>
                        </p>

                        <p>
                            Entregues:
                            <span>
                                {content.end_date
                                    ? format(
                                          parseISO(content.end_date),
                                          'dd/MM/yyyy'
                                      )
                                    : 'Encomendas não entregue'}
                            </span>
                        </p>
                        <div />

                        {content.signature ? (
                            <>
                                <h3>Assinatura do destinatário</h3>
                                <img
                                    src={content.signature.url}
                                    alt={content.id}
                                />
                            </>
                        ) : (
                            undefined
                        )}
                    </>
                )}
            </Container>
        </ReactModal>
    );
}

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    moldalType: PropTypes.string.isRequired,
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
