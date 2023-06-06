import React from 'react'

const GithubRepos = ({data}) => {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className="h5 text-primary">Github Repos Details</p>
            <div className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, veniam! Modi dicta necessitatibus quisquam cupiditate, esse cum fugit assumenda reiciendis velit itaque officia voluptate accusantium corporis eaque id perferendis voluptatibus!
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <p className="h4">Your repositories</p>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {data.map((repo)=>{
                                return (
                                  <>
                                    <li className="list-group-item">
                                      <div className="d-flex justify-content-between">
                                        <span className="h5">
                                          <a href={repo.html_url}>
                                            {repo.name}
                                          </a>
                                        </span>
                                        <span>
                                          <span className="badge bg-success me-5">
                                            {repo.stargazers_count} stars
                                          </span>
                                          <span className="badge bg-warning">
                                            {repo.watchers_count} watchers
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                  </>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </>
  );
}

export default GithubRepos