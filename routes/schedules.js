const express =require('express');
// const app = express();
const bcrypt = require('bcryptjs');
const db = require('../database');
const router =express.Router()

//get new schedule form

router.get('/add', (req,res)=>{
  res.render('pages/newSchedule',{title:'Add a new schedule'});   
})


// get all schedules
router.get('/',(req,res)=>{

    //psql command line 
      db.any('SELECT * FROM schedules')
      .then(schedules =>{
        console.log(schedules)
        res.render('pages/schedules', {schedules, title :'All Schedules'})
      })
      .catch(error=>{
        console.log(error)
        res.render('pages/error',{
          errorCode:500, 
          errorMessage: error.errorMessage
        })

      })
  
    })

// post a new schedule

router.post('/',(req,res)=>{

    const {username, Day_of_the_week, start_at, end_at } = req.body 
  
    //psql command line 

    db.oneOrNone("INSERT INTO schedules(username,Day_of_the_week,start_at,end_at) VALUES($1,$2,$3,$4)" ,[
       username,
       Day_of_the_week,
       start_at,
       end_at
    ] )

    .then((scheduels) => {
        // If user with that email already exists, render error
        res.redirect('schedules/add');
        })

    .catch ((error)=>{
        res.render ('pages/error',{title:'Error',errorCode:500,errorMessage:error.message})
    })
})



// router finished 

//post new user 

// router.post('/', (req, res) => {
//     // check user does not already exist in db before inserting
//     // usually would access via primary key
//     // SELECT
//     db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email])
//       .then((user) => {
//         // If user with that email already exists, render error
//         if (user) {
//           res.render('pages/error', {
//             error: 'User already exists, please use another email address',
//             title: 'Invalid User'
//           });
//           // Otherwise create new user
//         } else {
//           // Encrypt the password with bcryptJS
//           let salt = bcrypt.genSaltSync(10);
//           let hash = bcrypt.hashSync(req.body.password, salt);
//           // Insert into DB
//           db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', [
//             req.body.firstname,
//             req.body.lastname,
//             req.body.email,
//             hash
//           ])
//             .then(() => {
//               res.redirect('/users/add')
//             })
//             .catch((error) => {
//               // error;
//               res.render('pages/error', {
//                 error: 'User cannot be added',
//                 title: 'User'
//               });
//             });
//         }
//       })
//       .catch((error) => {
//         // error;
//         console.log(error);
//         res.render('pages/error', {
//           error,
//           title: 'User'
//         });
//       });
//   });
 
  module.exports = router


