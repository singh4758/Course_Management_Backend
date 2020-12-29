const express = require('express');
const passport = require('passport');
const router = express.Router();
const teacherController = require('../../../controllers/api/v1/teacher');

router.post('/register',teacherController.register);
router.post('/login',teacherController.login);
router.post('/addAssignment',passport.authenticate('teacher',{session : false}),teacherController.addAssignment);
router.post('/profileUpdate',passport.authenticate('teacher',{session : false}),teacherController.profileUpdate);
router.get('/profile',passport.authenticate('teacher',{session:false}),teacherController.profile);
router.get('/showAllAssignment',passport.authenticate('teacher',{session : false}),teacherController.showAllAssignment);
router.get('/show',passport.authenticate('teacher',{session : false}),teacherController.show);
router.get('/evaluateAssignment',passport.authenticate('teacher',{session:false}),teacherController.evaluateAssignment);


module.exports = router;