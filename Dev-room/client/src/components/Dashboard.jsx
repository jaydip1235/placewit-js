import React, { useEffect,useState } from "react";

import Spinner from "./Spinner";

import { Link,useNavigate } from "react-router-dom";
import  axios  from 'axios';
import Swal from "sweetalert2";

let Dashboard = () => {
    const [user,setUser]=useState({});
    const [profile,setProfile] = useState({});
    const [loading,setLoading] = useState(true);
    const [loggedIn,setLoggedIn] = useState(false);
    let navigate = useNavigate();
   
    useEffect(() => {
      if (!localStorage.getItem("devroom")) {
        navigate("/users/login");
      }
      setLoggedIn(true);
    }, []);


   const getProfile = async() =>{
    let {status,data} = await axios.get("https://devroom-backend.onrender.com/api/profiles/me",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    })
     console.log(data)
    if (status==200) setProfile(data.profile);

  }

  const getUser =async()=>{
  let { data } = await axios.get("https://devroom-backend.onrender.com/api/users/me", {
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${localStorage.getItem("devroom")}`,
   },
 });
 setUser(data.user);
 console.log(data.user);
 setLoading(false);
  }


  useEffect(() => {
    if(loggedIn) {
    getUser();
    getProfile();
    }
  }, [loggedIn]);


  let clickDeleteExperience = async(experienceId) => {
    const {data} = await axios.delete(`https://devroom-backend.onrender.com/api/profiles/experience/${experienceId}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    })
    Swal.fire("Experience deleted", "", "success");
    setProfile(data.profile);
  };

  let clickDeleteEducation = async(educationId) => {
   const { data } = await axios.delete(
     ` https://devroom-backend.onrender.com/api/profiles/education/${educationId}`,
     {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("devroom")}`,
       },
     }
   );
    Swal.fire("Education deleted", "", "success");
    setProfile(data.profile);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-teal">
                    <i className="fa fa-sitemap" />
                    Dashboard
                  </p>
                  {Object.keys(user).length > 0 && (
                    <p className="h5">Welcome {user.name}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
          {Object.keys(profile).length > 0 ? (
            <React.Fragment>
              <section>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <Link
                        to="/profiles/edit-profile"
                        className="btn btn-primary text-white btn-sm me-2"
                      >
                        <i className="fa fa-user-cog" /> Edit Profile
                      </Link>
                      <Link
                        to="/profiles/add-experience"
                        className="btn btn-success text-white btn-sm me-2"
                      >
                        <i className="fa fa-user-tie" /> Add Experience
                      </Link>
                      <Link
                        to="/profiles/add-education"
                        className="btn btn-info text-white btn-sm"
                      >
                        <i className="fa fa-graduation-cap" /> Add Education
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              {/* Experience Details */}
              <section>
                {profile.experience.length > 0 && (
                  <div className="container ">
                    <div className="row">
                      <div className="col">
                        <p className="h3 text-teal mt-5">Experience Details</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover text-center table-light table-striped ">
                            <thead className="thead-dark text-secondary">
                              <tr>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {profile.experience.map((exp) => {
                                return (
                                  <tr key={exp._id}>
                                    <td>{exp.title}</td>
                                    <td>{exp.company}</td>
                                    <td>{exp.location}</td>
                                    <td>{exp.from}</td>
                                    <td>
                                      {exp.to != " " ? exp.to : "Current"}
                                    </td>
                                    <td>
                                      <button
                                        onClick={clickDeleteExperience.bind(
                                          this,
                                          exp._id
                                        )}
                                        className="btn btn-danger btn-sm"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section>
                {profile.education.length > 0 && (
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p className="h3 text-teal mt-5">Education Details</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive">
                          <table className="table table-hover  table-bordered text-center table-light table-striped">
                            {/* <table classname="table-responsive-lg"> */}
                            <thead className="thead-dark text-teal">
                              <tr>
                                <th>School</th>
                                <th>Degree</th>
                                <th>Field Of Study</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {profile.education.map((edu) => {
                                return (
                                  <tr key={edu._id}>
                                    <td>{edu.school}</td>
                                    <td>{edu.degree}</td>
                                    <td>{edu.fieldOfStudy}</td>
                                    <td>{edu.from}</td>
                                    <td>
                                      {edu.to != " " ? edu.to : "Current"}
                                    </td>
                                    <td>
                                      <button
                                        onClick={clickDeleteEducation.bind(
                                          this,
                                          edu._id
                                        )}
                                        className="btn btn-danger btn-sm"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <section>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <small>
                        You don't have a profile yet! , please create one.
                      </small>
                      <br />
                      <Link
                        to="/profiles/create-profile"
                        className="btn btn-secondary text-white btn-sm"
                      >
                        <i className="fa fa-user-cog" /> Create Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Dashboard;
