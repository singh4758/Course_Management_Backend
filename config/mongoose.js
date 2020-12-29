const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CollegeManagementPortal');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in Connecting Database'));

db.once('open',function(){
    console.log('Successfully Connected To Database');
})

module.exports = db;