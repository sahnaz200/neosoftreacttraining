import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
import Home from './Home';
import Signup from './Signup';
import Showdata from './Showdata'; //component name's 1st letter always should be in caps.

import Login from './Login';
import {useState} from 'react';
import Search from './Search';

function App() {

  var [user,setUser]=useState();
  function LoginDone(data){
    setUser(data)
    //setlogin(true)
  }


  var [login,setLogin]=useState(false);

  return (
    <div className="App">
        <Navbar islogin={login} setlogin={setLogin} user={user} />
        <Login islogin={login} setlogin={setLogin} informlogin={LoginDone}/>
        <Search />
        <Signup />
        {/* <Showdata /> */}
        <Home />
      </div>
  );
}

export default App;
