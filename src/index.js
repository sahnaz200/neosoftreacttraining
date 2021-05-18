import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "jquery/dist/jquery.slim.min"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Provider} from 'react-redux'
import BiggBazar from './reduxstore/store'
import { config } from '@fortawesome/fontawesome-svg-core';
import axios from "axios"
axios.defaults.headers.common["Authorization"]="Auth Token"
axios.interceptors.request.use((config)=>{
  //alert("in axios request interceptors")
  /*var token = localStorage.token
  if(token){
    config.headers["authtoken"] = token
  }*/
  return config
},(error)=>{
  alert("in axios error")
  Promise.reject(error)
})

/*axios.interceptors.response.use((response)=>{
  //alert("in axios response interceptors")
  return response
},(error)=>{
  alert("in axios error")
  Promise.reject(error)
})*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={BiggBazar}>
      <App ></App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
