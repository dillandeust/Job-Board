require('dotenv').config()

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require('express-session');

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

var bodyParser = require('body-parser')
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type 
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


require("./routes/advertisement.routes.js")(app);
require("./routes/companie.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/applying.routes.js")(app);

// set port, listen for requests
app.listen(8080, () => {
  console.log(`Server is running`);
});