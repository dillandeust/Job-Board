const Companie = require("../models/companie.model.js");
var bodyParser = require('body-parser')

// Create and Save a new companie
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    // Create a companie
     const companie = new Companie({
       Name_of_companies: req.body.Name_of_companies,
       field: req.body.field,
       geographical_position: req.body.geographical_position

     });
    
    // Save companie in the database
    Companie.create(companie, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the companie."
        });
      else res.send(data);
    });
  };

// Retrieve all companies from the database (with condition).
exports.findAll = (req, res) => {
    const Name_of_companies = req.query.Name_of_companies;
  
    Companie.getAll(Name_of_companies, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companies."
        });
      else res.send(data);
    });
  };
  
  
  

// Find a single companie with a id
exports.findOne = (req, res) => {
  Companie.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found companie with companie_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving companie with companie_id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  // Find a single companie with a Name_of_companies
  exports.findOneName_of_companies = (req, res) => {
    Companie.findByName_of_companies(req.params.Name_of_companies, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found companie with Name_of_companies ${req.params.Name_of_companies}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving companie with Name_of_companies " + req.params.Name_of_companies
          });
        }
      } else res.send(data);
    });
  };

// find all field companies
exports.findAllfield = (req, res) => {
  Companie.getAllfield((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companies."
        });
      else res.send(data);
    });
  };

// Update a companie identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Companie.updateById(
      req.params.id,
      new Companie(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found companie with companie_id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating companie with companie_id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a companie with the specified companie_id in the request
exports.delete = (req, res) => {
  Companie.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found companie with companie_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete companie with companie_id " + req.params.id
          });
        }
      } else res.send({ message: `companie was deleted successfully!` });
    });
  };

// Delete all companies from the database.
exports.deleteAll = (req, res) => {
  Companie.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all companies."
        });
      else res.send({ message: `All companies were deleted successfully!` });
    });
  };