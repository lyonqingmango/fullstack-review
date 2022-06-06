import React from 'react';

const Repo = (props) => {


  return(
   <li>
     <p> RepoURL {props.repo.html_url} </p>
     <p> Repo description {props.repo.description} </p>
     <p> Repo stargazers_count {props.repo.stargazers_count} </p>
   </li>
    );


}



export default Repo;