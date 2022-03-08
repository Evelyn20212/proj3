// // const { append } = require("express/lib/response");

// // app.use(express.static)
// const req = require('express/lib/request')
// const { append } = require('express/lib/response')
// const data= require('./Data')

// //1. create port variable

// // const port = 3000 || process.env.port

// app.use ()

// //routes 
// // req, res  in built 
// app.get('/, (req,res) =>'{
//     res.send('Hello World!');
// });

// const {users, posts} = req('./data');


// app.get('/api/'), (req,res) => {

//     res.json(users)
// });

// app.get('/api/:id'), (req,res) => {
//     res.json(user)
//     const id = req.params.id
//     res.send(id)
// }


const express = require('express');
const res = require('express/lib/response');
// const res = require('express/lib/response');
// const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port =3000 ;

const {users} =require ('./data')
let ejs =require('ejs');



app.get('/api/users/:id',(req,res)=>{
    
    const id = req.params.id;
    console.log(req.params.id);
    res.send(users);


    
    // const user =users[index];
    
    // console.log(user);
    // // if (id >= id.length){
    // res.send(user);
     });


    // const index = req.params.id ;
    // const users =posts.users[index];
    // res.send(posts.users);
    // res.send(posts.users.firstName);
    
//     const index=req.params.id
//     const log (index);
//     res.send(post)
//     const post= post.filter(post => post.id==index)
    
// });

app.listen(port,()=>{
    console.log(`Here you are looking at ${port}`)
});


//middleware does things before 
    //body parser str into the 
    //app.use(morgan) 
    // app.use(morgan('dev'))

    app.post ('/api/users', (req,res)=>{
      console.log(req.body);
      users.push(req.body);
      res.send(users);

    });

    const {firstname, lastnime,email,password} =req.body

    let salt =bcrypt.getSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);
    const newUser ={
        "firstname" : firstname,
        "lastname" : lastname,
        "user_id":users.length,
        "password": hash,
        "email":email,

    }
    users.push(newUser);
    res.send(req.body);


    // static files
    app.use(express.static(path.jion(__dirname,'public')))

// ejs config
app.set('view engine','ejs')
app,set('views','./views')

console.log()
    app.get('/',(req, res){

    })
    res.render("home",{users}) //variables 
});

<% = JSON.stringify(users)%>

comment 3a 