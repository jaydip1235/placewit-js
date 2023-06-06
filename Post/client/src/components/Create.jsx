import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
const Create = () => {
  let naviagte = useNavigate();
  const [post,setPost]=useState({
    name:"",
    text:"",
    image:""
  });

  const updateInput = (e) =>{
    setPost({...post,[e.target.name]:e.target.value});
  }

  const createPost = async()=>{
    await axios.post("/api", post, {headers:{"Content-Type": "application/json"}});
    Swal.fire("Post created successfully","","success");
    naviagte("/");
  }


  return (
    <>
      <div className="conatiner">
        <div className="input-group mb-3">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            value={post.name}
            onChange={updateInput}
          />
        </div>
        <div className="input-group mb-3">
          <input
            name="text"
            type="text"
            className="form-control"
            placeholder="Text"
            aria-label="Text"
            aria-describedby="basic-addon1"
            value={post.text}
            onChange={updateInput}
          />
        </div>
        <div className="input-group mb-3">
          <input
            name="image"
            type="text"
            className="form-control"
            placeholder="Image URL"
            aria-label="Image"
            aria-describedby="basic-addon1"
            value={post.image}
            onChange={updateInput}
          />
        </div>
        <button className="btn btn-success" onClick={createPost}>Create</button>
      </div>
    </>
  );
};

export default Create;
