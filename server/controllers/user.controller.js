const User = require("../models/user.model.js");
var bodyParser = require('body-parser')
const bcrypt = require("bcryptjs");




exports.create = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the applying."
      });
    else res.send(data);
  });
};


exports.login = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.login(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the applying."
      });
    else res.send(data);
  });
};

exports.logout = (req, res) => {
  User.logout(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
  const firstname = req.query.firstname;

  User.getAll(firstname, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};


// Find a single user with a id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single user with a firstname
exports.findOnefirstname = (req, res) => {
  User.findByfirstname(req.params.firstname, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with firstname ${req.params.firstname}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with firstname " + req.params.firstname
        });
      }
    } else res.send(data);
  });
};

// Find a single user with a lastname
exports.findOnelastname = (req, res) => {
  User.findBylastname(req.params.lastname, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with lastname ${req.params.lastname}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with lastname " + req.params.lastname
        });
      }
    } else res.send(data);
  });
};

// Find a single user with a email
exports.findOneEmail = (req, res) => {
  User.findByemail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};


// find all Companie users
exports.findallCompanie = (req, res) => {
  User.getAllCompanie((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    else res.send(data);
  });
};

// exports.checkOnecompanie = (req, res) => {
//   User.checkCompanie((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving companies."
//       });
//     else res.send(data);
//   });
// };

// find all admin users
exports.findallAdmin = (req, res) => {
  User.getAllAdmin(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with firstname ${req.params.firstname}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with firstname " + req.params.firstname
        });
      }
    } else res.send(data);
  });
};

// find all loggedin users
exports.findallLoggedin = (req, res) => {
  User.getAllLoggedin((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving loggedin."
      });
    else res.send(data);
  });
};

// Update a user identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateFirstname = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByIdFirstname(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.updateLastname = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByIdLastname(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.updateEmail = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByIdEmail(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.updatephone = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByIdphone(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.updateskills = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByIdskills(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.updatepassword = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByIdpassword(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Update a user identified by the email in the request
exports.updateWithEmail = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateByemail(
    req.params.email,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with email " + req.params.email
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};