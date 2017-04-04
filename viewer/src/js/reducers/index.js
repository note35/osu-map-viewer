import { combineReducers } from "redux";

import mapsetReducer from "./mapsetReducer";

export default combineReducers({
    mapset: mapsetReducer,
});
