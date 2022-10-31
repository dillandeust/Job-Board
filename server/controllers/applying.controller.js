const Applying = require("../models/applying.model.js");
var bodyParser = require('body-parser');



exports.create = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

     Applying.create(req.body, (err, data) => {
           if (err)
         res.status(500).send({
           message:
             err.message || "Some error occurred while creating the applying."
         });
       else res.send(data);
     });
 };




// Retrieve all applyings from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;
  
    Applying.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving applyings."
        });
      else res.send(data);
    });
};
  
  
  

// Find a single applying with a id
exports.findOne = (req, res) => {
    Applying.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found applying with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving applying with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Find a single applying with a name
exports.findOnename = (req, res) => {
    Applying.findByname(req.params.name, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found applying with name ${req.params.name}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving applying with name " + req.params.name
          });
        }
      } else res.send(data);
    });
};


// Find a single applying with a email
exports.findOneEmail= (req, res) => {
    Applying.findByemail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found applying with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving applying with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};

// Update a applying identified by the id in the request

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Applying.updateById(
      req.params.id,
      new Applying(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found applying with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating applying with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Update a applying identified by the email in the request
exports.updateWithEmail = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Applying.updateByemail(
    req.params.email,
    new Applying(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found applying with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating applying with email " + req.params.email
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a applying with the specified id in the request
exports.delete = (req, res) => {
    Applying.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found applying with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete applying with id " + req.params.id
          });
        }
      } else res.send({ message: `applying was deleted successfully!` });
    });
  };

// Delete all applyings from the database.
exports.deleteAll = (req, res) => {
    Applying.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all applyings."
        });
      else res.send({ message: `All applyings were deleted successfully!` });
    });
  };