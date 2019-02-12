import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import contentSagas from './Content';

export default function* rootSaga(getState) {
  yield all([authSagas(), contentSagas()]);
}
