var img1 = "nav_img4.jpg"
var img2 = "nav_img5.jpg"
var img3 = "nav_img6.jpg"
var carouselStyle = {
    height: "400px"
}
function Carousel(){
    return(

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img className="d-block w-100" src={img1} alt="First slide" style={carouselStyle} />
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src={img2} alt="Second slide" height="400" />
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src={img3} alt="Third slide" height="400" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>
    )
}

export default Carousel;
