import {
  put, call, takeLatest
} from 'redux-saga/effects';
import Types from '../actions/actionTypes';
import api from '../api';
import Messages from '../theme/Messages'

const {
  getCrypto,
} = api;

function* GetCrypto(action) {
  yield put({ type: Types.GET_CRYPTO_REQUEST });
  try {
    const res = yield call(getCrypto);
    if (res["Time Series (Digital Currency Daily)"]) {
      const keys = Object.keys(res["Time Series (Digital Currency Daily)"]);
      const date = keys[0];
      const price = Number(res["Time Series (Digital Currency Daily)"][date]["4b. close (USD)"]).toFixed(2);
      yield put({ type: Types.GET_CRYPTO_SUCCESS, payload: { date, price } });
    } else {
      yield put({ type: Types.GET_CRYPTO_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.GET_CRYPTO_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}


export default [
  takeLatest(Types.GET_CRYPTO, GetCrypto),
];
