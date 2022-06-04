import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
   this.seach =this.search.bind(this);

  }

  componentDidMount(){
    $.ajax({
      type:'GET',
      url: "/repos",
      dataType: 'json',
      success: (data)=>{
        console.log(typeof data+'data type')
        this.setState({repos:data})
      },
      error: (err)=>(console.log('ajax get err'))

    })

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify({username:term}),
      dataType:'json',
      contentType: 'application/json',
      success: (results)=>{
        console.log('ajax post success   '+ results)
        this.setState({repos:results})
      },
      error: (err)=>(console.log('ajax post err'))

    });
    // $.ajax({
    //   url: '/repos',
    //   type: 'POST',
    //   data: {username: term},
    //   contentType: 'application/json',
    //   success: (data) => {
    //     console.log('data from server', data);
    //   }
    // })




  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));