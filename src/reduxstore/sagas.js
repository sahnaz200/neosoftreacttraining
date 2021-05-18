import axios from "axios"
import { call, put, select, takeEvery, all } from 'redux-saga/effects'
var baseurl = process.env.REACT_APP_BASE_URL
function login(action){
    //console.log("Inside login method")
    return axios({
        method: "post",
        url :baseurl + "/login",
        data: action.payload
    })

}

function* LoginGenerator(action){
    //console.log("Inside LoginGenerator")
    //To get state values here
    /*var state = yield select(function(state){
        return state
    })*/

    var result = yield call(login, action)
    // based on result of task
    // we will dispatch differenet type of requests
    if(result.data.token){
        localStorage.token = result.data.token
        yield put({type:'LOGIN_SUCCESS', payload:result.data})
        //if you want cart data on login success then you need to dispatch another action from here
    } else{
        yield put({type:'LOGIN_FAILURE', payload:result.data})
    }

}

export function* LoginSaga(){
    //console.log("Inside LoginSaga")
    yield takeEvery('LOGIN', LoginGenerator)
    //yield takeEvery('GET_CART', CartGenerator)
}

function fetchOrder(action){
    return axios({
        method: "post",
        url :baseurl + "/cakeorders",
        data: {},
        headers : {
            authtoken: localStorage.token
        }
    })
}

function* FetchOrderGenerator(action){
    var response = yield call(fetchOrder, action)
    yield put({type:'FETCH_ORDER_DATA', payload:response.data.cakeorders})
}

export function* FetchOrderSaga(){
    yield takeEvery('FETCH_ORDER', FetchOrderGenerator)
}


function placeOrder(action){
    return axios({
        method: "post",
        url :baseurl +  "/addcakeorder",
        data: action.payload,
        headers : {
            authtoken: localStorage.token
        }
    })
}

function* PlaceOrderGenerator(action){
    var response = yield call(placeOrder, action)
    console.log("PlaceOrderGenerator : ", response)
    yield put({type:'PLACE_ORDER_SUCCESS', success_msg: response.data.messageg})
    yield put({type:'UPDATE_CHECKOUT_STEP', step_no: 1, click_no: 1})
}

export function* PlaceOrderSaga(){
    yield takeEvery('PLACE_ORDER', PlaceOrderGenerator)
}

/*export function* OrderSaga(){
    yield takeEvery('ADD_ORDER', LoginGenerator)
    yield takeEvery('FETCH_ORDER')
}*/

export function* RootSaga(){
    //console.log("Inside RootSaga")
    //yield all([LoginSaga(), OrderSaga()])
    yield all([LoginSaga(), FetchOrderSaga(), PlaceOrderSaga()])
    //yield takeEvery('GET_CART', CartGenerator)
}

