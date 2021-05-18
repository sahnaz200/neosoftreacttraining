
import React, {useState, useEffect} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from "axios"
import Spinner from 'react-spinner-material';
import "./mdb/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Admin = () => {
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

    const data = {
        columns: [
          {
            label: 'ID',
            field: 'cakeid',
            sort: 'asc',
            width: 150
            },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Price',
            field: 'price',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Image',
            field: 'image',
            sort: 'disabled',
            width: 150
          },
        ],
        rows: cakes.map(data => (
            {
                cakeid: data.cakeid,
                name: data.name,
                price: data.price,
                image: <div style={{height:"40px", width:"40px"}}><img src={data.image} className="card-img-top" alt="..." height="40px" /></div>,
            }
        ))
    }

  return (
    loading ? 
    <div className="spinner-extra-style">
        <Spinner radius={150} color={"rgb(221 173 37 / 80%)"} stroke={12} visible={true} />
    </div>
   :
      <div style={{margin: "0px 100px"}}>
        <h3 className="text-center pt-4"><u>All Cakes</u></h3>
        <MDBDataTable
        striped
        bordered
        small
        data={data}
        />
    </div>
  );
}

export default Admin;