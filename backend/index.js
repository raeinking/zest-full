const express = require('express')
const app = express()
const port = 8000
const cors = require("cors")
require("dotenv").config();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Import your routes
const path = require("path")
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json())
app.use('/api', routes);
app.use('/files', express.static(path.join(__dirname)));


mongoose.connect('mongodb+srv://zest:zest@zest-property.roglikp.mongodb.net/')
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log('error :' + err.message))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))