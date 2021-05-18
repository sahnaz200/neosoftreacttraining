import {createStore, applyMiddleware} from "redux"
import demo, {demo2} from "./reducers"
import {FirstMiddleWare} from './middlewares'
import createSaga from 'redux-saga';
import {RootSaga} from './sagas';
import thunk from 'redux-thunk'

const sagaMiddleware = createSaga();

//var middlewares = applyMiddleware(FirstMiddleWare, sagaMiddleware)
var middlewares = applyMiddleware(sagaMiddleware, thunk)

var store = createStore(demo, middlewares)

export default store

sagaMiddleware.run(RootSaga)


