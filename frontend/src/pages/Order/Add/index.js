import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import ContentContainer from '~/components/ContentContainer';
import EditBar from '~/components/EditBar';
import Input from '~/components/InputForm';
import Select from '~/components/Select';

import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

export default function AddOrder() {
    const formRef = useRef(null);

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                recipient: Yup.string().required('Campo obrigatório'),
                deliveryman: Yup.string().required('Campo obrigatório'),
                product: Yup.string().required('Campo obrigatório'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post(`/orders/`, {
                product: data.product,
                recipient_id: data.recipient,
                deliveryman_id: data.deliveryman,
            });
            toast.success('Encomenda cadastrada com sucesso!');
            formRef.current.setErrors({});
            history.push('/order');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                    toast.error(error.message);
                });

                formRef.current.setErrors(errorMessages);
            } else {
                toast.error('Algo deu errado!');
            }
        }
    }
    return (
        <ContentContainer>
            <>
                <EditBar Title="Cadastrar Encomenda" form="add" back="/order" />

                <Container>
                    <Form ref={formRef} onSubmit={handleSubmit} id="add">
                        <div className="select-container">
                            <span>Encomenda</span>
                            <Select name="recipient" optionType="recipients" />
                        </div>

                        <div className="select-container">
                            <span>Entregador</span>
                            <Select name="deliveryman" optionType="couriers" />
                        </div>

                        <div className="product-container">
                            <span>Produto</span>
                            <Input name="product" type="text" />
                        </div>
                    </Form>
                </Container>
            </>
        </ContentContainer>
    );
}
