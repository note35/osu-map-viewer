import * as t from '../actionTypes';

export default function reducer(state={
    fetching: false,
    fetched: false,
    mapset: null,
    error: null,
  }, action) {
  switch(action.type) {
    case t.FETCHDB_PENDING: {
      return {
        ...state,
        fetching: true
        };
      }
    case t.FETCHDB_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        mapset: action.payload
      };
    }
    case t.FETCHDB_REJECTED: {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
  }
  return state;
}
