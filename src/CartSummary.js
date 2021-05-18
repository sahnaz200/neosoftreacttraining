import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-spinner-material';
function CartSummary(props){

    var TotalPrice = 0
    var GoToAddress = () => {
        if(props.cart_data_length > 0){
            props.dispatch({
                type: "UPDATE_CHECKOUT_STEP",
                step_no: 2,
                click_no: 2,
              });
              props.history.push("/checkout/address");
        } 
    }

    return(
        props.loading ? 
            <div className="spinner-extra-style">
                <Spinner radius={150} color={"rgb(221 173 37 / 80%)"} stroke={12} visible={true} />
            </div>
           :
        <div>
            <h3 className="text-center p-4 mt-2">Your Cart</h3>
            { props.cartDetails?.length > 0 ? 
            <div>
                <div className="row mx-5 px-5" >
                    
                    <div className="col-sm-10" style={{margin: "30px auto"}}> 
                        {props.cartDetails.map((each,index) => {
                            TotalPrice += each.price
                            return(
                                <div className="row p-2 border border-bottom-0">
                                    <div className="col-sm-4" style={{fontWeight:"500"}}>
                                        <div style={{width:"70px", height: "70px", margin:"auto"}}><img src={each.image} height="70px" className="card-img-top" alt="..." /></div>
                                    </div>
                                    <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>{each.name}</div>
                                    
                                    <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>
                                        {each.price}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="row p-2 border">
                            <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>Total(USD)</div>
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>{TotalPrice}</div>
                        </div>
                    </div>
                </div>
                <div className="row mx-5 px-5">
                    <div className="col-sm-10 text-right" style={{margin: "0px auto"}}><button type="button" onClick={GoToAddress} class="btn btn-success" style={{marginTop: "10px"}}>Next</button></div>
                </div>
            </div>
            : 
            <div className="border m-5 p-5 text-center text-secondary" style={{fontWeight:"500", backgroundColor: "rgba(0,0,0,.03)", fontSize: "22px"}}>
                <span>Your cart is empty.</span>
            </div>}
        </div>
    )
}
CartSummary = withRouter(CartSummary)
export default connect(function(state, props){
    return {
        cartDetails : state?.cart_data,
        cart_data_length : state?.cart_data?.length
    }
})(CartSummary);