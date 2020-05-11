import {
  FETCH_FEED,
  CLEAR_FEED,
  SET_FILTERS,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  filters: {
    username: '',
    license: '',
    state: '',
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FEED: {
      console.log('FETCH_FEED', action.payload);
      const { items = [] } = action.payload;
      return { // concat new items to end of existing items
        ...state,
        items: [...state.items, ...items],
      };
    }
    case CLEAR_FEED: {
      return {
        ...state,
        items: [],
      }
    }
    case SET_FILTERS: {
      const { filters } = action.payload;
      console.log('SET_FILTERS = ', action.payload);
      return {
        ...state,
        filters: {
          ...state.filters,
          ...filters,
        }
      }
    }
    default:
      return state;
  }
}
