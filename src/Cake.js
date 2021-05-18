import { Link } from "react-router-dom";
import {useContext} from 'react'
import { DiscountContext } from './Home'
function Cake(props){

    const context = useContext(DiscountContext)
    console.log("context  : ", context)

    //For class component
    /*static contextType = DiscountContext;
    console.log("context  : ", this.context)*/

    return(
        <div className="card">
            <Link to={'/cake/'+props.cakedata.cakeid}><img src={props.cakedata.image} className="card-img-top" alt="..." height="300px" /></Link>
            <div className="card-body">
                <h5 className="card-title text-warning">{props.cakedata.name}</h5>
            </div>
            <div className="details"></div>
        </div>
    )
}

export default Cake;