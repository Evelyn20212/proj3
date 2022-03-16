const express =require('express');
// const app = express();
const bcrypt = require('bcryptjs');
const db = require('../database');
const router =express.Router()


// get all users
router.get('/',(req,res)=>{

    //psql command line 
      db.any('SELECT * FROM users')
      .then((users)=>{
        console.log(users)
        res.render('pages/users', {users, title :'All Users'})
      })
      .catch((error)=>{
        console.log(error)
        res.redirect("error?message =" + error.message)
      })
  
    })

     // GET user form
router.get('/add', (req,res)=>{
    res.render('pages/newUser', {title : 'Add a new user'});   
})

// get a specific user

router.get('/:user_id',(req,res)=>{
    const index = req.params.user_id
  //psql command line 
    db.oneOrNone('SELECT * FROM users WHERE id =$1',[index])
    .then((user) => {
        // If user with that email already exists, render error
        if (!user) {
          res.render('pages/error', {
            error: 'No such a user',
            title: 'User'
          });
        } else {
            console.log (user);
            res.render('pages/user', {user});
        }
    })  // then finished 
    .catch ((err)=>{
        res.render ('pages/err',{error, title :'User'})
    })
}) // router finished 

//   // the params of the user_id is required 
//         const result = users[index] 
//         // console.log(result)         
//         // users[index] in the array equal to the result
//         // })
  
//       if (index >= users.length){
//             res.status(400).json(`msg: User ${index} is not found`)}
//             res.render('pages/user',{user})
//       })

//post new user 

router.post('/', (req, res) => {
    // check user does not already exist in db before inserting
    // usually would access via primary key
    // SELECT
    db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email])
      .then((user) => {
        // If user with that email already exists, render error
        if (user) {
          res.render('pages/error', {
            error: 'User already exists, please use another email address',
            title: 'Invalid User'
          });
          // Otherwise create new user
        } else {
          // Encrypt the password with bcryptJS
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(req.body.password, salt);
          // Insert into DB
          db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hash
          ])
            .then(() => {
              res.redirect('/users/add')
            })
            .catch((error) => {
              // error;
              res.render('pages/error', {
                error: 'User cannot be added',
                title: 'User'
              });
            });
        }
      })
      .catch((error) => {
        // error;
        console.log(error);
        res.render('pages/error', {
          error,
          title: 'User'
        });
      });
  });
 
  module.exports = router


