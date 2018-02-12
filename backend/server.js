const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Enable cross origin requests
app.use(cors());

// Database
const connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  port     : "3306",
  database : "reactpb"
});

// Start the database connection
connection.connect(function(err) {
  if (err) {
    console.error('~ Database connection failed: ' + err.stack);
    return;
  }
  console.log('~ Connected to database.');
});


// Routes and handlers
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// [GET] contacts
app.get('/contacts', (req, res) => {

  console.log("[GET] contacts");
  connection.query('SELECT * FROM Contacts', function (error, results, fields) {
    res.send(results);
    console.log(results);
    // Handle error after the release.
    if (error) throw error;
  });
});

app.put('/contacts', (req, res) => {
  console.log('[PUT] contact');

  if (typeof req.body.isFavorite !== "undefined")
    connection.query(`UPDATE Contacts SET isFavorite = '${req.body.isFavorite}' WHERE Id =' ${req.body.id}'`, (error, results, fields) => {
        res.send(results);
        console.log(results)

        if (error) throw error;
    });
  else if (typeof req.body.id !== "undefined" && typeof req.body.name !== "undefined" && typeof req.body.lastname !== "undefined" && typeof req.body.DOB !== "undefined" && typeof req.body.tel_no !== "undefined")
    connection.query(`UPDATE Contacts SET Id = '${req.body.id}', Name = '${req.body.name}', lastname = '${req.body.lastname}', DOB = '${req.body.DOB}', TelNo = '${req.body.tel_no}' WHERE Id =' ${req.body.id}'`, (error, results, fields) => {
        res.send(results);
        console.log(results)

        if (error) throw error;
    });

  else console.log("Whoops, something went wrong, check the request", req);


});

// [POST] contact

app.post('/contact', (req, res) => {
  console.log("[POST] contact ")
  connection.query(`INSERT INTO Contacts (Id, Name, lastname, DOB, TelNo) VALUES( '${req.body.id}', '${req.body.name}','${req.body.lastname}','${req.body.DOB}', '${req.body.tel_no}')`, function (error, results, fields) {
    res.send(results);
    console.log("Inserted contact with ID = ", results);
    if (error) throw error;
  });
});

// [DELETE] contact
app.delete('/contact', (req, res) => {
  console.log("[DELETE] contact")
  connection.query(`DELETE FROM Contacts WHERE Id = '${req.body.id}'`, function (error, results, fields) {
    res.send(results);
      console.log(results)

    if (error) throw error;
  });
});

// Start the server
app.listen(8080, () => console.log('Phonebook server app listening on port 8080'));

// connection.end(); // End connection
