import {
    Link
  } from "react-router-dom";
  import {useState} from 'react';

function Navbar(props){
    //console.log("localStorage : ", localStorage) // this session variable, if there is some value present then we are in logged state
    /*let search = function(event){
        event.preventDefault()
        console.log('Search happening', props)

    }*/
    var [searchtext, setSearchtext]=useState('')
    let getSearchText=(event)=>{
        setSearchtext(event.target.value)
    }

    //href tag need to remove if you are wraping <a> with <Link> tag
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/"><a className="navbar-brand">My CakeShop </a></Link>
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
               
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
                {props.user_name && 
                <li className="nav-item">
                    <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">Name - {props.user_name}</a>
                </li>

                }

                
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input onChange={getSearchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <Link to={"/search?cake="+searchtext}><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>

                {props.islogin ?<button className="btn btn-danger">Logout</button>:
                <Link to="/login"><button className="btn btn-primary">Login</button></Link>}
                </form>
            </div>
            </nav>
    )
}

export default Navbar;
