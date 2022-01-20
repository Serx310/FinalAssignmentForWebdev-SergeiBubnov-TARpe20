const mongoose = require("mongoose");

const personalInfo = new mongoose.Schema({
    firstName:String,
    lastName:String,
    dateOfBirth:{type: Date},
    description: String,
    country:String,
    city: String,
    profilepic:String
});

const contact = new mongoose.Schema({
    phone:String,
    email:String,
    address:String
});

const education = new mongoose.Schema({
    schoolName:String,
    educationType: String,
    graduated:{type: Date}
});

const skills = new mongoose.Schema({
    title:String,
    type:String
});



module.exports = {
    personalInfo:mongoose.model('personalInfo', personalInfo),
    education:mongoose.model('Education', education),
    skills:mongoose.model('Skills', skills),
    contact:mongoose.model('Contact', contact),
  }
  