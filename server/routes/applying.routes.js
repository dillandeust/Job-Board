module.exports = app => {
    const appliyings = require("../controllers/applying.controller.js");
    var bodyParser = require('body-parser')

    var jsonParser = bodyParser.json()
    var router = require("express").Router();
   
    // Create a new appliying
    router.post("/", jsonParser, appliyings.create);
  
    // Retrieve all appliyings
    router.get("/", appliyings.findAll);
  
    // Retrieve a single appliying with id
    router.get("/:id", appliyings.findOne);

    // Retrieve a single appliying with firstnaame
    router.get("/name/name", appliyings.findOnename);

    // Retrieve a single appliying with email
    router.get("/email/:email", appliyings.findOneEmail); 

    // Update a appliying with id
    router.put("/:id", jsonParser, appliyings.update);
    
    
    // Update a appliying with email
    router.put("/email/:email", jsonParser, appliyings.updateWithEmail);
  
    // Delete a appliying with id
    router.delete("/:id", appliyings.delete);
  
    // Delete all appliyings
    router.delete("/", appliyings.deleteAll);
  
    app.use('/api/applyings', router);
  };