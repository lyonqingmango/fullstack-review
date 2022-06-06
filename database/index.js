const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher',{ useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('Connected to MongoDB...')).catch((err) => console.error("Coudn't connect MongoDB....", err));;


let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  _id:Number,
  repoName: String,
  html_url:String,
  description: String,
  username:String,
  stargazers_count: Number,

})

let Repo = mongoose.model('Repo', repoSchema);



let save = async(repos) => {

  // await Repo.deleteMany();
  let reposData =repos.data
  let reposArr= [];

  const doesUserExit = await Repo.exists({username:reposData[0].owner.login})
  if(!doesUserExit){
    for(var i=0;i<reposData.length;i++){
        reposArr.push({
          repoName:reposData[i].name,
          html_url:reposData[i].html_url,
          description: reposData[i].description,
          username:reposData[i].owner.login,
          stargazers_count:reposData[i].stargazers_count,
        })
      }
      console.log('reposArr'+reposArr.length);
      Repo.insertMany(reposArr)
        .then(function () {
            console.log('data inserted');
        })
        .catch(function (err) {
            response.status(500).send(err);
        });

  }else{
    console.log('data exist')
  }


}

let selectRepos = ()=> Repo.find().sort({stargazers_count: 'desc'}).limit(100);


module.exports = {
  save,
  selectRepos,
}