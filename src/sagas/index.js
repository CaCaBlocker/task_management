import { all } from 'redux-saga/effects';
import taskSagas from './task';
import customSagas from './custom';

export default function* sagas() {
  yield all([
    ...taskSagas,
    ...customSagas
  ]);
}


