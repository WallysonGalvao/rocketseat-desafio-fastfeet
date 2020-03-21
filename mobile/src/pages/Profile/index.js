import React from 'react';
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
  const deliveryman = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      {/* <Avatar
        source={{
          uri: deliveryman.avatar ? (
            deliveryman.avatar.url
          ) : (
            <Icon name="perm_identity" />
          ),
        }}
      /> */}

      <Avatar
        source={{
          uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
        }}
      />

      <TextContainer>
        <SmallText>Nome completo</SmallText>
        <BoldText>{deliveryman?.name}</BoldText>
      </TextContainer>

      <TextContainer>
        <SmallText>E-mail</SmallText>
        <BoldText>{deliveryman?.email}</BoldText>
      </TextContainer>

      <TextContainer>
        <SmallText>Dada de cadastro</SmallText>
        <BoldText>{deliveryman?.created_at}</BoldText>
      </TextContainer>

      <LogOut onPress={() => handleLogout()}>
        <TextButton>Log Out</TextButton>
      </LogOut>
    </Container>
  );
}
