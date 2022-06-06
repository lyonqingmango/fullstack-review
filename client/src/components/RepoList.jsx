import React from 'react';
import  Repo from '../components/Repo.jsx';
const RepoList = (props) => {

  console.log('props.repos'+props.repos)

  return(
    <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
      <ul>
      {props.repos.map((repo, key)=> <Repo repo={repo} key = {key}/>
      )}
      </ul>
    </div>

    );
}

export default RepoList;