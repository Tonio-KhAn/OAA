const router = require('express').Router();
const bcrypt = require('bcryptjs');
let Media = require('../models/media.model');
let Profile = require('../models/profile.model');
let JobApplication = require('../models/jobApplication.model');
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
  const storageFile = multer.diskStorage({
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

  const uploadFile = multer({ storage: storageFile }).single("files");

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

  router.route("/jobApplication/").post(uploadFile, auth, (req, res) => {
    console.log(req.body)
    const type = "pdf"
    const title = req.body.title;
    const location = req.file.filename;
    const newMedia = new Media({
        location,
        type
    });
  
    newMedia
      .save()
      .then(media => {
          JobApplication.findById(req.body.applicationId)
          .then(application => {
            console.log(application)
            var temp = {
                mediaId: media._id,
                title: title };
                application.media.push(temp) 
                application
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

  router.route('/document/:id').get(auth, (req, res) => {
    var temp= null;
    console.log(req.params.id)
    var tempArray =[];
    var count = 0;
    JobApplication.findById(req.params.id)
      .then(applications =>{
        applications.media.forEach(mediaDetails => {
          var tempId = mediaDetails.mediaId
          Media.findById(tempId)
         .then(media => {
          console.log(media)
            temp ={
              title: mediaDetails.title,
              location: media.location
            }
            tempArray.push(temp)
            count = count + 1
            if (count == applications.media.length){
              return res.json(tempArray)
            }
          })
          .catch(err => res.status(400).json('msg: ' + err));
      })
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
  router.route('/resume2/:id').get(auth, (req, res) => {
    Profile.findOne({userID : req.params.id})
      .then(profile =>{
          Media.findById(profile.resumeID)
          .then(media => res.json(media))
          .catch(err => res.status(400).json('msg: ' + err));
      })
      .catch(err => res.status(400).json('msg: ' + err));
   
  });
  
  

module.exports = router;