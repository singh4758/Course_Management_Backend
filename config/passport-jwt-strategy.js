const passport = require('passport');
const JwtStartegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../models/students');
const Teacher = require('../models/teachers');


let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret',
}

passport.use('student',new JwtStartegy(opts,function(jwtPayLoad,done){
    Student.findById(jwtPayLoad._id,function(err,student){
        if(err){
            console.log('Error in finding doctor');
            return;
        }

        if(student){
            return done(null,student);
        }else{
            return done(null,false);
        }

    });
}));

passport.use('teacher',new JwtStartegy(opts,function(jwtPayLoad,done){
    Teacher.findById(jwtPayLoad._id,function(err,teacher){
        if(err){
            console.log('Error in finding doctor');
            return;
        }

        if(teacher){
            return done(null,teacher);
        }else{
            return done(null,false);
        }

    });
}));

module.exports = passport;