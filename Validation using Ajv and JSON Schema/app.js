const path = require("path");
const express = require("express");
const app = express();
const Ajv = require("ajv");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    dept: {
      type: "string",
      enum: ["SD", "SA", "MD"],
      maxLength: 2,
      minLength: 2,
    },
  },
  required: ["name", "dept"],
  maxProperties: 2,
};

const ajv = new Ajv();
let validator = ajv.compile(schema);

app.use(express.json());
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

//create new student

app.post("/api/Students", (req, res) => {
  let valid = validator(req.body);
  if (valid) {
    req.body.id = Students.length + 1;
    Students.push(req.body);
    res.json(req.body);
  } else {
    res.status(403).send("forbidden command");
  }
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
