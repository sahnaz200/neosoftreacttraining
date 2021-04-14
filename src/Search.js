import {useState} from 'react';
import Cake from './Cake';
import axios from "axios"
function Search(){

    
    var [cakes,setCakes]=useState();  
    var [error,setError]=useState('')
    var [search, setSearch]=useState()
    let getText=(event)=>{
        setSearch(event.target.value)
    }
    function makeSearch(){
        setError('')
        let searchcakes ="https://apibyashu.herokuapp.com/api/searchcakes?q="+search
        axios({
            url:searchcakes,
            method:"get"
        }).then((response)=>{
            //console.log("response from cakes api : ",response.data.data)
            setCakes(response.data.data)
            
            if(response.data.data.length ==0){
                setError("No result found")
            }

        }, (error)=>{
            console.log("response from cakes api : ",error)
            

        })
    }

    return(
        <div>
            <hr/>
            <div style={{"width":"50%", "margin":"auto"}}>
                <div className="form-group">
                    <label>Search Cakes</label>
                    <input type="text" class="form-control" onChange={getText} placeholder="Eneter text ...."></input>
                </div>
                <button className="btn btn-primary" onClick={makeSearch}>Search</button>
            </div>
            
            <div className="row text-center my-3">
                {cakes?.length >0 && cakes.map((each,index) => { 
                    return(<div className="col-sm-2"><Cake cakedata={each} key={index} /></div>)
                })}

                {error && <div className="alert alert-danger text-center mx-auto" >{error}</div>}
            </div>
            <hr/>
            
        </div>
    )
}

export default Search;