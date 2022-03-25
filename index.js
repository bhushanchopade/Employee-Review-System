const express = require("express");
const port = process.env.PORT || 7000 ;
const app = express();
const db = require('./config/mongoose')
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const expressLayout = require('express-ejs-layouts');

app.use(express.urlencoded({ extended : true}));

// static files
app.use('/assets', express.static('./assets'));

// adding view port and its path
app.set('view engine' , 'ejs');
app.set('/views', './views');


// setting up Express Layout
app.use(expressLayout);
// extracting style and script in layout
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.use(
    session({
      name: "employe-review-system",
      secret: "KeptSecret",
      resave: true,
      saveUninitialized: true,
      cookies: {
        maxAge: 10000 * 60 * 100,
      },
    })
  );

//   passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// adding the routes
app.use('/', require('./routes'));


// connecting to the server
app.listen(port , (err)=>{

  if(err){console.log(`Error in connecting server : ${err}`); return;}
  console.log(`Server is connected on http://localhost:${port}`);
})


// creating admin in the database
const Admin = require('./model/user');
createAdmin();

async function createAdmin(){
    let admin = await Admin.findOneAndRemove({email : 'admin@admin.com'} );
    Admin.create({
        name : 'Admin',
        isAdmin: true,
        email : 'admin@admin.com',
        password : 'admin',
      });
      if(!admin){
        console.log('admin  created..!  | email : admin@admin.com , password : admin |');

      }else{
        console.log('| email : admin@admin.com , password : admin | ...... to logging in admin panel');
      }
}


