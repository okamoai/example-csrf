const express = require("express");
const app = express();

app.use(express.static("notallowed"));

app.listen(3012);
