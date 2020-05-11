import Cookies from 'js-cookie';

import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  isLoggedIn: Boolean(Cookies.get('accessToken')) || false,
  userInfo: Cookies.getJSON('basicUserInfo') || {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { userInfo = {} } = action.payload;
      return {
        ...state,
        userInfo,
        isLoggedIn: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userInfo: {},
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}