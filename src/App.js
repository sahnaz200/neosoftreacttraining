

import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
import Home from './Home';
import Signup from './Signup';
import Showdata from './Showdata'; //component name's 1st letter always should be in caps.

import Login from './Login';
import {useState} from 'react';
import Search from './Search';
import CakeDetails from './CakeDetails';
import PageNotFound from './PageNotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {

  var [user,setUser]=useState();
  var [login,setLogin]=useState(false);
  function LoginDone(data){
    setUser(data.name)
    setLogin(true)
  }


  
//Router will look for /path into the address bar and load corresponding component

//From all the elemnets on whatever element-click you want to go somewhere wrap that element in <Link> tag
  return (
    <div>
        
    <Router>
      <Navbar islogin={login} user_name={user} />
      <div>
        <Switch>
        <Route path="/" exact component={Home} /> {/* If i remove exact word then it will load all components whose route path starts with '/' */}
        <Route path="/login" exact><Login islogin={login} informlogin={LoginDone}/> </Route>
        <Route path="/signup" exact component={Signup} />
        <Route path="/search" exact component={Search} />
        <Route path="/cake/:cakeid" exact component={CakeDetails} />

        {/* <Route path="/*" exact component={PageNotFound} /> */}

        <Route path="/*"> 
          <Redirect to="/"></Redirect>
        </Route>
        </Switch>
      </div>

    </Router>

  </div>
  );
  {/*return (
    <div className="App">
        <Navbar islogin={login} user={user} />
        <Login islogin={login} informlogin={LoginDone}/>
        <Search />
        <Signup />
         <Showdata /> 
        <Home />
      </div>
  );*/}
}

export default App;
