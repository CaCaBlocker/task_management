import { createReducer } from 'reduxsauce';
import Types from '../actions/actionTypes';
import { Status } from '../constants';

export const initialState = {
  errorMessage: '',
  tasks: [
    {
      name: "Ace",
      description: "https://www.alphavantage.co/",
      complete: false
    },
    {
      name: "Box",
      description: "https://www.alphavantage.co/",
      complete: true
    },
    {
      name: "Cex",
      description: "https://www.alphavantage.co/",
      complete: false
    },
    {
      name: "Dex",
      description: "https://www.alphavantage.co/",
      complete: true
    },
    {
      name: "Escape",
      description: "https://www.alphavantage.co/",
      complete: false
    },
    {
      name: "Forex",
      description: "https://www.alphavantage.co/",
      complete: true
    },
    {
      name: "Germ",
      description: "https://www.alphavantage.co/",
      complete: false
    },
    {
      name: "Hello",
      description: "https://www.alphavantage.co/",
      complete: true
    },
  ],
  searchTasks: [],
  createTaskStatus: Status.NONE,
  updateTaskStatus: Status.NONE,
  deleteTaskStatus: Status.NONE,
  completeTaskStatus: Status.NONE,
  searchTaskStatus: Status.NONE,
};

const createTaskRequest = (state) => ({
  ...state,
  createTaskStatus: Status.REQUEST,
});

const createTaskSuccess = (state, action) => ({
  ...state,
  tasks: [...state.tasks, {...action.payload}],
  createTaskStatus: Status.SUCCESS,
});

const createTaskFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  createTaskStatus: Status.FAILURE,
});

const updateTaskRequest = (state) => ({
  ...state,
  updateTaskStatus: Status.REQUEST,
});

const updateTaskSuccess = (state, action) => ({
  ...state,
  tasks:  [...(state.tasks.slice(0, action.payload.index)), {...(state.tasks[action.payload.index]), name: action.payload.name, description: action.payload.description}, ...(state.tasks.slice(action.payload.index + 1, state.tasks.length))],
  updateTaskStatus: Status.SUCCESS,
});

const updateTaskFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  updateTaskStatus: Status.FAILURE,
});

const deleteTaskRequest = (state) => ({
  ...state,
  deleteTaskStatus: Status.REQUEST,
});

const deleteTaskSuccess = (state, action) => ({
  ...state,
  tasks: [...(state.tasks.slice(0, action.payload.index)), ...(state.tasks.slice(action.payload.index + 1, state.tasks.length))],
  deleteTaskStatus: Status.SUCCESS,
});

const deleteTaskFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  deleteTaskStatus: Status.FAILURE,
});

const completeTaskRequest = (state) => ({
  ...state,
  completeTaskStatus: Status.REQUEST,
});

const completeTaskSuccess = (state, action) => ({
  ...state,
  tasks: [...(state.tasks.slice(0, action.payload.index)), {...(state.tasks[action.payload.index]), complete: true}, ...(state.tasks.slice(action.payload.index + 1, state.tasks.length))],
  completeTaskStatus: Status.SUCCESS,
});

const completeTaskFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  updateTaskStatus: Status.FAILURE,
});

const searchTaskRequest = (state) => ({
  ...state,
  searchTaskStatus: Status.REQUEST,
});

const searchTaskSuccess = (state, action) => {

  const searchWord = action.payload.search;
  const selectWord = action.payload.select;
  let result = [];
  if (searchWord.length) {
    for (let task of state.tasks) {
      if (task.name.indexOf(searchWord) != -1) {
        if (selectWord == "Ready") {
          if (!task.complete)
            result.push(task);
        }
        else if (selectWord == "Complete") {
          if (task.complete)
            result.push(task);
        }
        else
          result.push(task);
      }
    }
  }
  else {
    result = [...state.tasks];
  }
  return {
    ...state,
    searchTasks: result,
    searchTaskStatus: Status.SUCCESS,
  }
};

const searchTaskFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  searchTaskStatus: Status.FAILURE,
});

const actionHandlers = {
  [Types.CREATE_TASK_REQUEST]: createTaskRequest,
  [Types.CREATE_TASK_SUCCESS]: createTaskSuccess,
  [Types.CREATE_TASK_FAILURE]: createTaskFailure,

  [Types.UPDATE_TASK_REQUEST]: updateTaskRequest,
  [Types.UPDATE_TASK_SUCCESS]: updateTaskSuccess,
  [Types.UPDATE_TASK_FAILURE]: updateTaskFailure,

  [Types.COMPLETE_TASK_REQUEST]: completeTaskRequest,
  [Types.COMPLETE_TASK_SUCCESS]: completeTaskSuccess,
  [Types.COMPLETE_TASK_FAILURE]: completeTaskFailure,

  [Types.DELETE_TASK_REQUEST]: deleteTaskRequest,
  [Types.DELETE_TASK_SUCCESS]: deleteTaskSuccess,
  [Types.DELETE_TASK_FAILURE]: deleteTaskFailure,

  [Types.SEARCH_TASK_REQUEST]: searchTaskRequest,
  [Types.SEARCH_TASK_SUCCESS]: searchTaskSuccess,
  [Types.SEARCH_TASK_FAILURE]: searchTaskFailure,
};

export default createReducer(initialState, actionHandlers);
