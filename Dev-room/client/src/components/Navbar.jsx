import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

let Navbar = () => {
  let navigate = useNavigate();

  const [user,setUser]=useState({});

  const getUser = async() =>{
    const { data } = await axios.get("https://devroom-backend.onrender.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    });
    setUser(data.user)
  }

  useEffect(()=>{
 if(localStorage.getItem("devroom"))
    getUser();

  },[]);

  let clickLogOut = async() => {
    localStorage.removeItem("devroom");
    navigate("/users/login");
  };

  let beforeLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/users/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users/login" className="nav-link">
          Login
        </Link>
      </li>
    </React.Fragment>
  );

  let afterLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/posts/list" className="nav-link">
          <i className="fa fa-list" /> Posts
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/profiles/dashboard" className="nav-link">
          <i className="fa fa-sitemap" /> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <img
            src={user.avatar}
            alt=""
            width="25"
            height="25"
            className="rounded-circle"
          />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={clickLogOut}>
          LogOut
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fa fa-code" /> Dev-room
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/developers" className="nav-link">
                  <i className="fa fa-user-tie" /> Developers
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {localStorage.getItem("devroom") ? afterLogin : beforeLogin}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
