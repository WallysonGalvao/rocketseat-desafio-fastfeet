import React from 'react';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import {colors} from '~/components/colors';
import {Container, WrappContainer, InfoContainer} from '~/components/styles';
import api from '~/services/api';
import formatDate from '~/utils/FormatDate';

import {
  InfoText,
  AlignContainer,
  InfoTextMed,
  InfoTextSmall,
  Bottons,
  ButtonText,
  DateContainer,
  ButtonsContainer,
} from './styles';

export default function Details({route}) {
  const {id} = useSelector(state => state.auth);
  const data = route.params.infos;
  const navigation = useNavigation();

  const delivered = data.end_date ? 'Entregue' : null;
  const Pending = data?.start_date ? 'A Caminho' : 'Pendente';

  async function handleCollect() {
    try {
      await api.put(`/deliveryman/${id}/deliveries`, {
        start_date: new Date(),
        order_id: data.id,
      });
      Alert.alert('Encomenda coletada');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Withdrawal available between 08:00 and 18:00');
    }
  }

  return (
    <Background>
      <Container>
        <WrappContainer>
          <InfoContainer style={{marginBottom: 5}}>
            <AlignContainer style={{flexDirection: 'row'}}>
              <Icon name="local-shipping" color={colors.primary} size={20} />
              <InfoText>Informacões da entrega</InfoText>
            </AlignContainer>

            <AlignContainer>
              <InfoTextMed>Destinatário</InfoTextMed>
              <InfoTextSmall>{data?.recipient?.name}</InfoTextSmall>
            </AlignContainer>

            <AlignContainer>
              <InfoTextMed>Endereço de entrega</InfoTextMed>
              <InfoTextSmall>
                {`${data?.recipient?.number}, ${data?.recipient?.street} - ${data?.recipient?.city} / ${data?.recipient?.country}`}
              </InfoTextSmall>
            </AlignContainer>

            <AlignContainer>
              <InfoTextMed>Produto</InfoTextMed>
              <InfoTextSmall>{data?.product}</InfoTextSmall>
            </AlignContainer>
          </InfoContainer>

          <InfoContainer style={{marginBottom: 5}}>
            <AlignContainer style={{flexDirection: 'row'}}>
              <Icon name="event-note" color={colors.primary} size={20} />
              <InfoText>Situação da entrega</InfoText>
            </AlignContainer>

            <AlignContainer>
              <InfoTextMed>Status</InfoTextMed>
              <InfoTextSmall>
                {delivered !== null ? delivered : Pending}
              </InfoTextSmall>
            </AlignContainer>

            <DateContainer>
              <View>
                <InfoTextMed>Data de retirada</InfoTextMed>
                <InfoTextSmall>
                  {data?.start_date
                    ? formatDate(data?.start_date)
                    : 'Aguardando retirada'}
                </InfoTextSmall>
              </View>
              <View>
                <InfoTextMed>Data de entrega</InfoTextMed>
                <InfoTextSmall>
                  {data?.end_date ? formatDate(data.end_date) : '--/--/--'}
                </InfoTextSmall>
              </View>
            </DateContainer>
          </InfoContainer>

          <ButtonsContainer>
            {data.start_date ? (
              undefined
            ) : (
              <Bottons onPress={handleCollect}>
                <Icon name="assignment-turned-in" size={25} color="#0F4C81" />
                <ButtonText> Coletar {'\n'} Encomenda</ButtonText>
              </Bottons>
            )}

            <Bottons
              onPress={() =>
                navigation.navigate('AddProblem', {infos: data.id})
              }>
              <Icon name="highlight-off" size={25} color="#E74040" />
              <ButtonText>Informar {'\n'} Problema</ButtonText>
            </Bottons>

            <Bottons
              onPress={() => navigation.navigate('ViewProblem', {infos: data})}>
              <Icon name="info-outline" size={25} color="#E7BA40" />
              <ButtonText>Visualizar {'\n'} Problemas</ButtonText>
            </Bottons>

            {!data.end_date ? (
              <Bottons
                onPress={() =>
                  navigation.navigate('ConfirmDelivery', {infos: data})
                }>
                <Icon name="check-circle" size={25} color={colors.primary} />
                <ButtonText>Confirmar {'\n'} Encomenda</ButtonText>
              </Bottons>
            ) : (
              undefined
            )}
          </ButtonsContainer>
        </WrappContainer>
      </Container>
    </Background>
  );
}

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      infos: PropTypes.shape({
        id: PropTypes.number,
        deliveryman_id: PropTypes.number,
        recipient_id: PropTypes.number,
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.shape({
          name: PropTypes.string,
          street: PropTypes.string,
          number: PropTypes.string,
          country: PropTypes.string,
          city: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
