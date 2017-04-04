export default function reducer(state={
    fetching: false,
    fetched: false,
    mapset: null,
    error: null,
  }, action) {
  switch(action.type) {
    case "FETCHDB_PENDING": {
      return {
        ...state,
        fetching: true
        };
      }
    case "FETCHDB_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        mapset: action.payload
      };
    }
    case "FETCHDB_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
  }
  return state;
}
