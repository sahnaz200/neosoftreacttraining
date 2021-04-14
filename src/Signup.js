import {Component} from "react"
import axios from "axios"
class Signup extends Component{
    //this.props // from here we can receive props for class based componets
    constructor(){
        super()
        this.state ={
          
        }
        //alert("constructor");
    }

    /*componentDidMount(){
        alert("component Did Mount");
    }

    componentDidUpdate(){
        alert("component Did Update");
        // when we click on register btn then this function will get called. bcoz there setState() is called means we are updating data of component using setState()
    }

    componentWillUnmount(){
        // this will not call now when we do routing and navigation then it will get call
    }*/

    user = {}

    getName =(event)=>{
        this.user.name = event.target.value
    }

    getEmail =(event)=>{
        this.user.email = event.target.value
    }
    getPassword = (event)=>{
        this.user.password = event.target.value
    }
    register = ()=>{
        if(!this.user.email || !this.user.password || !this.user.name){
            this.setState({
                errorMessage:"Please Fill Details"
            })
        }
        else{
            let apiurl ="https://apibyashu.herokuapp.com/api/register"
            axios({
                url:apiurl,
                method:"post",
                data: this.user
            }).then((response)=>{
                console.log("response fromsignup api : ",response.data)
            }, (error)=>{
                console.log("response fromsignup api : ",error)
            })
           /*this.setState({
               errorMessage:null
           })*/
        }
        console.log("...... user details" , this.user)
       
    }
    render(){
        return(
            <div style={{width:"50%" , margin:"auto"}}>
                <div className="form-group">
                    <label>Name</label>
                <input type="text" class="form-control" onChange={this.getName}></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                <input type="email" class="form-control" onChange={this.getEmail}></input>
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" class="form-control" onChange={this.getPassword}></input>
                </div>
                <div style={{color:"red"}}>
                    {this.state.errorMessage}
                </div>
              <button className="btn btn-primary" onClick={this.register}>Register</button>
            </div>
        )
    }
}
export default Signup