import { FETCH_CATEGORIES_SUCCESS } from '../actions/actionTypes';

const initialState = {
  serviceCategories: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS: {
      console.log('whoa2', action);
      const { serviceCategories } = action.payload;
      return {
        ...state,
        serviceCategories,
      };
    }
    default:
      return state;
  }
}
