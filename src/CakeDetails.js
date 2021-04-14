import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'

const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />
function CakeDetails(){
    return(
        <div className="card" style={{margin: "20px 140px"}}>
        <div className="card-body" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
            <div className="row">
                <div className="col-sm-6">
                    <div style={{margin: "10px 60px"}}>
                        <img src="https://res.cloudinary.com/ashudev/image/upload/v1615290519/tot4h3zt8czwo8lmv7sk.jpg" 
                        class="card-img-top" alt="..." height="700px" />
                    </div>

                </div>
                <div className="col-sm-6">
                    <div style={{margin: "10px 20px"}}>
                        <h1 className="text-uppercase font-weight-bold pt-5 pb-3">Chocolava special</h1>
                        <div className="pb-3">
                            <span className="text-warning">{star} 4.5</span>
                            <br/><span style={{fontSize: "18px"}}>41 reviews</span>
                        </div>
                        <div className="pb-3">A special chocolate filled cake for a party of 20 people.</div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Current price: 
                            <span className="text-warning"> $5000</span>
                            </span>
                        </div>
                        <div className="pb-3"><span className="font-weight-bold">91%</span> of user enjoyed this product!
                            <span className="font-weight-bold"> (87 votes)</span>
                        </div>

                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Weight: 3KG</span></div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Flavour: 
                                <span className="font-italic text-warning"> Hazelnut cake</span>
                            </span>
                        </div>

                        <div className="pb-3 text-uppercase" style={{fontSize: "23px"}}><span className="font-weight-bold">type</span><br/>general</div>

                        
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="font-weight-bold" style={{fontSize: "18px"}}>Ingredient:</div>
                    <div style={{fontSize: "16px"}}>cream | chocolate | dark chocolate | hazelnut | strawberry</div>
                    
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