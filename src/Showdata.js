import {Component} from 'react'
class Showdata extends Component{
    constructor(){
        super()
        this.state = {
            onlineUsers:0,
        }
    }

    goOnline = ()=>{ 
        // we have to use arrow function bcoz here this opartor looses it's scope. setState() is function of Component class.
         
        this.setState({
            onlineUsers: this.state.onlineUsers +1
        })
    }

    render(){
        return (
            <div>
                hey Users {this.state.onlineUsers}

                <button onClick={this.goOnline}>Go Online</button> 
                {/* If we do not use goOnline as arrow function then we have to write ->  onClick={this.goOnline.bind(this)} 
                Point is either we have to use arrow function or pass this oparator */}
            </div>
        )
    }
}

export default Showdata