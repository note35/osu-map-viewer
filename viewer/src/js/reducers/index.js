import { combineReducers } from "redux";

import mapsetReducer from "./mapsetReducer";
import selectorReducer from "./selectorReducer";

export default combineReducers({
    mapset: mapsetReducer,
    selector: selectorReducer,
});
