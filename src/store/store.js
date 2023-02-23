import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../reducers/userReducer'
import matchInfoReducer from '../reducers/matchInfoReducer'
import teamDetailReducer from '../reducers/teamDetailReducer'
import playersInformationReducer from "../reducers/playersInformationReducer";
import thunk from "redux-thunk";

import { createLogger } from 'redux-logger';


const rootReducer = combineReducers({
user: userReducer,
matchInfo: matchInfoReducer,
teamData:teamDetailReducer,
matchPlayers:playersInformationReducer
});

const persistConfig = {
key: 'root',
storage,
}
const middleware=[thunk, createLogger()];
const composeEnhancers = compose;
const enhancer = composeEnhancers(
// Middleware :
applyMiddleware(...middleware),
);

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
persistedReducer,
enhancer
);

let persistor = persistStore(store)

export {persistor,store};