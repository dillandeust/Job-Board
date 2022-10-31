const sql = require("./database.js");
var bodyParser = require('body-parser');
var transporter = require('../controllers/nodemailer.js');

// constructor
const Applying = function(appliying) {
  this.name = appliying.name;
  this.email = appliying.email;
  this.phone = appliying.phone;
};

Applying.create = (appliying, result) => {
  sql.query("INSERT INTO applyings SET name = ?, phone = ?, email = ?;  SET  @num := 0; UPDATE applyings SET apply_id = @num := (@num+1); ALTER TABLE applyings AUTO_INCREMENT =1; ",
  [appliying.name, appliying.email, appliying.phone] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created appliying: ", { apply_id: res.insertapply_id, ...appliying });
    result(null, { apply_id: res.insertapply_id, ...appliying });
  });
  send(appliying);
};

async function send(appliying) {

  const result = await transporter.sendMail({

      from: 'jobboard.tek@outlook.com',

      to: 'dillan.addouche@epitech.eu',

      subject: 'JobBoard - Candidature',

      text: `${appliying.name} a postulé(e) à une offre d'emploi que vous avez proposé.\nVous pouvez le(la) contacter via:
      - email: ${appliying.email}
      - téléphone: ${appliying.phone}`
  });
  console.log(JSON.stringify(result, null, 4));
}

Applying.findById = (apply_id, result) => {
  sql.query(`SELECT * FROM applyings WHERE apply_id = ${apply_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found applying: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found appliying with the apply_id
    result({ kind: "not_found" }, null);
  });
};


Applying.findByname = (name, result) => {
    sql.query(`SELECT * FROM applyings WHERE name = ${name}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found appliying: ", res);
        result(null, res);
        return;
      }
  
      // not found appliying with the id
      result({ kind: "not_found" }, null);
    });
  };


  Applying.findByemail = (email, result) => {
    sql.query(`SELECT * FROM applyings WHERE email = ${email}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found appliying: ", res);
        result(null, res[0]);
        return;
      }
  
      // not found appliying with the id
      result({ kind: "not_found" }, null);
    });
  };

  Applying.getAll = (name, result) => {
  let query = "SELECT * FROM applyings";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("applyings: ", res);
    result(null, res);
  });
};

//find one by name

Applying.findByname = (name, result) => {
    sql.query(`SELECT * FROM applyings WHERE name = "${name}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found appliying: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found appliying with the name
      result({ kind: "not_found" }, null);
    });
  };


  Applying.updateById = (apply_id, appliying, result) => {
  sql.query(
    "UPDATE applyings SET name = ?, email = ?, phone = ? WHERE apply_id = ?",
    [appliying.name, appliying.email, appliying.phone, apply_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found appliying with the apply_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated appliying: ", { apply_id: apply_id, ...appliying });
      result(null, { apply_id: apply_id, ...appliying });
    }
  );
};


Applying.updateByemail = (email, appliying, result) => {
    sql.query(
      "UPDATE applyings SET name = ?, phone = ?, password = ? WHERE email = ?",
      [appliying.name, appliying.email, appliying.phone, appliying.password, email],
      (err, res,) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        
        if (res.affectedRows == 0) {
          // not found appliying with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated appliying: ", { email: apply_id, ...appliying });
        result(null, { email: apply_id, ...appliying });
      }
    );
  };

  Applying.remove = (apply_id, result) => {
  sql.query("DELETE FROM applyings WHERE apply_id = ? ; SET  @num := 0; UPDATE applyings SET apply_id = @num := (@num+1); ALTER TABLE applyings AUTO_INCREMENT =1;", apply_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found appliying with the apply_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted appliying with apply_id: ", apply_id);
    result(null, res);
  });
};

Applying.removeAll = result => {
  sql.query("DELETE FROM applyings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} applyings`);
    result(null, res);
  });
};

module.exports = Applying;