import {Alert} from 'react-native';

import {takeLatest, call, put, all} from 'redux-saga/effects';

import {parseISO, format} from 'date-fns';

import api from '~/services/api';

import {signInSuccess, signFailure} from './actions';

export function* singIn({payload}) {
  try {
    const {sign: id} = payload.id;
    const {data} = yield call(api.get, `deliveryman/${id}`);
    yield put(
      signInSuccess(id, {
        name: data.name,
        email: data.email,
        created_at: format(parseISO(data.created_at), 'dd/MM/yyyy'),
        avatar: data.avatar,
      }),
    );
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);
