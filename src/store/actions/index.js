import {
  ADD_TODO, // todos
  TOGGLE_TODO,
  LOGIN, // user
  LOGOUT,
  FETCH_FEED, // feed
  CLEAR_FEED,
  SET_FILTERS,
} from "./actionTypes";

let nextTodoId = 0;

// todos actions
export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content,
  },
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id },
});

// user actions
export const loggedIn = userInfo => ({
  type: LOGIN,
  payload: {
    userInfo,
  },
});

export const loggedOut = () => ({
  type: LOGOUT,
});

// feed actions
export const fetchFeed = ({ items }) => ({
  type: FETCH_FEED,
  payload: {
    items,
  },
});

export const clearFeed = () => ({
  type: CLEAR_FEED,
});

export const setFilters = ({ filters }) => ({
  type: SET_FILTERS,
  payload: {
    filters,
  },
});
