const express = require("express");
const app = express();

app.use(express.static("allowed"));

app.listen(3011);
