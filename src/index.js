import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "jquery/dist/jquery.slim"
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


//We can make 2 different application in same project like this. But generally we don't do this.
/*let Flights = function(){
  return(<div>Flights Project</div>)
}

ReactDOM.render(
  <React.StrictMode>
    <Flights />
  </React.StrictMode>,
  document.getElementById('flights')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
