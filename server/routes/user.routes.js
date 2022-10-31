module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const db = require("../models/database.js");
    var bodyParser = require('body-parser')
    const bcrypt = require("bcryptjs")

    var jsonParser = bodyParser.json()
    var router = require("express").Router();






 
    const userMiddleware = require('../middlewear/users.js');
   
     // Create a new user
    router.post("/", jsonParser, userMiddleware.validateRegister, users.create);

    // login
    router.post("/auth", jsonParser, users.login);

    //logout
    router.post("/out/:id", jsonParser, users.logout);

  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve all companie users
    router.get("/company", users.findallCompanie);

    // Retrieve all admin users
    router.get("/admin", users.findallAdmin);

    // Retrieve all loggedin users
    router.get("/loggedin", users.findallLoggedin);
  
    // Retrieve a single user with id
    //router.get("/company/:id", users.checkOnecompanie);

    // Retrieve a single user with firstname
    router.get("/firstname/:firstname", users.findOnefirstname);

    // Retrieve a single user with firstnaame
    router.get("/lastname/:lastname", users.findOnelastname); 

    // Retrieve a single user with firstnaame
    router.get("/email/:email", users.findOneEmail); 

    // Update a user with id
    router.put("/:id", jsonParser, users.update);

    // Update user's firstname with id
    router.put("/updatefirstname/:id", jsonParser, users.updateFirstname);
    
    // Update user's latname with id
    router.put("/updatelastname/:id", jsonParser, users.updateLastname);

    // Update user's email with id
    router.put("/updateemail/:id", jsonParser, users.updateEmail);

    // Update user's phone with id
    router.put("/updatephone/:id", jsonParser, users.updatephone);

    // Update user's skills with id
    router.put("/updateskills/:id", jsonParser, users.updateskills);

    // Update user's password with id
    router.put("/updatepassword/:id", jsonParser, users.updatepassword);

    // Update a user with email
    router.put("/email/:email", jsonParser, users.updateWithEmail);
  
    // Delete a user with id
    router.delete("/:id", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };