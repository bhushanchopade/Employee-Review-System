const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const { exists } = require("../model/user");
const User = require("../model/user");

// login user router
router.get("/login", userController.login);
// sign up user router
router.get("/signup", userController.signup);
// router.get("/add-admin", userController.addAdmin);
// signout user router
router.get("/signout", userController.deleteSession);
// create new user router
router.post("/create-user", userController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/login" }),
  userController.createSession
);

// fetch update emplloyee page

router.get('/update' , async (req , res)=>{
  let user = await User.findById(req.query.id);
  
  return res.render('update-employee', {
     userId : req.query.id,
      users : user
  })
})

// routes to update an employee details to the database
router.post('/update-profile/:id', async (req,res)=>{
  
  let user = await User.findOneAndUpdate({_id : req.params.id} , {
    name : req.body.name,
    password : req.body.password
  })
  console.log('name / password changed');
  return res.redirect('/');
});

module.exports = router;
