const sql = require("./database.js");
var bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// constructor
const User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.birthday = user.birthday;
  this.phone = user.phone;
  this.Name_of_company = user.Name_of_company;
  this.skills = user.skills;
  this.password = user.password;
  this.password_confirm = user.password_confirm;
  this.lpassword = user.lpassword;
  this.companie = user.companie;
  this.admin = user.admin;
  this.islogedin = user.islogedin;
};



User.create = (user, result) => {
  sql.query("SELECT email FROM users WHERE email = ?", [user.email], async (err, res) => {
    if (err) {
      console.log("error: ", err);
      console.log(err);
      return;
    }
    if (res.length > 0) {
      console.log("mail already taken");
      result(err, null);
      return;
    }
    if (user.password !== user.password_confirm) {
      console.log("passwords don't match");
      result(err, null);
      return;
    }


    const hashedPassword = await bcrypt.hash(user.password, 8);

    sql.query("INSERT INTO users SET firstname = ?, lastname = ?, email = ?, birthday = ?, phone = ?, Name_of_company = ?, skills = ?, password = ?, admin = ?, islogedin = ? ; SET  @num := 0; UPDATE users SET id = @num := (@num+1); ALTER TABLE users AUTO_INCREMENT =1; ",
      [user.firstname, user.lastname, user.email, user.birthday, user.phone, user.Name_of_company, user.skills, hashedPassword, user.admin, user.islogedin, user.companie,], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created user: ", { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
      });
  });
};



User.login = (user, res, next) => {

  sql.query(
    "SELECT * FROM users WHERE email = ? ", user.email,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
      }
      if (!result.length) {
        console.log("email or/and password incorrect")
        return;
      }
      // check password
      bcrypt.compare(
        user.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
          }
          if (bResult) {
            const token = jwt.sign({
              email: result[0].email,
              userId: result[0].id
            },
              'SECRETKEY', {
              expiresIn: '7d'
            }
            );
            sql.query(
              `UPDATE users SET islogedin = true WHERE id = '${result[0].id}'`
            );

            console.log("loged in!");
            res(null, result[0]);
            return;
          }
          console.log("email or/and password incorrect")
          return;
        }
      );
    }
  );
};

User.logout = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      sql.query(`UPDATE users SET islogedin = false WHERE id = ${id}`)
      console.log("found user: ", res);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};


User.findByfirstname = (firstname, result) => {
  sql.query(`SELECT * FROM users WHERE firstname = ${firstname}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.findBylastname = (lastname, result) => {
  sql.query(`SELECT * FROM users WHERE lastname = ${lastname}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};



User.findByemail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ${email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (firstname, result) => {
  let query = "SELECT * FROM users";

  if (firstname) {
    query += ` WHERE firstname LIKE '%${firstname}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// all the users companie=1

User.getAllCompanie = result => {
  sql.query("SELECT * FROM users WHERE companie=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


// User.checkCompanie = (id, result) => {
//   sql.query("SELECT companie FROM users WHERE companie = 1 AND id = ? ", [id], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       // result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found user: ", res[0]);
//       // result(null, res[0]);
//       return;
//     }

//     // not found user with the firstname
//     // result({ kind: "not_found" }, null);
//   });
// };

// all the users admin=1

User.getAllAdmin = result => {
  sql.query("SELECT * FROM users WHERE admin=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// all the users loggedin=1
User.getAllLoggedin = result => {
  sql.query("SELECT * FROM users WHERE islogedin=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};



User.findByfirstname = (firstname, result) => {
  sql.query(`SELECT * FROM users WHERE firstname = "${firstname}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the firstname
    result({ kind: "not_found" }, null);
  });
};

User.findBylasttname = (lastname, result) => {
  sql.query(`SELECT * FROM users WHERE lastname = ${lastname}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the lastname
    result({ kind: "not_found" }, null);
  });
};


User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET firstname = ?, lastname = ?, birthday = ?, phone = ?, skills = ?, Name_of_company = ?  WHERE id = ?",
    [user.firstname, user.lastname, user.birthday, user.phone, user.skills, user.Name_of_company, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


User.updateByIdFirstname = (id, user, result) => {
  sql.query(
    "UPDATE users SET firstname = ? WHERE id = ?",
    [user.firstname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.updateByIdLastname = (id, user, result) => {
  sql.query(
    "UPDATE users SET lastname = ? WHERE id = ?",
    [user.lastname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


User.updateByIdEmail = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ? WHERE id = ?",
    [user.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


User.updateByIdphone = (id, user, result) => {
  sql.query(
    "UPDATE users SET phone = ? WHERE id = ?",
    [user.phone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};


User.updateByIdskills = (id, user, result) => {
  sql.query(
    "UPDATE users SET skills = ? WHERE id = ?",
    [user.skills, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.updateByIdpassword = (id, user, res) => {
  sql.query("SELECT password from users WHERE id = ?", [id], (err, result) => {
    // check password
    bcrypt.compare(
      user.lpassword,
      result[0]['password'],
      (bErr, bResult) => {
        // wrong password
        if (bErr) {
          console.log("wrong password");
          throw bErr;
        }
        
        if (bResult) {
          async function asynccalll() {
            if (user.password !== user.password_confirm) {
              console.log("passwords don't match");
              // result(err, null);
              return;
            }
            const hashedPassword = await bcrypt.hash(user.password, 8);
            sql.query(
              "UPDATE users SET password = ? WHERE id = ?",
              [hashedPassword, id],
              (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
                }

                if (res.affectedRows == 0) {
                  // not found user with the id
                  result({ kind: "not_found" }, null);
                  return;
                }

                console.log("updated user: ", { id: id, ...user });
                // res(null, { id: id, ...user });
                return;
              }
            );
          };
          asynccalll();
        }
      }
    );
  });
};

User.updateByemail = (email, user, result) => {
  sql.query(
    "UPDATE users SET firstname = ?, lastname = ?, birthday = ?, phone = ?, skills = ? password = ? WHERE email = ?",
    [user.firstname, user.lastname, user.email, user.birthday, user.phone, user.skills, user.password, email],
    (err, res,) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { email: id, ...user });
      result(null, { email: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ? ; SET  @num := 0; UPDATE users SET id = @num := (@num+1); ALTER TABLE users AUTO_INCREMENT =1;", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;