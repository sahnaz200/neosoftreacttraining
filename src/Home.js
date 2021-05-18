import Carousel from './Carousel';
import Cake from './Cake';
import axios from "axios"
import React, {useState, useEffect} from 'react';
import Spinner from 'react-spinner-material';
export const DiscountContext = React.createContext()

function Home(){
    var baseurl = process.env.REACT_APP_BASE_URL
    let apiurl =baseurl + "/allcakes"
    var [cakes,setCakes]=useState([]);  
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        axios({
            url:apiurl,
            method:"get"
        }).then((response)=>{
            setCakes(response.data.data)
            setLoading(false);
            
        }, (error)=>{
            console.log("response from cakes api : ",error)
            setLoading(false);
        })
    },[])
    return(
         loading ? 
            <div className="spinner-extra-style">
                <Spinner radius={150} color={"rgb(221 173 37 / 80%)"} stroke={12} visible={true} />
            </div>
           :
            <React.Fragment>
                <Carousel></Carousel>
                <div className="row text-center">
                    {cakes?.length >0 && cakes.map((each,index) => {
                        return(<DiscountContext.Provider value="hiii">
                            <div className="col-sm-2 mb-3"><Cake cakedata={each} key={index} /></div>
                        </DiscountContext.Provider>)
                    })}
                </div>
            </React.Fragment>
    )
}

export default Home
