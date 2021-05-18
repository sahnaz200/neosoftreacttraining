var demo = function(state={
    user:null,
    cart_data : [],
    order_data: [],
    checkout_step : 1,
    clicked_step : 1,
    success_msg:null,
}, action){
    switch(action.type){

        case "INITIALIZE_USER" : {
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            return state
        }

        case "LOGIN" : {
            console.log("LOGIN started")
            state = {...state}
            state['isfetching'] = true //Based on this property we can show loader, in call api call we can use this property to know the status of network request
            return state
        }

        case "LOGIN_SUCCESS" : {
            state = {...state}
            state['user'] = action.payload
            state['isfetching'] = false
            state['isloggedin'] = true
            state['isloggedinerror'] = false
            return state
        }

        case "LOGIN_FAILURE" : {
            state = {...state}
            state['user'] = action.payload
            state['isfetching'] = false
            state['isloggedinerror'] = true
            return state
        }

        case "LOGOUT" : {
            state = {...state}
            localStorage.clear()
            delete state['isloggedin']
            delete state['user']
            return state
        }

        case "CART_DATA" : {
            state = {...state}
            state['cart_data'] = action.cart_data
            return state
        }

        case "ADD_CART_DATA" : {
            state = {...state}
            var new_cake = action.new_cake
            var cart_old_data = state['cart_data']
            state['cart_data'] = [...cart_old_data, new_cake]
            return state
        }

        case "REMOVE_CART_DATA" : {
            state = {...state}
            state['cart_data'].splice(action.array_index, 1)
            return state
        }

        case "UPDATE_CHECKOUT_STEP" : {
            state = {...state}
            if(action?.step_no)
                state['checkout_step'] = action.step_no
            if(action?.click_no)
                state['clicked_step'] = action.click_no
            if(state['checkout_step'] == 1)
                delete state['success_msg']
            
            return state
        }

        case "ADD_ADDRESS": {
            state = { ...state };
            state["address"] = action.payload;
            return state;
          }

          case "PLACE_ORDER" : {
            state = {...state}
            state['isfetching'] = true
            return state
        }

        case "PLACE_ORDER_SUCCESS" : {
            state = {...state}
            state['cart_data'] = []
            state['address'] = []
            state['isfetching'] = false
            state['success_msg'] = action.success_msg
            return state
        }

        case "FETCH_ORDER" : {
            state = {...state}
            state['isfetching'] = true
            return state
        }

        case "FETCH_ORDER_DATA" : {
            state = {...state}
            state['order_data'] = action.payload
            state['isfetching'] = false
            return state
        }

        /*case "HELLO" : {
            console.log("case HELLO")
            state = {...state}
            state['thunk'] = "Hellooooo"
            return state
        }*/

        default : return state
    }

}

export default demo