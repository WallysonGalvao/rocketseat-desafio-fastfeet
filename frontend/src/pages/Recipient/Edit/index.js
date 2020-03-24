import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import ContentContainer from '~/components/ContentContainer';
import EditBar from '~/components/EditBar';
import Input from '~/components/InputForm';

import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

export default function EditRecipient() {
    const { id } = useParams();
    const formRef = useRef(null);

    useMemo(() => {
        async function getRecipient() {
            const { data } = await api.get(`recipients/${id}`);
            formRef.current.setData(data);
        }
        getRecipient();
    }, [id]);

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Campo obrigatório'),
                street: Yup.string().required('Campo obrigatório'),
                number: Yup.string().required('Campo obrigatório'),
                city: Yup.string().required('Campo obrigatório'),
                postcode: Yup.string().required('Campo obrigatório'),
                country: Yup.string().required('Campo obrigatório'),
                complement: Yup.string(),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.put(`/recipients/${id}`, data);

            toast.success('Destinatário editado com sucesso!');
            formRef.current.setErrors({});
            history.push('/recipient');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                    toast.error(error.message);
                });

                formRef.current.setErrors(errorMessages);
            } else if (err.response.status === 400) {
                toast.error('Destinatário já cadastrado!');
            } else {
                toast.error('Algo deu errado!');
            }
        }
    }
    return (
        <ContentContainer>
            <>
                <EditBar
                    Title="Editar Destinatário"
                    form="edit"
                    back="/recipient"
                />

                <Container>
                    <Form ref={formRef} onSubmit={handleSubmit} id="edit">
                        <div className="input-container">
                            <span>Nome</span>
                            <Input name="name" type="text" />
                        </div>

                        <div className="wrapp-address">
                            <div className="address-input">
                                <div className="input-container">
                                    <span>Rua</span>
                                    <Input name="street" type="text" />
                                </div>

                                <div className="input-container">
                                    <span>Número</span>
                                    <Input name="number" type="text" />
                                </div>

                                <div className="input-container">
                                    <span>Complemento</span>
                                    <Input name="complement" type="text" />
                                </div>
                            </div>

                            <div className="address-input">
                                <div className="input-container">
                                    <span>Cidade</span>
                                    <Input name="city" type="text" />
                                </div>

                                <div className="input-container">
                                    <span>Estado</span>
                                    <Input name="country" type="text" />
                                </div>

                                <div className="input-container">
                                    <span>CEP</span>
                                    <Input name="postcode" type="text" />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Container>
            </>
        </ContentContainer>
    );
}
