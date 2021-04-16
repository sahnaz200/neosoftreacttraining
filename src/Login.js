import {useState,useEffect} from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'

function Login(props){
    
    // useEffect(()=>{
    //     alert('Mounted and Updated')
    // },[])
    var [error,setError]=useState('')
    //var user={}
    var [user, setUser]=useState({})
    var [name, setName]=useState()
    let getEmail=(event)=>{
        console.log("props : ", props)
        setUser({
            ...user,
            email:event.target.value
        })
        setName(event.target.value)
        console.log("user is", user)
        console.log("name is", name)
        //user.email=event.target.value;
    }

    let getPassword=(event)=>{
        setUser({
            ...user,
            password:event.target.value
        })
        //user.password=event.target.value;
    }

    let login=function(){
        if(!user.email && !user.password)
        {
            setError("Please enter valid credentials")
            
        }else{
            setError("")
            let apiurl ="https://apibyashu.herokuapp.com/api/login"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                props.informlogin(response.data)
                console.log("response from login api : ", response.data)
                if(response.data.token){
                    localStorage.token = response.data.token
                    localStorage.email = response.data.email
                    props.history.push("/")

                } else{
                    alert("Invalid Credentials")
                }
            }, (error)=>{
                console.log("response from login api : ", error)
            })
            console.log(user)
            
        }
    }
    return(
        <div>
            <h3 className="text-center">Login</h3>
            <div style={{"width":"50%", "margin":"auto"}}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={getEmail}></input>
                    {user && <label>{user.email}</label>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={getPassword}></input>
                        {user.password}    
                    </div>
                    <div className="text-danger">
                        {error}
                    </div>

                    <div>
                        <span><Link to="/signup">New User? click here</Link></span>
                        <span style={{float:"right"}}><Link to="/forgot">Forgot Password</Link></span>
                    </div>
                    
                    <button className="btn btn-primary" onClick={login}>Login</button>
                </div>
            
        </div>
    )
}

export default withRouter(Login)