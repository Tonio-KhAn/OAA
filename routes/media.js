const router = require('express').Router();
const bcrypt = require('bcryptjs');
let Media = require('../models/media.model');
let Profile = require('../models/profile.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb) {
        console.log("1");
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });
  const storageResume = multer.diskStorage({
    destination: "./resumes/",
    filename: function(req, file, cb) {
        console.log("1");
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });
  const upload = multer({ storage: storage }).single("image");

  const uploadResume = multer({ storage: storageResume }).single("pdf");

  router.route("/resume/").post(uploadResume, auth, (req, res) => {
    const type = "pdf";
    const location = req.file.filename;
    const newMedia = new Media({
        location,
        type
    });
  
    newMedia
      .save()
      .then(media => {
          Profile.findOne({userID : req.user.id})
          .then(user => {
              console.log(user)
              user.resumeID = media._id;
              user
                .save()
                .then(() => res.json(media.location))
                .catch(err => res.status(400).json("Error: " + err));
          })
          .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/profilePic/").post(upload, auth, (req, res) => {
    const type = "image";
    const location = req.file.filename;
    const newMedia = new Media({
        location,
        type
    });
  
    newMedia
      .save()
      .then(media => {
          Profile.findOne({userID : req.user.id})
          .then(user => {
              console.log(user)
              user.profilePictureID = media._id;
              user
                .save()
                .then(() => res.json(media.location))
                .catch(err => res.status(400).json("Error: " + err));
          })
          .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route('/profile').get(auth, (req, res) => {
    Profile.findOne({userID : req.user.id})
      .then(profile =>{
          Media.findById(profile.profilePictureID)
          .then(media => res.json(media))
          .catch(err => res.status(400).json('msg: ' + err));
      })
      .catch(err => res.status(400).json('msg: ' + err));
   
  });

  router.route('/resume').get(auth, (req, res) => {
    Profile.findOne({userID : req.user.id})
      .then(profile =>{
          Media.findById(profile.resumeID)
          .then(media => res.json(media))
          .catch(err => res.status(400).json('msg: ' + err));
      })
      .catch(err => res.status(400).json('msg: ' + err));
   
  });
  
  

module.exports = router;