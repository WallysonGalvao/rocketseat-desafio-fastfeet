import {Alert} from 'react-native';
import {LOCALHOST} from 'react-native-dotenv';

import {takeLatest, call, put, all} from 'redux-saga/effects';

import {parseISO, format} from 'date-fns';

import api from '~/services/api';

import {signInSuccess, signFailure} from './actions';

export function* singIn({payload}) {
  try {
    const {sign: id} = payload.id;
    const {data} = yield call(api.get, `deliveryman/${id}`);
    let avatar;
    if (__DEV__ && data?.avatar) {
      avatar = data.avatar.url.replace('localhost', LOCALHOST);
    } else if (data?.avatar) {
      avatar = data.avatar.url;
    } else {
      avatar = 'https://api.adorable.io/avatars/50/abott@adorable.png';
    }
    yield put(
      signInSuccess(id, {
        name: data.name,
        email: data.email,
        created_at: format(parseISO(data.created_at), 'dd/MM/yyyy'),
        avatar,
      })
    );
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);
