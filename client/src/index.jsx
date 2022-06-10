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
      error: (err)=>{console.log('ajax get err'); this.setState({text:err})}
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
        console.log('results post success...'+data);
        if(data){
          this.setState({text:data});
        }else{
          this.setState({text:'Warning :RepoName has already searched so can not update repos list'});
        }
        this.displayRepos()

      },
      error: (err)=>{console.log('err inside search');this.setState({text:'Warning err inside post; RepoName may not exist'})}

    });
    // this.props.history.push('/repos')

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <p>{this.state.text}</p>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));