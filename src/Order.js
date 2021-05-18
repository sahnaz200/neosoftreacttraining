import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import axios from "axios"

toast.configure()
function Order(props){
  
    useEffect(() => {
        if (props.checkout_step < 4) {
          props.history.push("/checkout");
        }
      }, []);

      useEffect(() => {
        if(props.success_msg){
          toast.success(props.success_msg)
          props.history.replace("/my-orders");
        }
        
    }, [props.success_msg]);

      const onOrder = (event) => {
        event.preventDefault();
        var TotalPrice = 0

        if(props.cartDetails?.length > 0){
          props.cartDetails.map((each,index) => {
            TotalPrice+= each.price
            //cakes.push({name: each.name, image: each.image, price: each.price})
          })
        }
        var data = {
          price: TotalPrice, 
          name: props.address?.name, 
          phone: props.address?.phone, 
          address: props.address?.address, 
          city: props.address?.city, 
          pincode: props.address?.pincode, 
          cakes: props.cartDetails
        }
        props.dispatch({
          type:"PLACE_ORDER",
          payload:data
      })

        /*var token = localStorage.token;
        let cakeOrderAPI = "https://apifromashu.herokuapp.com/api/addcakeorder"
        
        
        console.log("data : ", data)
        axios({
            url:cakeOrderAPI,
            method:"post",
            data: data,
            headers : {
              authtoken: token
          }
            
        }).then((response)=>{
          console.log("addcakeorder response : ", response.data)

          props.dispatch({
            type: "UPDATE_CHECKOUT_STEP",
            step_no: 1,
            click_no: 1,
          });

          props.dispatch({
            type: "ORDER_PLACED"
          });
          toast.success(response.data.messageg)
          props.history.replace("/");
          
            
        }, (error)=>{
            console.log("error from addcakeorder api : ",error)
            
        })*/

      };

    return(
        <div>
            <div className="row text-center">
            <div class="card" style={{width: "600px", margin: "auto", marginTop: "6rem"}}>
                <div class="card-body" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
                <div className="row mb-3">

                  <div className="col-sm-12 text-center"><div style={{fontSize: "18px", fontWeight: "600", }}>Place Your Order</div></div>
                </div>
                <p>Please click on below button to confirm your order. </p>

                <div className="row mt-3">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-11"><button type="button" onClick={onOrder} class="btn btn-success">Place Order</button></div>
                </div>
              </div>
            </div>
          </div> 
        </div>
    )
}
Order = withRouter(Order)
export default connect(function(state, props){
    return {
        cartDetails : state?.cart_data,
        checkout_step : state?.checkout_step,
        address: state?.address,
        loading: state['isfetching'],
        success_msg: state['success_msg']
    }
})(Order)