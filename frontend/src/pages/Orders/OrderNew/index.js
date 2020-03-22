import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import ContentContainer from '~/components/ContentContainer';
import EditBar from '~/components/EditBar';
import Input from '~/components/InputForm';
import Select from '~/components/Select';
import api from '~/services/api';

import { Container } from './styles';

export default function OrderEdit() {
    const formRef = useRef(null);

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                recipient: Yup.string().required(),
                deliveryman: Yup.string().required(),
                product: Yup.string().required(),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            const { product } = data;

            await api.post(`/orders/`, {
                product,
                recipient_id: data.recipient,
                deliveryman_id: data.deliveryman,
            });
            toast.success('Encomenda atualizada com sucesso!');
        } catch (err) {
            toast.error('Algo deu errado!');
        }
    }
    return (
        <ContentContainer>
            <>
                <EditBar
                    Title="Cadastrar Encomenda"
                    form="editOrder"
                    back="/orders"
                />

                <Container>
                    <Form ref={formRef} onSubmit={handleSubmit} id="editOrder">
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
