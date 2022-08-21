import {
  put, call, takeLatest, delay 
} from 'redux-saga/effects';
import Types from '../actions/actionTypes';
import api from '../api';
import Messages from '../theme/Messages'


function* CreateTask(action) {
  yield put({ type: Types.CREATE_TASK_REQUEST });
  try {
    yield delay(2000);
    yield put({ type: Types.CREATE_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: Types.CREATE_TASK_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* UpdateTask(action) {
  yield put({ type: Types.UPDATE_TASK_REQUEST });
  try {
    yield delay(2000);
    yield put({ type: Types.UPDATE_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: Types.UPDATE_TASK_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* DeleteTask(action) {
  yield put({ type: Types.DELETE_TASK_REQUEST });
  try {
    yield delay(2000);
    yield put({ type: Types.DELETE_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: Types.DELETE_TASK_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* CompleteTask(action) {
  yield put({ type: Types.COMPLETE_TASK_REQUEST });
  try {
    yield delay(2000);
    yield put({ type: Types.COMPLETE_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: Types.COMPLETE_TASK_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* SearchTask(action) {
  yield put({ type: Types.SEARCH_TASK_REQUEST });
  try {
    yield delay(2000);
    yield put({ type: Types.SEARCH_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: Types.SEARCH_TASK_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

export default [
  takeLatest(Types.CREATE_TASK, CreateTask),
  takeLatest(Types.COMPLETE_TASK, CompleteTask),
  takeLatest(Types.UPDATE_TASK, UpdateTask),
  takeLatest(Types.DELETE_TASK, DeleteTask),
  takeLatest(Types.SEARCH_TASK, SearchTask),
];
