import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk";
import loginReducer from './login-reducer'
import charactersReducer from "./characters-reducer";

let reducerPack = combineReducers({
    login: loginReducer,
    characters: charactersReducer
})

let store = createStore(reducerPack, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;