import React from 'react';

const Repo = (props) => {


  return(
   <li>
     <a href= {props.repo.html_url} > {props.repo.repoName} </a>
     <p> Repo description: {props.repo.description} </p>
     <p> Repo stargazers_count: {props.repo.stargazers_count} </p>
   </li>
    );


}



export default Repo;