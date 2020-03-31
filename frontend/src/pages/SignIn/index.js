import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '~/assets/fastfeet-logo@2x.png';
import Input from '~/components/InputForm';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    async function handleSubmit(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Necessário um e-mail válido')
                    .required('Você precisa digitar seu email'),
                password: Yup.string().required('Senha requerida'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            dispatch(signInRequest(data.email, data.password));
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                });

                formRef.current.setErrors(errorMessages);
            }
            reset();
        }
    }
    return (
        <>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <img src={logo} alt="Fastfeet" />

                <div>
                    <span>Your E-mail</span>
                    <Input
                        type="text"
                        name="email"
                        placeholder="email@email.com"
                    />
                </div>

                <div htmlFor="password">
                    <span>Your Password</span>
                    <Input
                        type="password"
                        name="password"
                        placeholder="*****"
                    />
                </div>

                <button type="submit">
                    {loading ? 'Carregando...' : 'Entrar no sistema'}
                </button>
            </Form>
        </>
    );
}
