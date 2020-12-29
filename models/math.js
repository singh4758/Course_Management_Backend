const mongoose = require('mongoose');


const mathSchema = new mongoose.Schema({
    AssignName : {
        type : String,
        required : true
    },
    deadline : {
        type : Number,
        required : true
    },
    studentRecord : [{
        student : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Student'
        },
        evaluated : {
            type : Boolean,
        },
        marks : {
            type : Number,
        }
    }]
},{
    timestamps : true
});

const Math = mongoose.model('Math',mathSchema);
module.exports = Math;