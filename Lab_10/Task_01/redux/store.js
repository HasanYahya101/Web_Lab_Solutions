import { createStore, combineReducers } from "redux"
import conceptReducer from "./reducers/conceptReducer"

const rootReducer = combineReducers({
  conceptsData: conceptReducer,
});

const store = createStore(rootReducer);

export default store;
