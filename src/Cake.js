
//var cake_img = "card.jpg"
function Cake(props){
    let showDetails = function(event){
        event.preventDefault()
        
        //console.log(props.details)
        // <CakeDetails />
    }

    //console.log(props.cakedata.image);
    return(
        <div className="card" style={{color: "red"}} onClick={showDetails}>
            <img src={props.cakedata.image} className="card-img-top" alt="..." height="300px" />
            <div className="card-body">
                <h5 className="card-title">{props.cakedata.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="details"></div>
        </div>
    )
}

export default Cake;