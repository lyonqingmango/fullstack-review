const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  _id:Number,
  repoName: String,
  html_url:String,
  description: String,
  username:String,
  stargazers_count: Number,

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB




}

module.exports.save = save;