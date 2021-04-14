import Carousel from './Carousel';
import Cake from './Cake';
//import cakes from './data';
import CakeDetails from './CakeDetails';
//import {useState} from 'react';
import axios from "axios"
import {useState, useEffect} from 'react';

var obj={
    name: "Extreme Chocolate Cake",
    image: "card1.jpg",
    price: 900,
    id: "ge6436367h"
}

function Home(){

    let apiurl ="https://apibyashu.herokuapp.com/api/allcakes"
    var [cakes,setCakes]=useState();  

    useEffect(()=>{
        axios({
            url:apiurl,
            method:"get"
        }).then((response)=>{
            console.log("response from cakes api : ",response.data)
            setCakes(response.data.data)
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    },[])
    return(
        <div>
            <Carousel></Carousel>
            <CakeDetails />
            <div className="row text-center">
                
                {/* <div className="col-sm-2"><Cake name="chocholate Tuffle" image="card.jpg"/></div> */}
                {/* <div className="col-sm-2"><Cake cakedata={obj} /></div> */}
                {cakes?.length >0 && cakes.map((each,index) => { //here ? means if cakes is undefined then it will not going to check it's length
                    //var [details,setDetails]=useState(each);
                    return(<div className="col-sm-2"><Cake cakedata={each} key={index} /></div>)
                })}
                {/* <div className="col-sm-2"><Cake  /></div>
                <div className="col-sm-2"><Cake  /></div>
                <div className="col-sm-2"><Cake  /></div>
                <div className="col-sm-2"><Cake  /></div> */}
            </div>

            

            
        </div>
    )
}

export default Home