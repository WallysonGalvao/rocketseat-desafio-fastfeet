import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';

import {signOut} from '~/store/modules/auth/actions';

import {
  Container,
  SmallText,
  BoldText,
  Avatar,
  TextContainer,
  TextButton,
  LogOut,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Avatar
        source={{
          uri: profile?.avatar,
        }}
      />

      <TextContainer>
        <SmallText>Nome completo</SmallText>
        <BoldText>{profile?.name}</BoldText>
      </TextContainer>

      <TextContainer>
        <SmallText>E-mail</SmallText>
        <BoldText>{profile?.email}</BoldText>
      </TextContainer>

      <TextContainer>
        <SmallText>Dada de cadastro</SmallText>
        <BoldText>{profile?.created_at}</BoldText>
      </TextContainer>

      <LogOut onPress={() => handleLogout()}>
        <TextButton>Logout</TextButton>
      </LogOut>
    </Container>
  );
}
