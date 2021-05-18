import { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { toast } from 'react-toastify';

toast.configure()
function Address(props){

    let [address, setAddress] = useState({});

    useEffect(() => {
        if (props.checkout_step < 2) {
          props.history.push("/checkout");
        }
        setAddress(props.address);
    }, []);
    
    var [formErros, setFormErrors] = useState({})
    function validation(elements){
        var errors = {}
        if(!elements.name.value){
            errors.name = "Name is required"
        }
        if(!elements.phone.value){
            errors.phone = "Phone is required"
        }
        if(!elements.address.value){
            errors.address = "Address is required"
        }
        if(!elements.city.value){
            errors.city = "City is required"
        }
        if(!elements.pincode.value){
            errors.pincode = "Pincode is required"
        }

        var errorkeys = Object.keys(errors)
        if(errorkeys.length >0)
            return errors
        else
            return false

    }

    var submitHandler = function(){
        var form = document.getElementById("formAddress")
        var errors = validation(form.elements)
        if(errors){
            setFormErrors(errors)
        } else{
            setFormErrors({})
            //toast.success("Address form has been validated successfully")
            props.dispatch({ type: "ADD_ADDRESS", payload: address });
            props.dispatch({
                type: "UPDATE_CHECKOUT_STEP",
                step_no: 3,
                click_no: 3,
            });
            props.history.push("/checkout/payment")
        }
    }

    let makeEmptyErrors = (event) => {
        var field_name = event.target.name 
        setAddress({ ...address, [field_name]: event.target.value })
        if(formErros[field_name]){
            const obj = {...formErros}
            delete obj[field_name]
            console.log("obj : ", obj)
            setFormErrors(obj)
        }
    }

    return(
        <div>
            <h3 className="text-center p-4 mt-2">Shipping Details</h3>
            <div className="row">
                <div class="col-sm-9" style={{margin: "30px auto"}}>
                    <form className="text-center mx-5 px-5" id="formAddress" style={{fontWeight:"500"}}>
                        <div class="form-group">
                            <label for="inputName">Name</label>
                            <input type="text" class={"form-control " + (formErros?.name ? 'border-danger' : '')} name="name" id="inputName" onChange={makeEmptyErrors} value={address?.name} placeholder="Enter Name" />
                            {formErros?.name && <span className="text-danger">{formErros.name}</span>}
                        </div>
                        <div class="form-group mt-4">
                            <label for="inputPhone">Phone</label>
                            <input type="number" class={"form-control " + (formErros?.phone ? 'border-danger' : '')} name="phone" id="inputPhone" onChange={makeEmptyErrors} value={address?.phone} placeholder="Enter Phone Number" />
                            {formErros?.phone && <span className="text-danger">{formErros.phone}</span>}
                        </div>
                        <div class="form-group mt-4">
                            <label for="inputAddress">Address</label>
                            <input type="text" class={"form-control " + (formErros?.address ? 'border-danger' : '')} name="address" id="inputAddress" onChange={makeEmptyErrors} value={address?.address} placeholder="Enter Address" />
                            {formErros?.address && <span className="text-danger">{formErros.address}</span>}
                        </div>
                        <div class="form-row mt-4">
                            <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class={"form-control " + (formErros?.city ? 'border-danger' : '')} name="city" id="inputCity" onChange={makeEmptyErrors} value={address?.city} placeholder="Enter City" />
                            {formErros?.city && <span className="text-danger">{formErros.city}</span>}
                            </div>
                            <div class="form-group col-md-6">
                            <label for="inputPincode">Pincode</label>
                            <input type="text" class={"form-control " + (formErros?.pincode ? 'border-danger' : '')} name="pincode" id="inputPincode" onChange={makeEmptyErrors} value={address?.pincode} placeholder="Enter Pincode" />
                            {formErros?.pincode && <span className="text-danger">{formErros.pincode}</span>}
                            </div>
                        </div>
                        <button type="button" onClick={submitHandler} class="btn btn-success" style={{marginTop: "10px"}}>Continue to Checkout</button>
                    </form>
                </div>
            </div>
            
        </div>
        
    )
}
Address = withRouter(Address)
export default connect(function(state, props){
    return {
        checkout_step : state?.checkout_step,
        address: state?.address,
    }
})(Address)