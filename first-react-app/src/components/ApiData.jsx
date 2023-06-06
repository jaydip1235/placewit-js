import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const ApiData = () => {

  const navigate = useNavigate(); 

  const [apidata,setApidata]=useState([]);
  const [val,setVal]=useState(false);

  async function fetchData() {
    setApidata([]);
    const data = await axios.get("https://cat-fact.herokuapp.com/facts");
    console.log(data.data);
    setTimeout(()=>{
          setApidata(data.data);
    },5000);
  
  }   

  const toggle = () =>{
    setVal(!val);
  }

  const test = () =>{
    navigate("/intro")
  }

  useEffect(()=>{
    fetchData()
  },[val])  

  return (
    <>
    {
       apidata.length>0 ? (
            <div>
                <h1>API data:</h1>
                {apidata.map((item)=>(
                    <div>
                        <h2>{item.text}</h2>
                    </div>
                ))}
            </div>
       ):(
        <h1>Loading....</h1>
       )
    }
    <button onClick={toggle}>Change</button>
   
   <button onClick={test}>Go to next page</button>

    </>
  )
}

export default ApiData