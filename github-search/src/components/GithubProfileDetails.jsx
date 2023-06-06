import React from 'react'

const GithubProfileDetails = ({data}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <span className="badge bg-success mx-2">
            {data.followers} Followers
          </span>
          <span className="badge bg-warning mx-2">
            {data.public_repos} Repos
          </span>
          <span className="badge bg-danger mx-2">
            {data.public_gists} Gists
          </span>
          <span className="badge bg-secondary mx-2">
            {data.following} Following
          </span>
        </div>
        <div className="card-body">
          <ul class="list-group">
            <li class="list-group-item">
              NAME : <span className="fw-bold">{data.name}</span>
            </li>
            <li class="list-group-item">
              EMAIL : <span>{data.email}</span>
            </li>
            <li class="list-group-item">
              Location : <span>{data.location}</span>
            </li>
            <li class="list-group-item">Company : {data.company}</li>
            <li class="list-group-item">
              Blog :{" "}
              <span>
                <a href={data.blog}>Click</a>
              </span>
            </li>
            <li class="list-group-item">
              Member since :  
              <span>
                {data.created_at}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default GithubProfileDetails