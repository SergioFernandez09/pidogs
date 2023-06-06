// reducer.js

import { SET_TEMPERAMENT_FILTER, SET_ORIGIN_FILTER, SET_SORT_BY } from './types';

const initialState = {
  temperamentFilter: null,
  sortBy: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMPERAMENT_FILTER:
      return {
        ...state,
        temperamentFilter: action.payload,
      };
      case SET_ORIGIN_FILTER:
      return {
        ...state,
        originFilter: action.payload,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
