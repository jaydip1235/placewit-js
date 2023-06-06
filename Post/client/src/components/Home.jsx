import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPosts = async () => {
    let { data } = await axios.get("/api");
    setPosts(data.posts);
    setLoading(false);
  };

 const deletePost = async(postId) =>{
    await axios.delete(`/api/${postId}`);
    getPosts();
 } 

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
    <Link to="/create">Create post</Link>
      {loading == true ? (
        <h3>Loading.....</h3>
      ) : (
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between">
              {posts.length > 0 &&
                posts.map((post) => {
                  return (
                    <div className="card" key={post._id}>
                      <img
                        src={post.image}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{post.name.slice(0, 30)}</h5>
                        <p className="card-text">{post.text.slice(0, 50)}</p>
                        <Link
                          to={`/view/${post._id}`}
                          className="btn btn-primary me-2"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit/${post._id}`}
                          className="btn btn-success me-2"
                        >
                          Edit
                        </Link>
                        <button className="btn btn-danger" onClick={deletePost.bind(this,post._id)}>Delete</button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
