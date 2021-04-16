import {
    useParams
  } from "react-router-dom";
import {
    useState, useEffect
  } from "react";
import axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'

const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />
function CakeDetails(){
    let [cakedetails, setCakedetails] = useState({})
    let [cakeIngredients, setcakeIngredients] = useState([])
    let params = useParams()
    useEffect(()=>{
        let cakedetailsapi = "https://apibyashu.herokuapp.com/api/cake/"+params.cakeid
        axios({
            url:cakedetailsapi,
            method:"get"
        }).then((response)=>{
            //console.log("response from cakes api : ",response.data.data)
            setCakedetails(response.data.data)
            setcakeIngredients(response.data.data.ingredients)
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    }, [])

    /*let arr = ["kajol", "fahim", "soumik"]

    useEffect(()=>{
        let cakedetails1 = cakedetails.ingredients
        console.log("cakedetails1 : ",cakedetails1)

        

        let arr1 = ['aa', 'bb']
        arr1 = [arr1, ...arr]
        console.log("arr1 : ",arr1)
        
        //let aa = [...arr]
        //console.log("aa : ", aa)

        

        arr1.map((each, key) => { 
            console.log("arr1 key : value - ",key, each )
        })


        

    }, [cakedetails])*/
    

    return(
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
                    <button type="button" class="btn btn-warning text-uppercase p-3 text-white mr-2 font-weight-bold">Add to cart</button>
                    <button type="button" class="btn btn-warning p-3 text-white font-weight-bold">{heart}</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CakeDetails;