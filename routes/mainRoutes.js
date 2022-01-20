const express = require('express');
const multer = require("multer");
const path = require('path');
const mainController = require('../controllers/mainController');
const router = express.Router();

    
let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/img');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
});

router.get('/',mainController.getMainPage);
router.get('/Admin/Admin',mainController.getAdmin);
router.get('/Login',mainController.getLogin);
router.get('/Admin/Create',mainController.getCreate);
router.get('/Admin/Edit',mainController.getEdit);

router.post('/Login',mainController.postLogin);
router.post('/updPersonalInfo', mainController.updPersonalInfo);
router.post('/updSkills', mainController.updSkills);
router.post('/updEducation', mainController.updEducation);
router.post('/NewEducation', mainController.newEducation);
router.post('/NewSkill', mainController.newSkill);
router.post('/DeleteEducation', mainController.deleteEducation);
router.post('/DeleteSkill', mainController.deleteSkill);
router.post('/updContactInfo', mainController.updContactInfo);
router.post('/uploadProfilePic', upload.single('profilePicture'), mainController.updProfilePic);

module.exports = router;