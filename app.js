// import express

const express =require('express');
const app = express();

//create port var
const port = 3000 || process.env.PORT;

// import libaries /data
const {schedules, users} = require('./data');
let morgan = require ('morgan');
const path = require ('path');
const bcrypt = require ('bcryptjs')
const ejs = require ('ejs');

// 
const db = require('./database')



//logging middleware
app.use(morgan('dev'));

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Static files
app.use(express.static(path.join(__dirname, 'public')))
// EJS CONFIG

app.set ('view engine','ejs');
app.set('views','./views');


// get specific user
app.get('/users/:user_id',(req,res)=>{
  const index = req.params.user_id
//psql command line 
  db.any('SELECT * FROM users WHERE id =$1',[index])
  
// the params of the user_id is required 
      const result = users[index] 
      // console.log(result)         
      // users[index] in the array equal to the result
      // })

    if (index >= users.length){
              res.status(400).json(`msg: User ${index} is not found`)}
           res.render('pages/user',{user})
    })



// get all users
app.get('/users/:user_id',(req,res)=>{

  //psql command line 
    db.any('SELECT * FROM users')
    .then((users)=>{
      console.log(users)
      res.render('pages/users', {users})
    })
    .catch((error)=>{
      console.log(error)
      res.redirect("error?message =" + error.message)
    })


// oneorNone 

app.get('/users/:user_id',(req,res)=>{
  const index = req.params.user_id

  db.oneOrNone('SELECT * FROM users WHERE id =$1',[index])
  .then(function(user){
    console.log(user)
    res.render('pages/user', {user:data})
  })


  .catch(function(error){
    console.log(error)
      res.render('pages/error',{
        error,
        title:"User"
      })
  })

})


// errorpage
app.get('*', (req,res)=>{
  res.render('pages/error',{title:'404', error :"404"})
})



//ROOT 
// app.get('/', (req, res) => {
//   res.render('pages/home', {users});
// });

// if not work, $npm start 
app.get ('/',(req,res)=>{
    res.render('pages/home')
})

//render users 
// app.get('/users',(req,res) =>{
//   res.render('pages/users', {users})
// })

// app.get('/users/add',(req,res) =>{
//   res.render('pages/newUser', {users})
// })

// app.get('/schedules',(req,res) =>{
//   res.render('pages/schedules', {schedules})
// })

// app.get('/schedules/add',(req,res) =>{
//   res.render('pages/newSchedules', {schedules})
// })

// // post new user
// app.post ('/users',(req,res)=>{

// // destructure var for a user 
// const {firstname, lastname, email, password} = req.body

// // encrypt the pw with bcryptJS 
// // the password been salted 
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(password, salt);
// // store hash in your password
// //create a new user
// const newUser={
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//     password: hash
// }
// //push  newUser to data array and send back newUser
// users.push(newUser)
// res.redirect('/users')
// })

// // create new scheduels using post 
// app.post ('/schedules',(req,res)=>{
// // destructure var for a schedule 

// const {user_id, day, start_at, end_at} = req.body

// //create a new schedule
// const newSchedule={
//     user_id: user_id,
//     day: day,
//     start_at: start_at,
//     end_at: end_at
// }
// //push  newUser to data array and send back newUser
// schedules.push(newSchedule)
// res.redirect('/schedules')
// })

//   // get specific user
//   app.get('/users/:user_id', (req, res) => {

//     const index = req.params.user_id
//     // the params of the user_id is required 
//     const result = users[index] 
//     console.log(result)         
//     // users[index] in the array equal to the result
//   // })

//     // validation to confirm number has been entered
//     // for loop not nessessary ??
//    let specificUsers =[]
//    for (i = 0 ; i < users.length ; i++) {
//       if (users[i].user_index  == index){
//         specificUsers.push(users[i]);
//         res.send(result)
//     }    
//      if (index >= users.length){
//         res.status(400).json(`msg: User ${index} is not found`)}
//      }
//   })

//   // get specific schedules
// app.get('/users/:user_id/schedules',(req,res)=>{
//     const index = req.params.user_id;
//     console.log(typeof index);
//     console.log(index);
//     // const specificPosts = posts.filter((x) => x.userId === parseInt(index));
//     // console.log(specificPosts);
//     // an empty array will be pushed with the user_id parameter matched in the 
//     //loop, onstead the schedules pushed to the new empty array
//     let specificSchedules = [];
//     for (let i = 0; i < schedules.length ; i++){
//         if (schedules[i].user_id === Number(index)){
//             specificSchedules.push(schedules[i]);
//         }

//     }
//     if (specificSchedules.length > 0) {
//         res.send(specificSchedules);
//       } else {
//         res. status (400).json(`msg: User ${index} is not found`);
      
// }
// })



// app.get ('/schedules', (req,res) =>{
//   res.json(schedules);
// })


//   app.get('/users', (req, res) => {
//     res.json(users);
//     // console.log(users[2].firstname) why does not work?
//   });

//   // get specific user
//   app.get('/users/:user_id', (req, res) => {

//     const index = req.params.user_id
//     // the params of the user_id is required 
//     const result = users[index] 
//     console.log(result)         // users[index] in the array equal to the result
//   // })

//     // validation to confirm number has been entered
    
//    let specificUsers =[]
//    for (i = 0 ; i < users.length ; i++) {
//       if (users[i].user_index  == index){
//         specificUsers.push(users[i]);
//         res.send(result)
//     }    
//      if (index >= users.length){
//         res.status(400).json(`msg: User ${index} is not found`)}
//       }
//   })

// // get specific schedules
// app.get('/users/:user_id/schedules',(req,res)=>{
//     const index = req.params.user_id;
//     console.log(typeof index);
//     console.log(index);
//     // const specificPosts = posts.filter((x) => x.userId === parseInt(index));
//     // console.log(specificPosts);
//     // an empty array will be pushed with the user_id parameter matched in the 
//     //loop, onstead the schedules pushed to the new empty array
//     let specificSchedules = [];
//     for (let i = 0; i < schedules.length ; i++){
//         if (schedules[i].user_id === Number(index)){
//             specificSchedules.push(schedules[i]);
//         }

//     }
//     if (specificSchedules.length > 0) {
//         res.send(specificSchedules);
//       } else {
//         res. status (400).json(`msg: User ${index} is not found`);
      
// }
// })

// app.post ('/schedules',(req,res)=>{
// // destructure var for a schedule 

// const {user_id, day, start_at, end_at} = req.body

// //create a new schedule
// const newSchedule={
//     user_id: user_id,
//     day: day,
//     start_at: start_at,
//     end_at: end_at
// }
// //push  newUser to data array and send back newUser
// schedules.push(newSchedule)
// res.json(newSchedule)
// })

// // // post new user
// app.post ('/users',(req,res)=>{

// // destructure var for a user 
// const {firstname, lastname, email, password} = req.body

// // encrypt the pw with bcryptJS 
// // the password been salted 
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(password, salt);
// // store hash in your password
// //create a new user
// const newUser={
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//     password: hash
// }
// //push  newUser to data array and send back newUser
// users.push(newUser)
// res.json(newUser)
// })


// //listen to exp app
// // port is listening to the function 
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})