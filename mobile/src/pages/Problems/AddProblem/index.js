import React, {useRef} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import ProblemInput from '~/components/ProblemInput';
import {Container, WrappContainer} from '~/components/styles';
import api from '~/services/api';

import {SubmitButton, TextButton} from './styles';

export default function AddProblem({route}) {
  const navigation = useNavigation();
  const id = route.params.infos;
  const formRef = useRef(null);

  async function handleSubmit(data) {
    await api.post('/orders/problems', {
      description: data.description,
      order_id: id,
    });
    Alert.alert('Problema enviado!');
    navigation.navigate('Dashboard');
  }
  return (
    <Background>
      <Container>
        <WrappContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <ProblemInput
              name="description"
              placeholder="Inclua aqui o problema que ocorreu na entrega."
            />

            <SubmitButton onPress={() => formRef.current.submitForm()}>
              <TextButton>Enviar</TextButton>
            </SubmitButton>
          </Form>
        </WrappContainer>
      </Container>
    </Background>
  );
}

AddProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      infos: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
};
