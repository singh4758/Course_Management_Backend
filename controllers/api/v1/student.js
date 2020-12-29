const Student = require('../../../models/students');
const Math = require('../../../models/math');
const jsonwebtoken = require('jsonwebtoken');
const { get } = require('../../../routes/api/v1/student');


module.exports.register = async function(req,res){
    if(req.body.name=='' || req.body.password=='' || req.body.email=='' ){
        return res.status(400).json({
            message : 'Please Fill All Details'
        });
    }

    let student = await Student.findOne({email : req.body.email})
    if(student){
        return res.status(400).json({
            message : 'Student Email Id Already Exist'
        })
    }
    student = await Student.create(req.body);
    return res.status(200).json({
        message : 'Successfully Account is Created'
    });

}

module.exports.login = async function(req,res){
    if(req.body.email=='' || req.body.password==''){
        return res.status(400).json({
            message : 'Please Fill All Details'
        });
    }
    student = await Student.findOne({email : req.body.email,password : req.body.password})
    if(!student){
        return res.status(400).json({
            message : 'Email Id or Password is Wrong'
        });
    }

    return res.status(200).json({
        message : 'Successully Login and your Token is generate please keep it safe',
        token : jsonwebtoken.sign(student.toJSON(),'secret',{expiresIn : 200000})
    });
}

module.exports.profile = async function(req,res){
    let student = await Student.findById(req.user.id);
    return res.status(200).json({
        student : student
    });
}

module.exports.profileUpdate = async function(req,res){
    if(req.body.name=='' || req.body.password==''){
        return res.status(400).json({
            message : 'Please fill All Details'
        });
    }
    let student = await Student.findByIdAndUpdate(req.user.id,req.body);
    if(!student){
        return res.status(400).json({
            message : 'Bad Request'
        })
    }
    return res.status(200).json({
        message : 'Updated Successfully'
    });
}




module.exports.showSubmitedAssignment = async function(req,res){
    let assign = await Math.find({"studentRecord.student":req.user._id},{AssignName : 1,deadline :1,"studentRecord.evaluated":1,"studentRecord.marks":1});
    if(!assign){
        return res.json(400).json({
            message : 'No assignment Submited'
        })
    }
    return res.status(200).json({
        message : 'All Successfully Submited Assignment',
        assign : assign
    })
}

module.exports.showUpcommingAssignment = async function(req,res){
    let date = new Date();
    date = date.getDate() +""+(date.getMonth()+1)+""+date.getFullYear();
    let assign = await Math.find({"studentRecord.student" : {$nin :[req.user.id]} ,deadline : {$gte : date} },{AssignName : 1,deadline :1});
    if(!assign){
        return res.json(400).json({
            message : 'No Upcomming Assignment'
        })
    }
    return res.status(200).json({
        message : 'All Upcomming Assignment',
        assign : assign
    })
}


module.exports.doneAssignment = async function(req,res){
    let assign = await Math.findById(req.params.id);
    if(!assign){
        return res.status(400).json({
            message : 'Error in finding Assignment'
        })
    }
    assign.studentRecord.push({student : req.user._id,evaluated : false});
    assign.save();
    return res.status(200).json({
        message : 'Successfully done assignment'
    });
    
}