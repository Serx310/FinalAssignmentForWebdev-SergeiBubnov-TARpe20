const passport = require("passport");
const viewdata = require('../models/viewdata');
const Admin = require('../models/admin');
var fs = require('fs');

exports.getMainPage =  (req, res) => {
    viewdata.contact.find({},function(err, contact){
        viewdata.personalInfo.find({}, function(err, personalInfo){
            viewdata.education.find({}, function(err, education){
                viewdata.skills.find({type:"Soft"}, function(err, softSkills){
                    viewdata.skills.find({type:"Technical"}, function(err, technicalSkills){
                        res.render('index',{personalInfo: personalInfo, education:education, contact: contact,softSkills:softSkills, technicalSkills:technicalSkills});
                    })
                })
            })
        })
    })    
};



exports.getLogin =  (req, res) => {
    res.render('login');
};

exports.getAdmin = (req, res) => {
    if(req.isAuthenticated()){
                 res.render('admin/admin');     
    } else {
        res.redirect('/Login');
    }
};

exports.getCreate = (req, res) => {
    if(req.isAuthenticated()){
                 res.render('admin/create');     
    } else {
        res.redirect('/Login');
    }
};

exports.getEdit = (req, res) => {
    if(req.isAuthenticated()){
        viewdata.contact.find({}, function(err, contact){
            viewdata.personalInfo.find({}, function(err, personalInfo){
                viewdata.education.find({}, function(err, educations) {
                    viewdata.skills.find({}, function(err, skills) {
                     res.render('admin/edit', {educations: educations, skills: skills, personalInfo: personalInfo, contact:contact});
                 });
                  });
            })
        })
        
        
         
         
    } else {
        res.redirect('/Login');
    }
};

exports.updPersonalInfo = (req, res) => {
    
    if(req.isAuthenticated()){
        const filter = {_id:req.body.id};
        const update = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            dateOfBirth: req.body.dob,
            description: req.body.description,
            country: req.body.country,
            city: req.body.city
        }
        viewdata.personalInfo.findOneAndUpdate(filter, update, function(err, doc){
            if(err){
                console.log(err);
            }
        })

        res.redirect('/Admin/Edit');
    }
    else {
        res.redirect('/login');
    }
}

exports.updContactInfo = (req, res) => {
    
    if(req.isAuthenticated()){
        const filter = {_id:req.body.id};
        const update = {
            phone:req.body.phone,
            email:req.body.email,
            address: req.body.address
        }
        viewdata.contact.findOneAndUpdate(filter, update, function(err, doc){
            if(err){
                console.log(err);
            }
        })

        res.redirect('/Admin/Edit');
    }
    else {
        res.redirect('/login');
    }
}

exports.updSkills = (req, res) => {
    if(req.isAuthenticated()){
        const filter = {_id:req.body.id};
        const update = {
            title: req.body.title,
            type: req.body.skillType
        }
        viewdata.skills.findOneAndUpdate(filter, update, function(err, doc){
            if(err){
                console.log(err);
            }
        })

        res.redirect('/Admin/Edit');
    }
    else {
        res.redirect('/login');
    }
}

exports.updEducation = (req, res) => {
    if(req.isAuthenticated()){
        const filter = {_id:req.body.id};
        
        const update = {
            schoolName: req.body.schoolName,
            educationType: req.body.educationType,
            graduated: req.body.graduated
        }
        viewdata.education.findOneAndUpdate(filter, update, function(err, doc){
            if(err){
                console.log(err);
            }
        })

        res.redirect('/Admin/Edit');
    }
    else {
        res.redirect('/login');
    }
}

exports.newSkill = (req, res) => {
    if(req.isAuthenticated()){
        
        let newSkill = new viewdata.skills({
            title: req.body.title,
            type: req.body.skillType
        }) 
        newSkill.save();

        res.redirect('/Admin/Create');

    }
    else {
        res.redirect('/login');
    }
}

exports.newEducation = (req, res) => {
    if(req.isAuthenticated()){
        let newEducation = new viewdata.education({
            schoolName: req.body.schoolName,
            educationType: req.body.educationType,
            graduated: req.body.graduated
        }) 
        newEducation.save();

        res.redirect('/Admin/Create');

    }
    else {
        res.redirect('/login');
    }
}

exports.postLogin = (req, res) => {
    const user = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error) => {
        if(error){
            console.log(error);
            res.redirect('/Login') ;
        } else {
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/Admin/Admin');
            });
        }
    });
};

exports.deleteEducation = (req, res) => {
    if(req.isAuthenticated()){
        viewdata.education.findByIdAndRemove(req.body.id, function (err, docs) {
        });
            res.redirect('/Admin/Edit');
    }
    else{
        res.redirect('/login');
    }
}

exports.deleteSkill = (req, res) => {
        if(req.isAuthenticated()){
            viewdata.skills.findByIdAndRemove(req.body.id, function (err, docs) {
            });
                res.redirect('/Admin/Edit');
        }
        else{
            res.redirect('/login');
        }
}

exports.updProfilePic = (req, res) => {
    if(req.isAuthenticated()){
        viewdata.personalInfo.findOne({_id:req.body.id},function(err, doc){
            fs.unlinkSync("public/img/"+doc.profilepic);
        })
        console.log(req.body.id)
        const filter = {_id:req.body.id};
        const update = {
            profilepic: req.file.filename
        }
        viewdata.personalInfo.findOneAndUpdate(filter, update, function(err, doc){
            if(err){
                console.log(err);
            }
        })

        res.redirect('/Admin/Edit');
    }
    else {
        res.redirect('/login');
    }
}
exports.Logout = (req, res) => {
    req.logout();
    res.redirect('/');
};