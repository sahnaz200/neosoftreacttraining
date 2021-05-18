import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import Spinner from 'react-spinner-material';
import { toast } from 'react-toastify';

const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />
toast.configure()
function CakeDetails(props){
    let [cakedetails, setCakedetails] = useState({})
    let [cakeIngredients, setcakeIngredients] = useState([])
    const [loading, setLoading] = useState(false);
    let params = useParams()
    var baseurl = process.env.REACT_APP_BASE_URL
    useEffect(()=>{
        setLoading(true);
        let cakedetailsapi = baseurl + "/cake/"+params.cakeid
        axios({
            url:cakedetailsapi,
            method:"get"
        }).then((response)=>{

            setCakedetails(response.data.data)
            setcakeIngredients(response.data.data.ingredients)
            setLoading(false);
        }, (error)=>{
            console.log("response from cakes api : ",error)
            setLoading(false);
        })
    }, [])

    let add_to_cart = () =>{
        if(!props.loggedinStatus){
            props.history.push("/login")
        } else{
            let add_cart_api = baseurl + "/addcaketocart"
            let data = {cakeid:cakedetails.cakeid, name:cakedetails.name, image:cakedetails.image, price:cakedetails.price,weight:cakedetails.weight}
            let token = localStorage.token
            axios({
                url:add_cart_api,
                method:"post",
                data: data,
                headers : {
                    authtoken: token
                }
            }).then((response)=>{
                console.log("response from add to cart api : ", response)
                if(response.data.data){
                    toast.success(response.data.message)
                    props.dispatch({
                        type:"ADD_CART_DATA",
                        new_cake :response.data.data
                    })
                    props.history.push("/cart")
                } else{
                    toast.error(response.data)
                }
            }, (error)=>{
                console.log("error response from add to cart api : ",error)
            })
        }
    }

    return(
        loading ? 
            <div className="spinner-extra-style">
                <Spinner radius={150} color={"rgb(221 173 37 / 80%)"} stroke={12} visible={true} />
            </div>
           :
        <div className="card" style={{margin: "20px 140px"}}>
        <div className="card-body text-center" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
            <div className="row">
                <div className="col-sm-6">
                    <div style={{margin: "10px 60px"}}>
                        <img src={cakedetails.image} 
                        class="card-img-top" alt="..." height="700px" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div style={{margin: "10px 20px"}}>
                        <h1 className="text-uppercase font-weight-bold pt-5 pb-3">{cakedetails.name}</h1>
                        <div className="pb-3">
                            <span className="text-warning">{star} {cakedetails.ratings}</span>
                            <br/><span style={{fontSize: "18px"}}>{cakedetails.reviews} reviews</span>
                        </div>
                        <div className="pb-3">{cakedetails.description}</div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Current price: 
                            <span className="text-warning"> ${cakedetails.price}</span>
                            </span>
                        </div>
                        <div className="pb-3"><span className="font-weight-bold">91%</span> of user enjoyed this product!
                            <span className="font-weight-bold"> (87 votes)</span>
                        </div>

                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Weight: {cakedetails.weight}KG</span></div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Flavour: 
                                <span className="font-italic text-warning"> {cakedetails.flavour}</span>
                            </span>
                        </div>
                        <div className="pb-3 text-uppercase" style={{fontSize: "23px"}}><span className="font-weight-bold">type</span><br/>{cakedetails.type}</div>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-sm-6">
                     {cakeIngredients?.length >0 && <div className="font-weight-bold" style={{fontSize: "18px"}}>Ingredient:</div>} 
                    
                    <div style={{fontSize: "16px"}}>
                        {cakeIngredients?.length >0 && cakeIngredients.map((each, key) => { 
                            if(cakeIngredients.length -1 === key){
                                return(<span>{each}</span>)
                            } else{
                                return(<span>{each + ' | '}</span>)
                            }
                        })}
                    </div>
                </div>
                <div className="col-sm-6" style={{fontSize: "20px"}}>
                    <button onClick={add_to_cart} type="button" class="btn btn-warning text-uppercase p-3 text-white mr-2 font-weight-bold">Add to cart</button>
                    <button type="button" class="btn btn-warning p-3 text-white font-weight-bold">{heart}</button>
                </div>
            </div>
        </div>
        </div>
    )
}
export default connect(function(state, props){
    return {
        loggedinStatus : state?.isloggedin
    }
})(CakeDetails)