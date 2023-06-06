import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"
let CreateProfile = () => {

  let navigate = useNavigate();
  let [profile, setProfile] = useState({
    image: "",
    company: "",
    website: "",
    location: "",
    designation: "",
    skills: "",
    bio: "",
    githubUserName: "",
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  useEffect(()=>{
    if(!localStorage.getItem("devroom")){
      navigate("/users/login")
    }
  },[])

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfile({
      ...profile,
      image: base64.toString(),
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  let updateInput = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  let submitCreateProfile = async(e) => {
    e.preventDefault();
    await axios.post("https://devroom-backend.onrender.com/api/profiles/", profile, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    });

    Swal.fire("Profile created successfully", "", "success");
    navigate("/profiles/dashboard");
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(profile)}</pre>*/}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-user-circle" /> Create a Profile
              </p>
              <p>Welcome! Create your profile</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={submitCreateProfile}>
                <div className="col-md-5 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img
                      className="rounded mt-5"
                      src={profile.image}
                      style={{ width: "80%" }}
                    />

                    <span className="font-weight-bold">
                      Upload Profile Photo
                    </span>
                    <input
                      type="file"
                      className="text-center form-control"
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    name="company"
                    value={profile.company}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="website"
                    value={profile.website}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Website"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="location"
                    value={profile.location}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Location"
                  />
                </div>
                <div className="form-group">
                  <select
                    name="designation"
                    value={profile.designation}
                    onChange={updateInput}
                    className="form-control"
                  >
                    <option value="">Select Designation</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Tech Lead">Tech Lead</option>
                    <option value="Junior Manager">Junior Manager</option>
                    <option value="Senior Manager">Senior Manager</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    name="skills"
                    value={profile.skills}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Write in comma separated format like C,C++,.."
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={updateInput}
                    rows="3"
                    className="form-control"
                    placeholder="Biography"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="githubUserName"
                    value={profile.githubUserName}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Github link (start with https://)"
                  />
                </div>
                <hr />
                <small>Social Links</small>
                <div className="form-group">
                  <input
                    name="youtube"
                    value={profile.youtube}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="YouTube link (start with https://)"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="twitter"
                    value={profile.twitter}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Twitter link (start with https://)"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="facebook"
                    value={profile.facebook}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Facebook link (start with https://)"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="LinkedIn link (start with https://)"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="instagram"
                    value={profile.instagram}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Instagram link (start with https://)"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="submit"
                    className="btn btn-teal btn-sm mt-2 me-2"
                    value="Create Profile"
                  />
                  <Link
                    to="/profiles/dashboard"
                    className="btn bg-light-grey btn-sm mt-2"
                  >
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default CreateProfile;
