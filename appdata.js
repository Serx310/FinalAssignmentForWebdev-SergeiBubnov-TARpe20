const viewdata = require('./models/viewdata');
const Admin = require('./models/admin');
const mongoose = require("mongoose");
const passport = require("passport");

const db = mongoose.connect('mongodb://localhost:27017/thisDB',
{useUnifiedTopology : true});

module.exports = {
    appData: function (){     
        Admin.countDocuments(function(error, count){
            if(count==0){
                
                Admin.register({username: "admin"},"admin",()=>{
                });
            }
        })

    viewdata.skills.countDocuments(function(error, count){
        if(count==0){
            const programmingSkill = new viewdata.skills({
                title: "Programming",
                type: "Technical"
            });
            programmingSkill.save();
            const backEndSkill = new viewdata.skills({
                title: "Back-end",
                type: "Technical"
            });
            backEndSkill.save();
            const frontEndSkill = new viewdata.skills({
                title: "Front-end",
                type: "Technical"
            });
            frontEndSkill.save();
            const versionControlSkill = new viewdata.skills({
                title: "Version control",
                type: "Technical"
            });
            versionControlSkill.save();
            const timeManagementSkill = new viewdata.skills({
                title: "Time management",
                type: "Soft"
            });
            timeManagementSkill.save();
            const creativeThinkingSkill = new viewdata.skills({
                title: "Creative thinking",
                type: "Soft"
            });
            creativeThinkingSkill.save();
            const teamWorkSkill = new viewdata.skills({
                title: "Teamwork",
                type: "Soft"
            });
            teamWorkSkill.save();
        }
    })

    viewdata.contact.countDocuments(function(error, count){
        if(count==0){
            const contact = new viewdata.contact({
                phone:"+42069000",
                email:"notyourbussines@smth.com",
                address:"666 Street, Amsterdam, North-Holland 420 69"
            });
            contact.save();
        }
    })

    viewdata.personalInfo.countDocuments(function(error, count){
        if(count==0){
            const personalData = new viewdata.personalInfo({
                firstName: "Sergei",
                lastName: "Bubnov",
                description: "I'm a beginner coder",
                dateOfBirth: new Date(2002,11,30),
                country: "Estonia",
                city: "Tallinn",
                profilepic: "profile-pic.jpg"
            });
            personalData.save();
        }
    })
    
    viewdata.education.countDocuments(function(error, count){
        if(count==0){
            console.log(count);
            const primarySchool = new viewdata.education({
                schoolName: "Tallinna Arte gümnaasium",
                educationType: "Primary",
                graduated: new Date(2019,6,11),
            });
            primarySchool.save();
            const vocationalSchool = new viewdata.education({
                schoolName: "Tallinna Tööstushariduskeskus",
                educationType: "Vocational/Secondary",
                graduated: new Date(2023,6,11),
            });
            vocationalSchool.save();
            const university = new viewdata.education({
                schoolName: "Tallinna Tehnikaülikool",
                educationType: "Higher education",
                graduated: new Date(2026,6,11),
            });
            university.save();
        }
    })
    }
    
}
