import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {
    Link, useHistory
  } from "react-router-dom";
import {useState} from 'react';
import {connect} from 'react-redux'
import { toast } from 'react-toastify';

toast.configure()
function Navbar(props){
    const history = useHistory();
    var [searchtext, setSearchtext]=useState('')
    let getSearchText=(event)=>{
        setSearchtext(event.target.value)
    }

    const handleLogout = (event) => {
        event.preventDefault()
        props.dispatch({
            type:"LOGOUT"
        })
        toast.success("You have successfully logged out!")
        history.push("/")
      };

      const handleSearchCakes = (event) => {
        event.preventDefault()
        if(searchtext){
            history.push("/search?cake="+searchtext)
        } else{
            toast.error("Please fill the search field")
        }
        
      };

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/"><a className="website-heading">My CakeShop </a></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-4">
                    <li className="nav-item">
                    {props.user && <span><a className="nav-link" tabindex="-1" aria-disabled="true">Welcome {props.user}</a></span> }
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input onChange={getSearchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0 mr-2" onClick={handleSearchCakes}><FontAwesomeIcon icon={faSearch} /></button>
                    <Link className="admin_link" to="/admin"><button className="btn btn-outline-warning my-2 my-sm-0 mr-2">Admin</button></Link>
                    {localStorage.token ? 
                        <div>
                            <Link to="/cart" className="btn btn-warning my-2 my-sm-0 text-white mr-2"><FontAwesomeIcon icon={faShoppingCart} /> ({props.cart_data_length})</Link>
                            <Link to="/my-orders" className="btn btn-warning my-2 my-sm-0 text-white mr-2">My Orders</Link>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div> :
                        <div>
                            <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                        </div>
                    }
                </form>
            </div>
        </nav>
    )
}

export default connect(function(state, props){
    console.log("Navbar state : ", state)
    return {
        user : state?.user?.name,
        loggedinStatus : state?.isloggedin,
        cart_data_length : state?.cart_data ? [...state?.cart_data].length : [].length 
    }
})(Navbar)

