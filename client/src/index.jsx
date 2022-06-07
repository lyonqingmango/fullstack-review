import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
// import { withRouter } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      text:'Please update Repos',
    }
   this.seach =this.search.bind(this);

  }

  componentDidMount(){
    this.displayRepos();


  }

  displayRepos(){
    $.ajax({
      type:'GET',
      url: "/repos",
      dataType: 'json',
      success: (data)=>{
        console.log(typeof data+'data type');
        this.setState({repos:data})
      },
      error: (err)=>{console.log('ajax get err'); this.setState({text:'err occur; can not get repos'})}

    })

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify({username:term}),
      // dataType:'json',
      contentType: 'application/json',
      success: (data)=>{
        console.log('results post success'+data);
        this.setState({text:data});
        this.displayRepos()

      },
      error: (err)=>{console.log('err inside search');this.setState({text:'err inside post. it could be repoName that does not exit'})}

    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <p>{this.state.text}</p>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));