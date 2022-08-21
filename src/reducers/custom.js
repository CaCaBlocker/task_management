import { createReducer } from 'reduxsauce';
import Types from '../actions/actionTypes';
import { Status } from '../constants';

export const initialState = {
  cryptoDate: 0,
  cryptoPrice: 0,
  errorMessage: '',
  getCryptoStatus: Status.NONE
};

const getCryptoRequest = (state) => ({
  ...state,
  getCryptoStatus: Status.REQUEST,
});

const getCryptoSuccess = (state, action) => ({
  ...state,
  cryptoDate: action.payload.date,
  cryptoPrice: action.payload.price,
  getCryptoStatus: Status.SUCCESS,
});

const getCryptoFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  getCryptoStatus: Status.FAILURE,
});

const actionHandlers = {
  [Types.GET_CRYPTO_REQUEST]: getCryptoRequest,
  [Types.GET_CRYPTO_SUCCESS]: getCryptoSuccess,
  [Types.GET_CRYPTO_FAILURE]: getCryptoFailure
};

export default createReducer(initialState, actionHandlers);
