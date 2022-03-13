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
const res = require('express/lib/response');
// const res = require('express/lib/response');

//logging middleware
app.use(morgan('dev'));

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Static files
// app.use(express.static(path.join(__dirname, 'public')))
// EJS CONFIG
// app.set ('view engine','ejs');
// app.set('views','./views');

//ROOT

app.get ('/',(require,res)=>{
    res.send('Welcome to our schedule website')
});


app.get ('/schedules', (req,res) =>{
  res.json(schedules);
})


  app.get('/users', (req, res) => {
    res.json(users);
    // console.log(users[2].firstname) why does not work?
  });

  // get specific user
  app.get('/users/:user_id', (req, res) => {

    const index = req.params.user_id
    // the params of the user_id is required 
    const result = users[index] 
    console.log(result)         // users[index] in the array equal to the result
  // })

    // validation to confirm number has been entered
    
   let specificUsers =[]
   for (i = 0 ; i < users.length ; i++) {
      if (users[i].user_index  == index){
        specificUsers.push(users[i]);
        res.send(result)
    }
    
     if (index >= users.length){
        res.status(400).json(`msg: User ${index} is not found`)}
      }
  })

  



// get specific schedules
app.get('/users/:user_id/schedules',(req,res)=>{
    const index = req.params.user_id;
    console.log(typeof index);
    console.log(index);
    // const specificPosts = posts.filter((x) => x.userId === parseInt(index));
    // console.log(specificPosts);
    // an empty array will be pushed with the user_id parameter matched in the 
    //loop, onstead the schedules pushed to the new empty array
    let specificSchedules = [];
    for (let i = 0; i < schedules.length ; i++){
        if (schedules[i].user_id === Number(index)){
            specificSchedules.push(schedules[i]);
        }

    }
    if (specificSchedules.length > 0) {
        res.send(specificSchedules);
      } else {
        res. status (400).json(`msg: User ${index} is not found`);
      
}
})

// // post new user
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
// port is listening to the function 
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})