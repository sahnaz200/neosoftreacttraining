import { withRouter } from 'react-router-dom'
import { useEffect } from "react";
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

const Money = <FontAwesomeIcon icon={faMoneyBillWave} />
function Payment(props){
    useEffect(() => {
      if (props.checkout_step < 3) {
        props.history.push("/checkout");
      }
    }, []);

    var GoToOrder = (event) => {
      event.preventDefault();
        props.dispatch({
          type: "UPDATE_CHECKOUT_STEP",
          step_no: 4,
          click_no: 4,
        });
      props.history.push("/checkout/order");   
    }  
    

    return(
        <div>
          <div className="row text-center">
            <div class="card" style={{width: "800px", margin: "auto", marginTop: "6rem"}}>
                <div class="card-body" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
                <div className="row mb-3">
                  
                  <div className="col-sm-1">
                    <div class="form-check mt-1">
                      <input type="radio" name="cod" id="flexRadioDefault1" value="cod" checked  style={{ border: "0px", width: "100%", height: "1.2em" }} />
                    </div>
                  </div>

                  <div className="col-sm-11 text-left"><div style={{fontSize: "18px", fontWeight: "600", }}>{Money} <span className="pl-2">Cash on Delivery</span></div></div>
                </div>
                <p>Cash on delivery (COD) available only. Card/Net banking acceptance subject to device available. </p>
                <div className="row mt-4">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-11 text-left"><button type="button" onClick={GoToOrder} class="btn btn-success">Next</button></div>
                </div>
              </div>
            </div>
          </div> 
        </div>
    )
}
Payment = withRouter(Payment)
export default connect(function(state, props){
  console.log("Payment checkout_step  : ", state?.checkout_step)
  return {
      checkout_step : state?.checkout_step
  }
})(Payment);