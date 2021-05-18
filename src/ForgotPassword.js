import {useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

toast.configure()
function ForgotPassword(props){
    var baseurl = process.env.REACT_APP_BASE_URL
    var [formErros, setFormErrors] = useState({})
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validation(elements){
        var errors = {}
        if(!elements.email.value){
            errors.email = "Email is required"
        } else if(!validateEmail(elements.email.value)){
            errors.email = "Email is Invalid"
        }

        var errorkeys = Object.keys(errors)
        if(errorkeys.length >0)
            return errors
        else
            return false
    }

    let makeEmptyField = (event) => {
        var field_name = event.target.name
        if(formErros[field_name]){
            const obj = {...formErros}
            delete obj[field_name]
            console.log("obj : ", obj)
            setFormErrors(obj)
        }
    }

    let Submit=function(){

        var form = document.getElementById("ForgotPassword_form")
        var errors = validation(form.elements)
        if(errors){
            setFormErrors(errors)
        } else{
            setFormErrors({})
            var user = {email : form.elements.email.value}
            let apiurl =baseurl + "/recoverpassword"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                console.log("response from forgot password api : ",response)
                if(response.data){
                    toast.success(response.data.message)
                    props.history.push("/login")
                }
            }, (error)=>{
                console.log("response from forgot password api : ", error)
            })
        }  
    }

    return(
        <div>
            <h3 className="text-center mt-5">Forgot Password</h3>
            <div style={{"width":"50%", "margin":"auto"}}>
                <form id="ForgotPassword_form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className={"form-control " + (formErros?.email ? 'border-danger' : '')} onChange={makeEmptyField} placeholder="Enter Email address"></input>
                        {formErros?.email && <span className="text-danger">{formErros.email}</span>}
                    </div>
                    <button type="button" className="btn btn-primary mt-2" onClick={Submit}>Submit</button>
                </form>
                <div className="mt-3">
                    <span><Link to="/login">CLick here to login</Link></span>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword