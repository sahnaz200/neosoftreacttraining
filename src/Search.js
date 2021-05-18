import {useState, useEffect} from 'react';
import Cake from './Cake';
import axios from "axios"
function Search(props){
    var [cakes,setCakes]=useState([]);  
    var [error,setError]=useState('')
    const query = new URLSearchParams(props.location.search)
    const cake = query.get('cake')
    var baseurl = process.env.REACT_APP_BASE_URL
    useEffect(()=>{
        console.log("use effect run ")
        setError('')
        let searchcakes =baseurl + "/searchcakes?q="+cake
        axios({
            url:searchcakes,
            method:"get"
        }).then((response)=>{
            console.log("response from search cakes api : ", response.data.data)
            setCakes(response.data.data)
            
            if(response.data.data.length ==0){
                setError("No result found. Please try some other cakes.")
            }
        }, (error)=>{
            console.log("error from search cakes api : ",error)
        })
    },[props.location.search])

    return(
        <div>
            <div className="row text-center my-3">
                {cakes?.length >0 && cakes.map((each,index) => { 
                    return(<div className="col-sm-2"><Cake cakedata={each} key={index} /></div>)
                })}
                {error && <div className="alert alert-danger text-center mx-auto" >{error}</div>}
            </div>
        </div>
    )
}

export default Search;