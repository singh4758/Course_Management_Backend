const jsonwebtoken = require('jsonwebtoken');
const Teacher = require('../../../models/teachers');
const Math = require('../../../models/math');
const Student = require('../../../models/students');


module.exports.register = async function(req,res){
    if(req.body.name=='' || req.body.password=='' || req.body.email=='' ){
        return res.status(400).json({
            message : 'Please Fill All Details'
        });
    }

    let teacher = await Teacher.findOne({email : req.body.email})
    if(teacher){
        return res.status(400).json({
            message : 'Teacher Email Id Already Exist'
        })
    }
    teacher = await Teacher.create(req.body);
    return res.status(200).json({
        message : 'Successfully Account is Created'
    });

}

module.exports.login = async function(req,res){
    console.log(req.body);
    if(req.body.email=='' || req.body.password==''){
        return res.status(400).json({
            message : 'Please Fill All Details'
        });
    }
    teacher = await Teacher.findOne({email : req.body.email,password : req.body.password})
    if(!teacher){
        return res.status(400).json({
            message : 'Email Id or Password is Wrong'
        });
    }

    return res.status(200).json({
        message : 'Successully Login and your Token is generate please keep it safe',
        token : jsonwebtoken.sign(teacher.toJSON(),'secret',{expiresIn : 200000})
    });
}

module.exports.profile = async function(req,res){
    let teacher = await Teacher.findById(req.user.id);
    return res.status(200).json({
        teacher : teacher
    });
}

module.exports.profileUpdate = async function(req,res){
    if(req.body.name=='' || req.body.password==''){
        return res.status(400).json({
            message : 'Please fill All Details'
        });
    }
    let teacher = await Teacher.findByIdAndUpdate(req.user.id,req.body);
    if(!teacher){
        return res.status(400).json({
            message : 'Bad Request'
        })
    }
    return res.status(200).json({
        message : 'Updated Successfully'
    });
}



module.exports.addAssignment = async function(req,res){
    if(req.body.AssignName=='' || req.body.deadline==''){
        return res.status(400).json({
            message : 'Incomplete Details'
        });
    }
    let assign = await Math.findOne({AssignName : req.body.AssignName});
    if(assign){
        return res.status(400).json({
            message : 'Assignment Name is Already Present. Please give different name'
        });
    }
    assign = Math.create(req.body);
    if(assign){
        return res.status(200).json({
            message : 'Assignment addedd Successfully'
        });
    }
    return res.status(400).json({
        message : 'Error in adding assignment'
    });
}

module.exports.showAllAssignment = async function(req,res){
    let assign = await Math.find({});
    if(!assign){
        res.status(400).json({
            message : 'Error in finding Assignment'
        });
    }
    return res.status(200).json({
        message : 'All Assignment successfully fetched',
        assign : assign
    });
}

module.exports.show = async function(req,res){
    let assign = await Math.findById(req.query.id);
    if(!assign){
        return res.status(400).json({
            message : 'Bad Request'
        });
    }
    let value = assign.studentRecord.map(({student})=>{
        return student;
    });
    let submitStudent = await Student.find({_id : {$in : value}},{email : 1,name : '1'});
    let notsubmited = await Student.find({_id : {$nin : value}},{email:'1',name:'1'});
    return res.status(200).json({
        message : 'successfully Fetched',
        submitStudent : submitStudent,
        notsubmited : notsubmited
    });
}

module.exports.evaluateAssignment = async function(req,res){
    let assign = await Math.findById(req.query.id);
    if(!assign){
        return res.status(400).json({
            message : 'Bad Request'
        });
    }

    let studentarr = assign.studentRecord;
    let index = studentarr.findIndex(({student})=>{
        console.log(student)
        return student.toString() == req.query.student.toString();
    });
    assign.studentRecord[index].evaluated=true;
    assign.studentRecord[index].marks=req.query.marks;
    assign.save();
    res.status(200).json({
        message : 'Successfully Updated',
        assign : assign
    });

}