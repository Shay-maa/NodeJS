const express = require("express");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

const Students = [
  { name: "Ali", dept: "PD", id: 1 },
  { name: "Nour", dept: "SA", id: 2 },
  { name: "Mona", dept: "MD", id: 3 },
  { name: "Sara", dept: "SAP", id: 4 },
  { name: "Mostafa", dept: "EB", id: 5 },
  { name: "Ahmed", dept: "GD", id: 6 },
  { name: "Noha", dept: "GA", id: 7 },
];

app.get("/", (req, res) => {
  console.log("Request Recived...");
  res.sendFile(path.join(__dirname, "/client.html"));
});

//req body
app.post("/welcom.html", (req, res) => {
  res.send(`Hey..${req.body.fnm} ${req.body.lnm} thanks for sending data`);
});

//Get All
app.get("/api/Students", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(Students);
});

//request student by id
//passing data from client to server via URL pararmeters
app.get("/api/Students/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let id = req.params.id;
  const std = Students.find((val, index, arr) => {
    return val.id == id;
  });
  if (std) res.json(std);
  else res.send("Not Found");
});

//create new student

app.post("/api/Students", (req, res) => {
  req.body.id = Students.length + 1;
  Students.push(req.body);
  res.json(req.body);
});

//Delete existing student

app.delete("/api/Students/:id", (req, res) => {
  let idx = Students.findIndex((val) => {
    return val.id == req.params.id;
  });
  if (idx != -1) {
    Students.splice(idx, 1);
    res.send("one element affected");
  } else {
    res.send("Student not found");
  }
});

//update for student data

app.put("/api/Students/:id", (req, res) => {
  let idx = Students.findIndex((val) => {
    return val.id == req.params.id;
  });

  if (idx != -1) {
    for (i in req.body) {
      Students[idx][i] = req.body[i];
    }
    res.json(Students[idx]);
  } else {
    res.send("Student not found");
  }
});

app.listen(port, () => {
  console.log(`Listening....!!!!!!!${port}`);
});
