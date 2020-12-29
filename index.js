const express = require('express');
const mongoose = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const PORT = 8000;
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); 

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(passport.initialize());
app.use(express.urlencoded({extended : false}));
app.use('/',require('./routes'));


app.listen(PORT,()=>{
    console.log('Successfully Connected');
});