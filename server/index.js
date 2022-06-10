const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const {getReposByUsername} = require('../helpers/github.js');
const {save, selectRepos} = require('../database/index.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));



app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('req.body'+JSON.stringify(req.body.username));
  console.log('req.body without'+req.body.username);

  getReposByUsername(req.body.username)
  .then((repos)=> save(repos, (err,results)=>{
    if(err){
      res.status(500).send('err inside save')
  }else{
    res.status(201).send(results)

  }}))
  .catch((err)=>{console.log('err inside post');res.status(500).send(err)})
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  selectRepos()
  .then((result) => {
    res.send(result);
  })
  .catch(err => {
        res.sendStatus(500);
      })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

