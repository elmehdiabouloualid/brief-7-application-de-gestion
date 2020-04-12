const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const cors = require('cors');
const app = express();


app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views')); //default 'views'
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
app.use(require('./routes/index'));




module.exports = app;


app.listen(3000, () => console.log('listening on port ...'));
//"http://localhost:3000"
