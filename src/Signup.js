import {Component} from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

toast.configure()
class Signup extends Component{
    constructor(props){
        super(props)
        this.state ={
            errorMessage: {}
        }
        //console.log("state value >>>>" , this.state)
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validation = (elements) => {
        var errors = {}
        
        if(!elements.name.value){
            errors.name = "Name is required"
        }

        if(!elements.email.value){
            errors.email = "Email is required"
        } else if(!this.validateEmail(elements.email.value)){
            
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
    register = ()=>{
        var baseurl = process.env.REACT_APP_BASE_URL
        var form = document.getElementById("Signup_form")
        var errors = this.validation(form.elements)
        if(errors){
            this.setState({
                errorMessage: errors
            })
        } else{
            this.setState({
                errorMessage: {}
            })
            var user = {name : form.elements.name.value, email : form.elements.email.value, password: form.elements.password.value}

            let apiurl =baseurl + "/register"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                console.log("response from signup api : ", response)
                toast.success(response.data.message)
                this.props.history.push("/login")
            }, (error)=>{
                console.log("error response from signup api : ", error)
            })
        }
    }

    makeEmptyField = (event) => {
        var field_name = event.target.name
        if(this.state.errorMessage[field_name]){
            const obj = {...this.state.errorMessage}
            delete obj[field_name]
            console.log("obj : ", obj)
            this.setState({
                errorMessage: obj
            })
        }
    }
    render(){
        return(
            <div style={{width:"50%" , margin:"auto"}}>
                <h3 className="text-center mt-5">Register</h3>
                <form id="Signup_form">
                <div className="form-group">
                    <label>Name</label>
                <input type="text" name="name" class={"form-control " + (this.state.errorMessage?.name ? 'border-danger' : '')} onChange={this.makeEmptyField} placeholder="Enter Name"></input>
                {this.state.errorMessage?.name && <span className="text-danger">{this.state.errorMessage.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                <input type="email" name="email" class={"form-control " + (this.state.errorMessage?.email ? 'border-danger' : '')} onChange={this.makeEmptyField} placeholder="Enter Email address"></input>
                {this.state.errorMessage?.email && <span className="text-danger">{this.state.errorMessage.email}</span>}
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" class={"form-control " + (this.state.errorMessage?.password ? 'border-danger' : '')} onChange={this.makeEmptyField} placeholder="Enter Password"></input>
                {this.state.errorMessage?.password && <span className="text-danger">{this.state.errorMessage.password}</span>}
                </div>
                <button type="button" className="btn btn-primary mt-2" onClick={this.register}>Register</button>
              </form>
              <div className="mt-3">
                    <span><Link to="/login">Go to login</Link></span>
                </div>
            </div>
        )
    }
}
export default Signup