module.exports = app => {
    const advertisements = require("../controllers/advertisement.controller.js");
    var bodyParser = require('body-parser')

    var jsonParser = bodyParser.json()
    var router = require("express").Router();
   
    // Create a new advertisement
    router.post("/", jsonParser, advertisements.create);
  
    // Retrieve all advertisements
    router.get("/", advertisements.findAll);
  
    // Retrieve  advertisements by place
    router.get("/place", advertisements.findAllplace);
  
    // Retrieve a single advertisement with id
    router.get("/:id", advertisements.findOne);

    // Retrieve a single advertisement with title
    router.get("/title/:title", advertisements.findOneTitle);
  
    // Update a advertisement with id
    router.put("/:id", advertisements.update);

    // Update a advertisement with id
    router.put("/title/:id", advertisements.updatetitle);

    // Update a advertisement with id
    router.put("/place/:id", advertisements.updateplace);

    // Update a advertisement with id
    router.put("/wage/:id", advertisements.updatewage);

    // Update a advertisement with id
    router.put("/workingtime/:id", advertisements.updateworkingtime);

    // Update a advertisement with id
    router.put("/description/:id", advertisements.updatedescription);

    // Update a advertisement with id
    router.put("/detail/:id", advertisements.updatedetail);
  
    // Delete a advertisement with id
    router.delete("/:id", advertisements.delete);
    
  
    // Delete all advertisements
    router.delete("/", advertisements.deleteAll);
  
    app.use('/api/advertisements', router);
};