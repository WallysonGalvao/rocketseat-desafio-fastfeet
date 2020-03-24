import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import ContentContainer from '~/components/ContentContainer';
import EditBar from '~/components/EditBar';
import FileInput from '~/components/FileInput';
import Input from '~/components/InputForm';

import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

export default function AddDeliveryman() {
    const formRef = useRef(null);

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Campo obrigatório'),
                avatar_id: Yup.string(),
                email: Yup.string().required('Campo obrigatório'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            const dataFile = new FormData();
            dataFile.append('file', data.avatar);

            const responseFile = data.avatar
                ? await api.post('files', dataFile)
                : null;

            const { name, email } = data;
            const avatarId = responseFile?.data?.id;

            await api.post(`/deliveryman`, {
                name,
                email,
                avatar_id: avatarId,
            });
            await toast.success('Entregador cadastrado com sucesso!');
            formRef.current.setErrors({});
            history.push('/deliveryman');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                    toast.error(error.message);
                });

                formRef.current.setErrors(errorMessages);
            } else if (err.response.status === 400) {
                toast.error('Entregador já cadastrado!');
            } else {
                toast.error('Algo deu errado!');
            }
        }
    }

    return (
        <ContentContainer>
            <>
                <EditBar
                    Title="Cadastrar Entregador"
                    form="add"
                    back="/deliveryman"
                />

                <Container>
                    <Form ref={formRef} onSubmit={handleSubmit} id="add">
                        <FileInput name="avatar" />

                        <div className="product-container">
                            <span>Nome</span>
                            <Input name="name" type="text" />
                        </div>
                        <div className="product-container">
                            <span>E-mail</span>
                            <Input name="email" type="email" />
                        </div>
                    </Form>
                </Container>
            </>
        </ContentContainer>
    );
}
