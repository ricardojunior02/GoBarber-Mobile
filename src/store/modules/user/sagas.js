import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '~/services/api';

import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, email, ...rest} = payload.data;

    // eslint-disable-next-line prefer-object-spread
    const profile = Object.assign({name, email}, rest.oldPassword ? rest : {});

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro ao atualizar perfil!', 'Verifique seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
