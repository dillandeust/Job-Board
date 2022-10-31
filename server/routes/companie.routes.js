module.exports = app => {
    const companies = require("../controllers/companie.controller.js");
    var bodyParser = require('body-parser')

    var jsonParser = bodyParser.json();
    var router = require("express").Router();
   
    // Create a new companie
    router.post("/", jsonParser, companies.create);
  
    // Retrieve all companies
    router.get("/", companies.findAll);
  
    // Retrieve all wage companies
    router.get("/field", companies.findAllfield);
  
    // Retrieve a single companie with id
    router.get("/:id", companies.findOne);

    // Retrieve a single companie with Name_of_companies
    router.get("/:Name_of_companies", companies.findOneName_of_companies);
  
    // Update a companie with id
    router.put("/:id", companies.update);
  
    // Delete a companie with id
    router.delete("/:id", companies.delete);
  
    // Delete all companies
    router.delete("/", companies.deleteAll);
  
    app.use('/api/companies', router);
  };