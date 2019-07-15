const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.static("production"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.options("/danger", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3011");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendStatus(200);
});

app.get("/danger", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3011");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.cookies.token) {
    res.send(JSON.stringify({ status: "OK" }));
    console.log("GET: /danger OK");
  } else {
    res.status(401).send(JSON.stringify({ status: "Authorization Failed" }));
  }
});

app.post("/danger", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3011");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.cookies.token) {
    res.send(JSON.stringify({ status: "OK" }));
    console.log("POST: /danger OK");
  } else {
    res.status(401).send(JSON.stringify({ status: "Authorization Failed" }));
  }
});

app.options("/safety", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3011");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendStatus(200);
});

app.get("/safety", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3011");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (
    req.headers.host !== "localhost:3010" ||
    ("origin" in req.headers &&
      !/^http:\/\/localhost:301[01]$/.test(req.headers.origin)) ||
    !("x-requested-with" in req.headers)
  ) {
    res.status(400).send(JSON.stringify({ status: "Bad Request" }));
  } else if (req.cookies.token) {
    res.send(JSON.stringify({ status: "OK" }));
    console.log("GET: /safety OK");
  } else {
    res.status(401).send(JSON.stringify({ status: "Authorization Failed" }));
  }
});

app.post("/safety", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3011");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (
    req.headers.host !== "localhost:3010" ||
    ("origin" in req.headers &&
      !/^http:\/\/localhost:301[01]$/.test(req.headers.origin)) ||
    !("x-requested-with" in req.headers)
  ) {
    res.status(400).send(JSON.stringify({ status: "Bad Request" }));
  } else if (req.cookies.token) {
    res.send(JSON.stringify({ status: "OK" }));
    console.log("POST: /safety OK");
  } else {
    res.status(401).send(JSON.stringify({ status: "Authorization Failed" }));
  }
});

app.listen(3010);
