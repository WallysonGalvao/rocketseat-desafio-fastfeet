import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

import {colors} from '~/components/colors';
import formatDate from '~/utils/FormatDate';

import {
  Container,
  DeliveryName,
  SmallText,
  ContainerAlign,
  MarkContainer,
  Marker,
  Line,
  StatusContainer,
  DetailsContainer,
  DetailText,
  TextContainer,
} from './styles';

export default function Delivery({data}) {
  console.tron.log(data);
  const navigation = useNavigation();
  return (
    <Container>
      <ContainerAlign>
        <Icon name="local-shipping" color={colors.primary} size={20} />
        <DeliveryName>Encomenda {data.id}</DeliveryName>
      </ContainerAlign>

      <MarkContainer style={{alignSelf: 'center'}}>
        <Marker marked />
        <Line />
        <Marker marked={!!data.start_date} />
        <Line />
        <Marker marked={!!data.end_date} />
      </MarkContainer>

      <StatusContainer>
        <View style={{alignItems: 'center'}}>
          <SmallText>Aguardando</SmallText>
          <SmallText>retirada</SmallText>
        </View>

        <SmallText>Retirada</SmallText>
        <SmallText>Entregue</SmallText>
      </StatusContainer>

      <DetailsContainer>
        <TextContainer>
          <SmallText>Data</SmallText>
          <DetailText>
            {data.start_date
              ? formatDate(data.start_date)
              : 'Pronta p/ retirada'}
          </DetailText>
        </TextContainer>

        <TextContainer>
          <SmallText>Cidade</SmallText>
          <DetailText>{data.recipient.city.substring(0, 10)}</DetailText>
        </TextContainer>

        <TextContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', {infos: data})}>
            <DetailText style={{color: colors.primary, fontWeight: 'bold'}}>
              Detalhes
            </DetailText>
          </TouchableOpacity>
        </TextContainer>
      </DetailsContainer>
    </Container>
  );
}

Delivery.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    deliveryman_id: PropTypes.number,
    recipient_id: PropTypes.number,
    canceled_at: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
};
