

const express = require('express');
const fs = require('fs'); // You need to require the 'fs' module
const port = 4000;
const mysql = require("./Connection").con
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();


app.set("view engine", "hbs");
app.set("views", "./")

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => { res.redirect('/'); })

});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  const data = fs.readFileSync('HomePage/HomePage.hbs', 'utf8'); // Specify encoding as 'utf8' to get a string
  res.send(data);
});
//applying css
app.use(express.static(__dirname + '/HomePage'))


app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret
  resave: false,
  saveUninitialized: false,
}));

app.get('/searchResult', (req, res) => {

  res.render("searchResult");
});

app.get('/teacherLogin', (req, res) => {
  res.render("teacherLogin");
});



app.get('/addResult', (req, res) => {
  if (req.session.teacherlogin) {

  res.render("addResult");
  }

else {
    res.render("TeacherLogin", { alertMessage: "You need to log in as a teacher to access this page." });
  }
});



app.get('/teacherSignup', (req, res) => {
  res.render("teacherSignup");
});


app.get('/aboutUs', (req, res) => {
  res.render("aboutUs");
});



app.get('/addTeacherSignup', (req, res) => {
  // Fetch data from the query parameters
  const fullName = req.query.fullName;
  const email = req.query.email;
  const password = req.query.password;

  // Insert the data into the database
  const insertQuery = 'INSERT INTO teachersignup (fullName, email, password) VALUES (?, ?, ?)';
  mysql.query(insertQuery, [fullName, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Data inserted successfully
      res.render("teacherLogin");
    }
  });
});

// app.get('/AddStudentByTeacher', (req, res) => {
//   res.send(req.query)
// });


app.get('/AddStudentByTeacher', (req, res) => {
  if (req.session.teacherlogin) {
    const rollNumber = req.query.rollNumber;
    const name = req.query.name;
    const dateOfBirth = req.query.dateOfBirth;
    const score = req.query.score;

    // Check if the rollNumber already exists in the database
    const checkQuery = 'SELECT COUNT(*) AS count FROM add_student_data WHERE rollNumber = ?';
    mysql.query(checkQuery, [rollNumber], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking for duplicate rollNumber:', checkErr);
        res.status(500).send('Internal Server Error');
      } else {
        const count = checkResults[0].count;

        // If count is greater than 0, it means the rollNumber already exists
        if (count > 0) {
         
          res.render("addResult", { alertMessageForIdenticalRollNumber: "Roll Number already exists. Please choose a different one." });
        } else {
          // Insert the data into the database
          const insertQuery = 'INSERT INTO add_student_data (rollNumber, name, dateOfBirth, score) VALUES (?, ?, ?, ?)';
          mysql.query(insertQuery, [rollNumber, name, dateOfBirth, score], (insertErr, insertResults) => {
            if (insertErr) {
              console.error('Error inserting data:', insertErr);
              res.status(500).send('Internal Server Error');
            } else {
              // Data inserted successfully
              res.redirect('/view');
            }
          });
        }
      }
    });
  } else {
    res.render("TeacherLogin", { alertMessage: "You need to log in as a teacher to access this page." });
  }
});


// POST route for handling form submissions


app.post('/teacherLogin', (req, res) => {
  const { email, password } = req.body;

  // Query the database to check the user's credentials
  const query = 'SELECT * FROM TeacherSignup WHERE email = ? AND password = ?';

  mysql.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {

      req.session.teacherlogin = true;
      res.redirect('/view');
      // User exists, login successful

      // res.redirect('/view'); // You can also redirect to a dashboard or another page
    } else {
      // User not found or invalid credentials
      res.redirect('/teacherLogin');
    }
  });

});


///view


app.get("/view", (req, res) => {
  if (req.session.teacherlogin) {
    let qry = "select * from add_student_data ";
    mysql.query(qry, (err, results) => {
      if (err) throw err;
      else {
        res.render("view", { data: results });
      }
    });
  } else {
    res.render("TeacherLogin", { alertMessage: "You need to log in as a teacher to access this page." });
  }
});



//update

app.get('/update/:id', (req, res) => {
  if (req.session.teacherlogin) {
    const studentId = req.params.id;

    // Fetch the student data from the database by ID
    const selectQuery = 'SELECT * FROM add_student_data WHERE id = ?';
    mysql.query(selectQuery, [studentId], (err, results) => {
      if (err) {
        console.error('Error fetching student data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.length === 0) {
        // Handle the case where the student is not found
        res.send('Student not found');
      } else {
        // Render the updateStudent template with student data
        res.render('update', { student: results[0] });
      }
    });
  }
  else {
    res.render("TeacherLogin", { alertMessage: "You need to log in as a teacher to access this page." });
  }
});

// Define route to handle the form submission for updating a student
app.post('/update/:id', (req, res) => {
  if (req.session.teacherlogin) {
    const studentId = req.params.id;
    const updatedStudent = {
      rollNumber: req.body.rollNumber,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      score: req.body.score,
    };

    // Update the student data in the database by ID
    const updateQuery =
      'UPDATE add_student_data SET rollNumber = ?, name = ?, dateOfBirth = ?, score = ? WHERE id = ?';

    mysql.query(
      updateQuery,
      [
        updatedStudent.rollNumber,
        updatedStudent.name,
        updatedStudent.dateOfBirth,
        updatedStudent.score,
        studentId,
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating student data:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (results.affectedRows === 0) {
          // Handle the case where the student is not found
          res.send('Student not found');
        } else {
          // Redirect to a page showing all students after successful update
          res.redirect('/view');
        }
      }
    );
  }

  else {
    res.render("TeacherLogin", { alertMessage: "You need to log in as a teacher to access this page." });
  }
});

//delete
// Define a DELETE route for deleting a student by ID
app.get('/delete/:ID', (req, res) => {
  const studentID = req.params.ID;

  // Implement the logic to delete the student record from your database
  const deleteQuery = 'DELETE FROM add_student_data WHERE ID = ?';

  mysql.query(deleteQuery, [studentID], (err, results) => {
    if (err) {
      console.error('Error deleting student data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      // Handle the case where the student is not found
      res.send('Student not found');
    } else {
      // Redirect to a page showing all students after successful delete
      res.redirect('/view'); // You may change the URL as needed
    }
  });

});

//search student result
app.get('/searchStudentResult', (req, res) => {
  // Get filter criteria from query parameters (e.g., rollNumber and name)
  const rollNumber = req.query.rollNumber;
  const name = req.query.name;

  // Check if both rollNumber and name are provided
  if (rollNumber && name) {
    // Query the database to filter data based on criteria (modify the SQL query accordingly)
    const filterQuery = 'SELECT * FROM add_student_data WHERE rollNumber = ? AND name = ?';

    mysql.query(filterQuery, [rollNumber, name], (err, results) => {
      if (err) {
        console.error('Error filtering data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if results were found
      if (results.length > 0) {
        // Render the filteredData template with the filtered results
        res.render('searchResultData', { filteredData: results });
      } else {
        // No results found
        res.render("searchResult", { alertMessageForNoValueFound: "There is no result available for the given credentials." });
      }
    });
  } else {
    // Invalid or missing input
    res.render("searchResult", { alertMessageForNull: "Please enter valid input for both Roll Number and Name." });
  }
});



// app.get('/filterForm', (req, res) => {
//   const data = fs.readFileSync('searchResult.hbs', 'utf8'); // Specify encoding as 'utf8' to get a string
//   res.send(data);
// });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



