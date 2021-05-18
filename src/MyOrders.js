import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import $ from 'jquery';
import Spinner from 'react-spinner-material';

function MyOrders(props) {
    const [pageNumber, setPageNumber] = useState(0);
    const ordersPerPage = 10;
    const pagesVisited = pageNumber * ordersPerPage;
    useEffect(() => {
        props.dispatch({
            type:"FETCH_ORDER"
        })
    }, []);

    useEffect(() => {
        
        $('[rel="popover"]').popover({ 
            html : true,
            trigger: "hover",
            content: function() {
              return $(this).find('span').html();
            }
          })
    }, [props.myOrders]);

    function show_date(InputDate){
        var dt = new Date(InputDate);
        return dt.getDate() + " " + dt.toLocaleString('default', { month: 'long' }) + " " + dt.getFullYear();
    }

  const displayOrders = 
  <div style={{margin: "0px 300px"}}>
        { 
        props.myOrders?.length > 0 ?
            props.myOrders.slice(pagesVisited, pagesVisited + ordersPerPage).map((each,index) => {
                
                var each_order_length = each.cakes.length
                var status_pending = each.pending
                var status_completed = each.compeleted
                return(
                    <div class={"card mt-3 " + (((ordersPerPage -1) == index) || props.myOrders.slice(-1) ? "mb-4" : "")}>
                        <div class="card-header">
                            <div className="row text-secondary">
                                <div className="col-sm-2"><span className="text-uppercase">Order placed</span><br/><span className="font-500">{show_date(each.orderdate)}</span></div>
                                <div className="col-sm-2"><span className="text-uppercase">Total</span><br/><span className="font-500">${each.price.toLocaleString()}</span></div>
                                <div className="col-sm-2"><span className="text-uppercase">Ship to</span><br/>
                                    <a href="#" rel="popover" className="font-500" data-placement="bottom">{each.name} 
                                        <span className="d-none">
                                            <b>{each.name}</b>
                                            <div>{each.address}</div>
                                            <div>{each.city}, {each.pincode}</div>
                                            <div>Phone: {each.phone}</div>

                                        </span>
                                    </a>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <span className="text-uppercase">Order # {each.orderid}</span><br/>
                                    <span>Status: {status_pending ? 'Pending' : 'Completed'}</span>
                                </div>
                            </div>
                        </div>
                         
                        <div class="card-body">
                         
                        { each.cakes.map((each,index) => {
                            
                            return(
                                <div className={"row p-2 " + (((each_order_length -1) == index) ? "border" : "border border-bottom-0")}>
                                    <div className="col-sm-1" style={{fontWeight:"500", display: "flex"}}>
                                        <div style={{width:"70px", height: "70px", margin:"auto"}}><img src={each.image} height="70px" className="card-img-top" alt="..." /> </div>
                                        
                                    </div>
                                    <div className="col-sm-4 text-left" style={{fontWeight:"500"}}>{each.name}<br/>Price : {each.price}</div>
                                    
                                    <div className="col-sm-7 text-right" style={{fontWeight:"500"}}>
                                        {status_completed && <Link to={"/cake/" + each.cakeid}><button type="button" class="btn btn-success" style={{marginTop: "10px"}}>Buy it again</button></Link>}
                                        {/* {status_pending && <button type="button" class="btn btn-danger" style={{marginTop: "10px"}}>Cancel</button>} */}
                                    </div>
                                </div>
                            )
                        })

                        }
                            
                        </div>
                    </div>
                )}) : 
            <div className="border m-5 p-5 text-center text-secondary" style={{fontWeight:"500", backgroundColor: "rgba(0,0,0,.03)", fontSize: "22px"}}>
                <span>No order placed yet.</span>
            </div>
            }
        </div>
            ;

  const pageCount = Math.ceil(props.myOrders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    $(window).scrollTop(0);
  };

  return (
    props.loading ? (
        <div className="spinner-extra-style">
            <Spinner radius={150} color={"rgb(221 173 37 / 80%)"} stroke={12} visible={true} />
        </div>
      ) :

    <div className="MyOrders">
      
      <div style={{margin: "auto 20px auto auto", width: "fit-content"}}>
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />
      </div>
      {displayOrders}
    </div>
  );
}

MyOrders = withRouter(MyOrders)
export default connect(function(state, props){
    
    var myOrders_array = [...state['order_data']]
    //console.log("myOrders_array : ", myOrders_array)
    return {
        myOrders: myOrders_array.reverse(),
        loading: state['isfetching']
    }
})(MyOrders);