// actions.js

import { SET_TEMPERAMENT_FILTER, SET_ORIGIN_FILTER, SET_SORT_BY } from './types';

export const setTemperamentFilter = (filter) => ({
  type: SET_TEMPERAMENT_FILTER,
  payload: filter,
});

export const setOriginFilter = (filter) => ({
    type: SET_ORIGIN_FILTER,
    payload: filter,
  });

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy,
});
