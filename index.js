// import express

const express = require('express');
const app = express();

//create port var
const port = 3000 || process.env.PORT;

// import libaries /data
const {schedules, users} = require('./data');
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

app.get('/schedules', (req, res) => {
    res.json(schedules);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

// get specific schedules

app.get('/users/:user_id/schedules',(req,res)=>{
    const index = req.params.user_id;
 
    console.log(typeof index);
    console.log(index);
    // const specificPosts = posts.filter((x) => x.userId === parseInt(index));
    // console.log(specificPosts);
    let specificSchedules = [];
    for (let i = 0; i < schedules.length ; i++){
        if (schedules[i].user_id === Number(index)){
            specificSchedules.push(schedules[i]);
        }

    }
    if (specificSchedules.length > 0) {
        res.send(specificSchedules);
      } else {
        res.json({ msg: 'No posts with that id' });
      }
})

// post new user
app.post ('/users',(req,res)=>{

// destructure var for a user 
const {firstname, lastname, email, password} = req.body

// encrypt the pw with bcryptJS 
// the password been salted 
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);
// store hash in your password DB
//create a new user
const newUser={
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hash
}
//push  newUser to data array and send back newUser
users.send(newUser)
res.json(newUser)
})


//listen to exp app
app.listen(3000);
console.log (`Example app listening at http://localhost:${port}/`);

