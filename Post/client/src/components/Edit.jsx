import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Edit = () => {
  let naviagte = useNavigate();
  let postId = useParams().postId;
  const [post, setPost] = useState({
    name: "",
    text: "",
    image: "",
  });

  const updateInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const editPost = async () => {
    const {data} = await axios.put(`/api/${postId}`, post, {
      headers: { "Content-Type": "application/json" },
    });
    Swal.fire(data.msg, "", "success");
    naviagte("/");
  };

  const getPost = async () => {
    const { data } = await axios.get(`/api/${postId}`);
    setPost({
      name:data.post.name,
      text :data.post.text,
      image:data.post.image
    });

  };

  useEffect(()=>{
    getPost();
  },[])

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
        <button className="btn btn-success" onClick={editPost}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Edit;
