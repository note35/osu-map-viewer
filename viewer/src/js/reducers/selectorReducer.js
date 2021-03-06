import * as t from '../actionTypes';

export default function reducer(state={
    update: false,
    text: "",
    mode: "Standard",
    diff: "",
    prediff: "",
    loading: false,
  }, action) {
  switch(action.type) {
    case t.CHANGE_FORCED_UPDATE: {
      return {
        ...state,
        update: action.payload
      }
    }
    case t.CHANGE_SEARCH_TEXT: {
      return {
        ...state,
        text: action.payload
      }
    }
    case t.CHANGE_SEARCH_MODE: {
      return {
        ...state,
        mode: action.payload
      }
    }
    case t.CHANGE_SEARCH_DIFF: {
      return {
        ...state,
        diff: action.payload
      }
    }
    case t.CHANGE_SEARCH_PREDIFF: {
      return {
        ...state,
        prediff: action.payload
      }
    }
    case t.CHANGE_LOADING_STAT: {
      return {
        ...state,
        loading: action.payload
      }
    }
  }
  return state;
}
