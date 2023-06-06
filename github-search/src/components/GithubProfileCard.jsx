import React from 'react'

const GithubProfileCard = ({data}) => {
  return (
    <>
    <div className="card">
        <img src={data.avatar_url} className="img-fluid"/>
        <div className="card-body">
            <p className="h4">{data.name}</p>
            <small>{data.bio}</small>
            <br/>
            <a href={data.html_url} className="btn btn-success bin-sm" target="_blank">Profile</a>
        </div>
    </div>
    </>
  )
}

export default GithubProfileCard