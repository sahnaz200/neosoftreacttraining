import {useState,useEffect} from 'react'
import axios from "axios"

function Login(props){
    // useEffect(()=>{
    //     alert('Mounted and Updated')
    // },[])
    var [error,setError]=useState('')
    //var user={}
    var [user, setUser]=useState({})
    let getEmail=(event)=>{
        setUser({
            ...user,
            email:event.target.value
        })
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
            let apiurl ="https://apibyashu.herokuapp.com/api/login"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                console.log("response fromsignup api : ",response.data)
            }, (error)=>{
                console.log("response fromsignup api : ",error)
            })
            console.log(user)
            props.setlogin(true)
            setError("")
            props.informlogin("Kajol")
        }
    }
    return(
        <div>
            {!props.islogin?<><h3>Login</h3>
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
                    
                    <button className="btn btn-primary" onClick={login}>Login</button>
                </div></>:''}
            
        </div>
    )
}

export default Login