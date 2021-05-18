import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import Spinner from 'react-spinner-material';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

//import {abc} from './reduxstore/thunks'

toast.configure()
function Cart(props){
    var baseurl = process.env.REACT_APP_BASE_URL

    function remove_from_cart(cakeid, array_index){
        confirmAlert({
            title: 'Confirm to remove',
            message: 'Are you sure to remove this item ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => submit_remove(cakeid, array_index)
              },
              {
                label: 'No'
              }
            ],
            closeOnEscape: false,
            closeOnClickOutside: false,
            overlayClassName: "remove_from_cart"
          });
    }

    function submit_remove(cakeid, array_index){
        let add_cart_api = baseurl + "/removecakefromcart"
        let data = {cakeid: cakeid}
        let token = localStorage.token
        axios({
            url:add_cart_api,
            method:"post",
            data: data,
            headers : {
                authtoken: token
            }
        }).then((response)=>{
            console.log("response of remove from cart api : ", response)
            if(response.data){
                props.dispatch({
                    type:"REMOVE_CART_DATA",
                    array_index :array_index
                })
                toast.success(response.data.message)
            }
        }, (error)=>{
            console.log("error response of remove from cart api : ",error)
        })

    }
    var TotalPrice = 0

    /*let CallHello = ()=>{
        props.dispatch(abc())
    }*/

    return(
        props.loading ? (
            <div className="spinner-extra-style">
                <Spinner radius={150} color={"rgb(221 173 37 / 80%)"} stroke={12} visible={true} />
            </div>
          ) : 
            <div className="card border-0">
                <h1 className="text-center mt-5 mb-3"><FontAwesomeIcon icon={faShoppingCart} /> Your Cart </h1>

                {/* <button onClick={CallHello}>Hello {props.thunk}</button> */}
                {props.cartDetails?.length > 0 ? 
                
                <div className="row m-3">
                    <div className="col-sm-8">
                        
                        {props.cartDetails.map((each,index) => {
                            
                            TotalPrice += each.price

                            return(

                                <div className="row m-3 p-2 border rounded">
                                    <div className="col-sm-1">
                                        <div style={{width:"40px", height: "40px"}}><img src={each.image} height="40px" className="card-img-top" alt="..." /></div>
                                        
                                    </div>
                                    <div className="col-sm-3 text-center" style={{fontWeight:"500"}}>
                                        {each.name}
                                    </div>
                                    <div className="col-sm-2 text-center" style={{fontWeight:"500"}}>
                                        {each.price}
                                    </div>
                                    <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>
                                        <button onClick={() => remove_from_cart(each.cakeid, index)} className="btn btn-warning my-2 my-sm-0 text-white"><FontAwesomeIcon icon={faTrash} /> Remove</button>
                                    </div>

                                </div>
                                
                            )
                        })}
                    </div>
                    <div className="col-sm-4">
                        <div className="row m-3 p-3 border rounded text-center">
                            <div className="col-sm-6"><u><b>Total Items</b></u><br/><span style={{fontWeight:"500"}}>{props.cartDetails.length}</span></div>
                            <div className="col-sm-6"><u><b>Total Price</b></u><br/><span style={{fontWeight:"500"}}>{TotalPrice}</span></div>

                        </div>
                        <div className="row m-3 p-3 float-right"><Link to="/checkout"><button className="btn btn-success my-2 my-sm-0" style={{fontWeight:"500"}}> Checkout</button></Link></div>
                    </div>
                </div> :

                <div>
                    <div className="border m-5 p-5 text-center text-secondary" style={{fontWeight:"500", backgroundColor: "rgba(0,0,0,.03)", fontSize: "22px"}}>
                        <span>Your cart is empty.</span>
                    </div> 
                </div>
                
                }
                
            </div>
            
    )
}

Cart = withRouter(Cart)
export default connect(function(state, props){
    var cartDetails = state?.cart_data
    console.log("Cart cartDetails : ", cartDetails)
    return {
        cartDetails : [...cartDetails],
        // thunk : state?.thunk
    }
})(Cart)