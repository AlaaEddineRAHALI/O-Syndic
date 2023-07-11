/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

// to start express:
const app = express();
/*  We don't need bodyParser and Cors because Express can handle them: 
const bodyParser = require("body-parser");
Politic CORS
*/
app.use(
  cors({
    // Vite start on PORT 5173
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
/* we replace bodyParser by express 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connection Database Lib
const pool = require("./lib/bd");

/* Select All Posts from databse to test our configuration 
we can test Postman for testing
*/
app.get("/api/get", (req, res) => {
  const selectQuery = "SELECT * FROM mailinfo";
  pool.query(selectQuery, (err, data) => {
    if (err) {
      res.status(400).json({ error: "Post request error" });
    } else {
      res.status(200).json({
        message: "Post request successfully",
        data: data,
      });
    }
  });
});

//// * create post * ////
app.post("/api/post/create", (req, res) => {
  // envoyer req avec object contenant mail & name ( body)
  const { name, lastName, email, code, city } = req.body;

  const InsertQuery = `INSERT INTO mailinfo (name, lastname, email, code, city)VALUES (?, ?, ?, ?, ?)`;
  const user = [name, lastName, email, code, city];
  console.log(user);

  pool.query(InsertQuery, user, (err, data) => {
    if (err) {
      res.json({ error: "crated failed" });
    } else {
      res.json({
        error: false,
        data: data,
        message: "Post insert successfully.",
      });
    }
  });
});

// Listen Server:
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => {
  console.log(`listen_on ${PORT}`);
});
