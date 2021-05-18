import {useState, useEffect} from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { toast } from 'react-toastify';

toast.configure()
function Login(props){

    useEffect(() => {
        if (localStorage.token) {
          props.history.push("/");
        }
      }, []);

    useEffect(() => {
        if(props.isloggedinerror){
            toast.error(props.user.message)
            var form = document.getElementById("Login_form")
            form.elements.email.value = ""
            form.elements.password.value = ""
        } else if(props.isloggedin){
            console.log("Loggin success")
            toast.success("You have successfully logged in!")
            props.history.push("/")
        }
        
    }, [props.isloggedinerror, props.isloggedin]);

    //console.log("props.history : ", props.history)
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

        if(!elements.password.value){
            errors.password = "Password is required"
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

    let login=function(){

        var form = document.getElementById("Login_form")
        var errors = validation(form.elements)
        if(errors){
            setFormErrors(errors)
        } else{
            setFormErrors({})
            var user = {email : form.elements.email.value, password: form.elements.password.value}
            props.dispatch({
                type:"LOGIN",
                payload:user
            })

            //This code has been moved to middleware
            /*let apiurl ="https://apifromashu.herokuapp.com/api/login"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                console.log("response from login api : ",response)
                if(response.data.token){
                    localStorage.token = response.data.token

                    props.dispatch({
                        type:"LOGIN",
                        payload:response.data
                    })
                    toast.success("You have successfully logged in!")
                    props.history.push("/")

                } else{
                    toast.error(response.data.message)
                    form.elements.email.value = ""
                    form.elements.password.value = ""
                }
                
            }, (error)=>{
                console.log("response from login api : ", error)
            })*/
        }  
    }

    return(
        <div>
            <h3 className="text-center mt-5">Login</h3>
            <div style={{"width":"50%", "margin":"auto"}}>
                <form id="Login_form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className={"form-control " + (formErros?.email ? 'border-danger' : '')} onChange={makeEmptyField} placeholder="Enter Email address"></input>
                        {formErros?.email && <span className="text-danger">{formErros.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className={"form-control " + (formErros?.password ? 'border-danger' : '')} onChange={makeEmptyField} placeholder="Enter Password"></input>
                        {formErros?.password && <span className="text-danger">{formErros.password}</span>}
                    </div>
                    
                    <button type="button" className="btn btn-primary mt-2" onClick={login}>Login</button>
                </form>

                

                <div className="mt-3">
                    <span><span class="text-muted">New User? </span><Link to="/signup">click here</Link></span>
                    <span style={{float:"right"}}><Link to="/forgot-password">Forgot Password</Link></span>
                </div>

            </div>
        </div>
    )
}
Login = withRouter(Login)
export default connect(function(state, props){
    console.log("State of store in login component : ", state)
    return {
        user: state['user'],
        isloggedinerror: state['isloggedinerror'],
        isloggedin : state['isloggedin']
    }

})(Login)