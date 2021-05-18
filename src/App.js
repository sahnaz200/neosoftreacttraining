import React, {Suspense} from 'react';
import './App.css';
import Navbar from './Navbar'
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Checkout from './Checkout'
import {useEffect, useState} from 'react';
import Search from './Search';
import CakeDetails from './CakeDetails';
import Cart from './Cart';
import MyOrders2 from './MyOrders2'
import MyOrders from './MyOrders';
import ForgotPassword from './ForgotPassword';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { GuardProvider, GuardedRoute } from 'react-router-guards';
import axios from "./axiosinterceptor"
import {connect} from 'react-redux'
import ErrorBoundary from './ErrorBoundary'

var SuspendedAdmin = React.lazy(()=>import('./Admin'))
function App(props) {
  var baseurl = process.env.REACT_APP_BASE_URL
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    
    setCartLoading(true);
    var token = localStorage.token;
    if(token && !props.user){
      axios({
          url:baseurl + '/getuserdetails',
          method:"get",
          headers : {
            authtoken: token
        }
      }).then((response)=>{
          props.dispatch({
            type:"INITIALIZE_USER",
            payload:response.data.data
        })
          
      }, (error)=>{
          console.log("response from get user details api : ",error)
      })
      
    }

    let getCartDetailsAPI = baseurl + "/cakecart"
      axios({
          url:getCartDetailsAPI,
          method:"post",
          data: {},
          headers : {
              authtoken: token
          }
      }).then((response)=>{
          props.dispatch({
            type:"CART_DATA",
            cart_data:response.data.data
        }) 
        setCartLoading(false);
      }, (error)=>{
          console.log("response from cake deatils api : ",error)
          setCartLoading(false);
      })
      
  }, [props.token]);

  const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (localStorage.token) {
        next();
      }
      next.redirect('/login');
    } else {
      next();
    }
  };

  return (
    <div>
      <ErrorBoundary>
    <Router>
      <Navbar />
      <GuardProvider guards={[requireLogin]} >
        <Switch>
          <GuardedRoute path="/" exact component={Home} />
          <GuardedRoute path="/login" exact><Login/> </GuardedRoute>
          <GuardedRoute path="/signup" exact component={Signup} />
          <GuardedRoute path="/forgot-password" exact component={ForgotPassword} />
          <GuardedRoute path="/search" exact component={Search} />
          <GuardedRoute path="/cart" exact meta={{ auth: true }} ><Cart loading={cartLoading} /></GuardedRoute>
          <GuardedRoute path="/my-orders2" exact meta={{ auth: true }} ><MyOrders2 /></GuardedRoute>
          <GuardedRoute path="/my-orders" exact meta={{ auth: true }} ><MyOrders /></GuardedRoute>
          <GuardedRoute path="/checkout" meta={{ auth: true }} ><Checkout loading={cartLoading} /></GuardedRoute>
          <GuardedRoute path="/cake/:cakeid" exact component={CakeDetails} />

          <GuardedRoute path="/admin" exact >
            <Suspense fallback={<div>Loading...</div>}>
              <SuspendedAdmin />
            </Suspense>
          </GuardedRoute>

          <Route path="/*"> 
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
        </GuardProvider>
    </Router>
    </ErrorBoundary>
  </div>
  );
}

export default connect(function(state, props){
  return {
    user: state?.user,
    token: state?.user?.token
  }
})(App);
