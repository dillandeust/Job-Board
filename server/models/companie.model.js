const sql = require("./database.js");
var bodyParser = require('body-parser');

// constructor
const Companie = function(companie) {
  this.Name_of_companies = companie.Name_of_companies;
  this.field = companie.field;
  this.geographical_position = companie.geographical_position;
};

Companie.create = (newcompanie, result) => {
  sql.query("INSERT INTO companies SET ? ; SET  @num := 0; UPDATE companies SET companie_id = @num := (@num+1); ALTER TABLE companies AUTO_INCREMENT =1; ",  newcompanie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created companie: ", { companie_id: res.insertId, ...newcompanie });
    result(null, { companie_id: res.insertId, ...newcompanie });
  });
};

Companie.findById = (companie_id, result) => {
  sql.query(`SELECT * FROM companies WHERE companie_id = ${companie_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found companie: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found companie with the id
    result({ kind: "not_found" }, null);
  });
};

Companie.getAll = (Name_of_companies, result) => {
  let query = "SELECT * FROM companies";

  if (Name_of_companies) {
    query += ` WHERE Name_of_companies LIKE '%${Name_of_companies}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("companies: ", res);
    result(null, res);
  });
};

Companie.findByName_of_companies = (Name_of_companies, result) => {
    sql.query(`SELECT * FROM companies WHERE Name_of_companies = ${Name_of_companies}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found companie: ", res);
        result(null, res);
        return;
      }
  
      // not found companie with the Name_of_companies
      result({ kind: "not_found" }, null);
    });
  };

Companie.updateById = (companie_id, companie, result) => {
  sql.query(
    "UPDATE companies SET Name_of_companies = ?, field = ?, geographical_position = ? WHERE companie_id = ?",
    [companie.Name_of_companies, companie.field, companie.geographical_position, companie_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found companie with the companie_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated companie: ", { companie_id: companie_id, ...companie });
      result(null, { companie_id: companie_id, ...companie });
    }
  );
};

Companie.remove = (companie_id, result) => {
  sql.query("DELETE FROM companies WHERE companie_id = ? ; SET  @num := 0; UPDATE companies SET companie_id = @num := (@num+1); ALTER TABLE companies AUTO_INCREMENT =1;", companie_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found companie with the companie_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted companie with id: ", companie_id);
    result(null, res);
  });
};

Companie.removeAll = result => {
  sql.query("DELETE FROM companies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} companies`);
    result(null, res);
  });
};

module.exports = Companie;