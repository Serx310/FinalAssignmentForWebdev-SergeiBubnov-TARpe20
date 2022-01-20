const mongoose = require("mongoose");
const passport = require("passport");
const passPortLocalMongoose = require("passport-local-mongoose");


const adminSchema = new mongoose.Schema({
    username:String,
    password:String
});

adminSchema.plugin(passPortLocalMongoose);
const Admin = mongoose.model("Admin", adminSchema);

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

module.exports = mongoose.model('Admin', adminSchema);