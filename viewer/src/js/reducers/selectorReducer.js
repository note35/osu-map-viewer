export default function reducer(state={
    update: false,
    text: "",
    mode: "Standard",
    diff: "",
    prediff: "",
    loading: false,
  }, action) {
  switch(action.type) {
    case "FORCED_UPDATE": {
      return {
        ...state,
        update: true
        };
      }
    case "FORCED_NOT_UPDATE": {
      return {
        ...state,
        update: false
      };
    }
    case "CHANGE_SEARCH_TEXT": {
      return {
        ...state,
        text: action.payload
      }
    }
    case "CHANGE_SEARCH_MODE": {
      return {
        ...state,
        mode: action.payload
      }
    }
    case "CHANGE_SEARCH_DIFF": {
      return {
        ...state,
        diff: action.payload
      }
    }
    case "CHANGE_SEARCH_PREDIFF": {
      return {
        ...state,
        prediff: action.payload
      }
    }
    case "CHANGE_LOADING_STAT": {
      return {
        ...state,
        loading: action.payload
      }
    }
  }
  return state;
}
