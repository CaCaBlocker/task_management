import { combineReducers } from 'redux';
import task from './task';
import custom from './custom';

const applicationReducers = {
  task,
  custom
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
