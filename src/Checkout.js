import {
    Route,
    Link,
    useRouteMatch,
    withRouter
  } from "react-router-dom";
import CartSummary from './CartSummary'
import Address from './Address'
import Payment from './Payment'
import Order from './Order'
import {connect} from 'react-redux'
import $ from 'jquery';
import { useEffect } from "react";

function Checkout(props){
    var LinkClass = "px-2 py-3 border-top border-bottom "
    var route = useRouteMatch();
    var url = route.url
    var path = route.path

    useEffect(() => {
        disableLinks()
        if(props.clicked_step <= props.checkout_step){
            for (var i = 0; i < props.checkout_step; i++) {
                enableLinks(i, 'light-warning')
            }
            enableLinks(props.clicked_step -1, 'bg-warning') 
        } 
    }, []);

    function enableLinks(index, bgColor){
        $('ul.checkout-navbar > a:eq('+ index +')')
                    .removeClass('cursor-default');
        $('ul.checkout-navbar > a > li:eq('+ index +')')
                    .removeClass('bg-light disabled-link text-muted');
        $('ul.checkout-navbar > a > li:eq('+ index +')')
                    .addClass(bgColor + ' text-white');
    }

    function disableLinks(){
        $('ul.checkout-navbar > a')
                    .addClass('cursor-default');
        $('ul.checkout-navbar > a > li')
                    .addClass('bg-light disabled-link text-muted');
    }

    const navbarLink = (url, link_index, event) => {
        event.preventDefault()
        if(link_index <= props.checkout_step){
            props.dispatch({
                type: "UPDATE_CHECKOUT_STEP",
                click_no: link_index
            });
            props.history.push(url);
        }
      };
    
    return(
        <div className="row">
            <div className="col-sm-2" >
                <nav class="sidebar shift">
                    <h4 className="text-center py-4 mt-4 checkout-heading">Checkout Steps</h4>
                        <ul class="nav navbar-nav text-center nav-bar-style checkout-navbar">
                            <Link className="text-decoration-none" onClick={(e) => {navbarLink(url, 1, e);}}><li className={LinkClass }>Cart Summary</li></Link>
                            <Link className="text-decoration-none" onClick={(e) => {navbarLink(url + "/address", 2, e);}}><li className={LinkClass}>Address</li></Link>
                            <Link className="text-decoration-none" onClick={(e) => {navbarLink(url + "/payment", 3, e);}}><li className={LinkClass }>Payment</li></Link>
                            <Link className="text-decoration-none" onClick={(e) => {navbarLink(url + "/order", 4, e);}}><li className={LinkClass }>Order</li></Link>
                        </ul>
                </nav>
            </div>
            <div className="col-sm-10">
                {/* Child routing */}
                <Route path={path} exact><CartSummary loading={props.loading}/></Route>
                <Route path={path + "/address"} exact><Address /></Route>
                <Route path={path + "/payment"} exact><Payment  /></Route>
                <Route path={path + "/order"} exact><Order  /></Route>
            </div>
        </div>
    )
}
Checkout = withRouter(Checkout)
export default connect(function(state, props){
    return {
        checkout_step : state?.checkout_step,
        clicked_step: state?.clicked_step
    }
})(Checkout)