import React, { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";


let UserLogin = () => {
 
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });

  useEffect(()=>{
    if(localStorage.getItem("devroom")){
      navigate("/");
    }
  },[])

  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, emailError: "Enter a proper Email" })
      : setUserError({ ...userError, emailError: "" });
  };

  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() == "")
      setUserError({ ...userError, passwordError: "Enter a proper Password" });
    else setUserError({ ...userError, passwordError: "" });
  };
  let submitLogin = async(event) => {
    event.preventDefault();
    if (user.email !== "" && user.password !== "") {
        let email=user.email;
        let password = user.password;
     const {status,data}=await axios.post('https://devroom-backend.onrender.com/api/users/login',{email,password},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(status==201){
        Swal.fire("Invalid credentials","", "error");
      }else if(status==200){
         Swal.fire("Login successful","", "success");
         localStorage.setItem("devroom", data.token);
         navigate("/developers");
      }
      
    } else {
      Swal.fire("Oh no!", "Something went wrong! Try again", "error");
    }
  };

  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-sign-in-alt" /> Login
              </p>
              <p>Login into Dev-room</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 animated zoomIn">
              <form onSubmit={submitLogin}>
                <div className="form-group">
                  <input
                    name="email"
                    required
                    value={user.email}
                    onChange={validateEmail}
                    type="email"
                    className={`form-control mb-3 ${
                      userError.emailError.length > 0 ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                  />
                  {userError.emailError.length > 0 ? (
                    <small className="text-danger">
                      {userError.emailError}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    required
                    value={user.password}
                    onChange={validatePassword}
                    type="password"
                    className={`form-control mb-3 ${
                      userError.passwordError.length > 0 ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                  />
                  {userError.passwordError.length > 0 ? (
                    <small className="text-danger">
                      {userError.passwordError}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <input
                    type="submit"
                    className="btn btn-teal btn-sm"
                    value="Login"
                  />
                </div>
              </form>
              <small>
                Don't have an account ?
                <Link
                  to="/users/register"
                  className="font-weight-bold text-teal"
                >
                  {" "}
                  Register
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default UserLogin;
