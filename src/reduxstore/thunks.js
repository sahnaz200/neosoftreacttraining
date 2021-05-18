export function abc(){
    return (dispatch, getState)=>{
        //Kuch check krne ke baad
        var state = getState()
        dispatch({
            type: "HELLO"
            
        })
    }
}