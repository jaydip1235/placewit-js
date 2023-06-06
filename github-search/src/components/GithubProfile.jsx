import React from 'react'
import GithubProfileCard from './GithubProfileCard'
import GithubProfileDetails from './GithubProfileDetails'
const GithubProfile = ({data}) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h5 text-primary">Github profile Details</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <GithubProfileCard data={data}/>
          </div>
          <div className="col-md-9">
            <GithubProfileDetails data={data}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default GithubProfile