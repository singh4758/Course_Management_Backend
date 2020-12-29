const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../../../controllers/api/v1/student');

router.post('/register',studentController.register);
router.post('/login',studentController.login);
router.post('/profileUpdate',passport.authenticate('student',{session : false}),studentController.profileUpdate);
router.get('/profile',passport.authenticate('student',{session:false}),studentController.profile);
router.get('/showSubmitedAssignment',passport.authenticate('student',{session : false}),studentController.showSubmitedAssignment);
router.get('/showUpcommingAssignment',passport.authenticate('student',{session : false}),studentController.showUpcommingAssignment);
router.get('/doneAssignment/:id',passport.authenticate('student',{session : false}),studentController.doneAssignment);

module.exports = router;