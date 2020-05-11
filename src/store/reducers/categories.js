import { SET_CATEGORIES } from "../actions/actionTypes";

const initialState = {
  serviceCategories: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      const { categories } = action.payload;
      return {
        ...state,
        serviceCategories: categories,
      };
    }
    default:
      return state;
  }
}
