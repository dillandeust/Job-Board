const sql = require("./database.js");
var bodyParser = require('body-parser');

// constructor
const Advertisement = function (advertisement) {
  this.title = advertisement.title;
  this.place = advertisement.place;
  this.wage = advertisement.wage;
  this.workingtime = advertisement.workingtime;
  this.description = advertisement.description;
  this.detail_role = advertisement.detail_role;
  this.company = advertisement.company;
};

Advertisement.create = (newadvertisement, result) => {
  sql.query("INSERT INTO advertisements SET ? ; SET  @num := 0; UPDATE advertisements SET advertisement_id = @num := (@num+1); ALTER TABLE advertisements AUTO_INCREMENT =1; ", newadvertisement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created advertisement: ", { advertisement_id: res.insertadvertisement_Id, ...newadvertisement });
    result(null, { advertisement_id: res.insertadvertisement_Id, ...newadvertisement });
  });
};

Advertisement.findById = (advertisement_id, result) => {
  sql.query(`SELECT * FROM advertisements WHERE advertisement_id = ${advertisement_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found advertisement: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found advertisement with the advertisement_id
    result({ kind: "not_found" }, null);
  });
};

Advertisement.getAll = (title, result) => {
  let query = "SELECT * FROM advertisements";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("advertisements: ", res);
    result(null, res);
  });
};

Advertisement.findByTitle = (title, result) => {
  sql.query(`SELECT * FROM advertisements WHERE title = ${title}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found advertisement: ", res);
      result(null, res);
      return;
    }

    // not found advertisement with the title
    result({ kind: "not_found" }, null);
  });
};

Advertisement.updateById = (advertisement_id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET title = ?, place = ?, wage = ?, workingtime = ?, description = ?, detail_role = ?, company = ? WHERE advertisement_id = ?",
    [advertisement.title, advertisement.place, advertisement.wage, advertisement.workingtime, advertisement.description, advertisement.detail_role, advertisement.company, advertisement_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found advertisement with the advertisement_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { advertisement_id: advertisement_id, ...advertisement });
      result(null, { advertisement_id: advertisement_id, ...advertisement });
    }
  );
};

Advertisement.updateByIdplace = (advertisement_id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET place = ? WHERE advertisement_id = ?",
    [advertisement.place, advertisement_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found advertisement with the advertisement_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { advertisement_id: advertisement_id, ...advertisement });
      result(null, { advertisement_id: advertisement_id, ...advertisement });
    }
  );
};

Advertisement.updateByIdwage = (advertisement_id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET wage = ? WHERE advertisement_id = ?",
    [advertisement.wage, advertisement_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found advertisement with the advertisement_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { advertisement_id: advertisement_id, ...advertisement });
      result(null, { advertisement_id: advertisement_id, ...advertisement });
    }
  );
};

Advertisement.updateByIdworkingtime = (advertisement_id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET workingtime = ? WHERE advertisement_id = ?",
    [advertisement.workingtime, advertisement_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found advertisement with the advertisement_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { advertisement_id: advertisement_id, ...advertisement });
      result(null, { advertisement_id: advertisement_id, ...advertisement });
    }
  );
};

Advertisement.updateByIddescription = (advertisement_id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET description = ? WHERE advertisement_id = ?",
    [advertisement.description, advertisement_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found advertisement with the advertisement_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { advertisement_id: advertisement_id, ...advertisement });
      result(null, { advertisement_id: advertisement_id, ...advertisement });
    }
  );
};

Advertisement.updateByIddetail = (advertisement_id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET detail_role = ? WHERE advertisement_id = ?",
    [advertisement.detail_role, advertisement_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found advertisement with the advertisement_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { advertisement_id: advertisement_id, ...advertisement });
      result(null, { advertisement_id: advertisement_id, ...advertisement });
    }
  );
};

Advertisement.remove = (advertisement_id, result) => {
  sql.query("DELETE FROM advertisements WHERE advertisement_id = ? ; SET  @num := 0; UPDATE advertisements SET advertisement_id = @num := (@num+1); ALTER TABLE advertisements AUTO_INCREMENT =1;", advertisement_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found advertisement with the advertisement_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted advertisement with advertisement_id: ", advertisement_id);
    result(null, res);
  });
};

Advertisement.removeAll = result => {
  sql.query("DELETE FROM advertisements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} advertisements`);
    result(null, res);
  });
};

module.exports = Advertisement;