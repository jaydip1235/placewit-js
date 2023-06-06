import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

let UserRegister = () => {


  const navigate = useNavigate();

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  let validateUsername = (event) => {
    setUser({ ...user, name: event.target.value });
    let regExp = /^[a-zA-Z0-9]/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, nameError: "Enter a proper Username" })
      : setUserError({ ...userError, nameError: "" });
  };

  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value) || event.target.value.trim() == ""
      ? setUserError({ ...userError, emailError: "Enter a proper Email" })
      : setUserError({ ...userError, emailError: "" });
  };

  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() == "")
      setUserError({ ...userError, passwordError: "Enter a proper Password" });
    else setUserError({ ...userError, passwordError: "" });
  };

  let submitRegistration = async(event) => {
    event.preventDefault();
    if (
      user.name.trim() !== "" &&
      user.email.trim() !== "" &&
      user.password.trim() !== ""
    ) {
     let name = user.name.trim();
     let email = user.email.trim();
     let password = user.password.trim();

   const { status } = await axios.post(
     "https://devroom-backend.onrender.com/api/users/register",
     { name, email, password },
     {
       headers: {
         "Content-Type": "application/json",
       },
     }
   );
   console.log(status);
  if (status == 201){
    Swal.fire("User already exists","", "error");
    return;
  }else if(status == 200){
     Swal.fire("Registration successful","", "success");
     navigate("/users/login");
  } 
      console.log(user);
    } else {
       Swal.fire("Oh no!", "Something went wrong! Try again", "error");
    }
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(userError)}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-user-shield" /> Registration
              </p>
              <p>Register to Dev-room</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col-md-8">
              <form onSubmit={submitRegistration}>
                <div className="form-group">
                  <input
                    required
                    name="name"
                    value={user.name}
                    onChange={validateUsername}
                    type="text"
                    className={`form-control mb-3 ${
                      userError.nameError.length > 0 ? "is-invalid" : ""
                    }`}
                    placeholder="Name"
                  />
                  {userError.nameError.length > 0 ? (
                    <small className="text-danger">{userError.nameError}</small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <input
                    required
                    name="email"
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
                    required
                    name="password"
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
                    value="Register"
                  />
                </div>
              </form>
              <small>
                Already have an account ?
                <Link to="/users/login" className="font-weight-bold text-teal">
                  {" "}
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default UserRegister;
