const Advertisement = require("../models/advertisement.model.js");
var bodyParser = require('body-parser')

// Create and Save a new advertisement
exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a advertisement
  const advertisement = new Advertisement({
    title: req.body.title,
    place: req.body.place,
    wage: req.body.wage,
    workingtime: req.body.workingtime,
    description: req.body.description,
    detail_role: req.body.detail_role

  });

  // Save advertisement in the database
  Advertisement.create(advertisement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the advertisement."
      });
    else res.send(data);
  });
};

// Retrieve all advertisements from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Advertisement.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving advertisements."
      });
    else res.send(data);
  });
};




// Find a single advertisement with a id
exports.findOne = (req, res) => {
  Advertisement.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found advertisement with advertisement_id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving advertisement with advertisement_id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single advertisement with a title
exports.findOneTitle = (req, res) => {
  Advertisement.findByTitle(req.params.title, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found advertisement with title ${req.params.title}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving advertisement with title " + req.params.title
        });
      }
    } else res.send(data);
  });
};

// find all place advertisements
exports.findAllplace = (req, res) => {
  Advertisement.getAllplace((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving advertisements."
      });
    else res.send(data);
  });
};

// Update a advertisement identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateById(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updatetitle = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateByIdtitle(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateplace = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateByIdplace(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updatewage = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateByIdwage(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateworkingtime = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateByIdworkingtime(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updatedescription = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateByIddescription(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updatedetail = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Advertisement.updateByIddetail(
    req.params.id,
    new Advertisement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with advertisements_id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with advertisements_id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a advertisement with the specified id in the request
exports.delete = (req, res) => {
  Advertisement.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found advertisement with advertisement_id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete advertisement with advertisement_id " + req.params.id
        });
      }
    } else res.send({ message: `advertisement was deleted successfully!` });
  });
};

// Delete all advertisements from the database.
exports.deleteAll = (req, res) => {
  Advertisement.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all advertisements."
      });
    else res.send({ message: `All advertisements were deleted successfully!` });
  });
};