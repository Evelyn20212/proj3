// import express

const express = require('express');
const app = express();

//create port var
const port = 3000 || process.env.PORT;

// import libaries /data
const {users, posts} = require('./data');
let morgan = require ('morgan');
let ejs = require ('ejs');
const path = require ('path');
// const res = require('express/lib/response');

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//logging middleware
app.use(morgan('dev'));
// Static files
// app.use(express.static(path.join(__dirname, 'public')))
// EJS CONFIG
app.set ('view engine','ejs');
app.set('views','./views');

//ROOT

app.get ('/',(req,res)=>{
    res.json('Welcome to our schedule website')
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
  });

  app.get('/api/users', (req, res) => {
    res.json(users);
  });

// get specific post 

app.get('/api/posts/:id',(req,res)=>{
    const index = req.params.id;
    console.log(typeof index);
    // const specificPosts = posts.filter((x) => x.userId === parseInt(index));
    // console.log(specificPosts);
    let specificPosts = [];
    for (let i = 0; i < posts.length ; i++){
        if (posts[i].userId === Number(index)){
            specificPosts.push(posts[i]);
        }

    }
    if (specificPosts.length > 0) {
        res.send(specificPosts);
      } else {
        res.json({ msg: 'No posts with that id' });
      }
})


//listen to exp app
app.listen(3000);
console.log (`Example app listening at http://localhost:${port}/`);

