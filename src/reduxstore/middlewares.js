/*export function FirstMiddleWare(store){
    return function(next){
        return function(action){
            console.log("action", action, "store", store.getState())
            var result = next(action) //Go to reducer
            return result
        }
    }
} */

//ES6
export let FirstMiddleWare = store => next => action => {
    //console.log("action", action, "store", store.getState())
    var result = next(action) //Go to reducer

    //console.log("after action store state is", store.getState())
    return result
}
