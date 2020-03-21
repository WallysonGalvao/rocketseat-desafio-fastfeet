import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, TextCenter} from './styles';

export default function NoProblem() {
  return (
    <Container>
      <Icon name="check-circle" color="#666" size={30} />
      <TextCenter>Esta entrega não teve problemas</TextCenter>
    </Container>
  );
}
