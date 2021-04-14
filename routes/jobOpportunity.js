const router = require('express').Router();
let User = require('../models/user.model');
let JobOpportunity = require('../models/jobOpportunity.model');
let JobOpportunityMedia = require('../models/jobOpportunityMedia.model');
let JobQualifications = require('../models/jobQualifications.model');
let JobSkill = require('../models/jobSkill.model');
let Qualification = require('../models/qualification.model');
let JobApplications = require('../models/jobApplication.model');
let DegreeName = require('../models/degreeName.model');
let CourseName = require('../models/courseName.model');

const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'oaafinal831@gmail.com',
      pass:'thisisthepassword',
    },
    tls:{rejectUnauthorized: false
    }
  });

  router.route("/media/:id").get((req, res) => {
    JobOpportunityMedia.find({jobOpportunityID: req.params.id})
      .then(jobOpportunityMedia => res.json(jobOpportunityMedia))
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/media2/:id").get((req, res) => {
    var mediaArray = [];
    var temp = null;
    var count = 0;
    JobOpportunityMedia.find({jobOpportunityID: req.params.id})
      .then(jobOpportunityMedias => {
        if (jobOpportunityMedias.length == 0){
          return res.json(mediaArray)
        }
        jobOpportunityMedias.forEach(jobOpportunityMedia =>{
          temp ={
            jobOpportunityID: jobOpportunityMedia.jobOpportunityID,
            mediaName: jobOpportunityMedia.mediaName,
            file: null         
          }
          mediaArray.push(temp)
          count= count + 1
          if (count == jobOpportunityMedias.length){
            return res.json(mediaArray)
          }
        })
      })
      .catch(err => res.status(400).json("Error: " + err));
  });
  
  router.route("/applyiedJobs/:id").get(auth, (req, res) => {
    var jobsList = [];
    var count = 0;
    JobApplications.find({userID: req.params.id})
      .then(applications => 
        {
          if(applications.length == 0){
            res.json(jobsList)
          }
          else
          {
          applications.forEach (application => {
          JobOpportunity.findById(application.jobOpportunityID)
          .then (Opportunity => {
            jobsList.push(Opportunity)
            count = count + 1
            if (count === applications.length){
              res.json(jobsList.reverse())
            }
          })
          .catch(err => res.status(400).json("Error: " + err));
        })
        }
        }
        )
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/allJobs/:id").get(auth ,(req, res) => {
    var jobsList = [];
    var jobsListAlt = [];
    var count = 0
    var count2 = 0
    JobOpportunity.find()
    .then(jobs => {
      JobApplications.find({userID: req.params.id})
      .then(applications => {
       jobs.forEach(job =>{
        let check = 0;
        count = 0
        applications.forEach(application =>{
          if (application.jobOpportunityID == job._id){
            check = 1
          }
          count = count + 1
          if (count == applications.length && check == 0){
            if(job.userId != req.params.id){
            jobsList.push(job)
            }
          }
          
        })
        if (job.userId != req.params.id){
          jobsListAlt.push(job)
        }

        count2 = count2 + 1
        if (count2 == jobs.length){
          if (applications.length == 0){
            console.log("1")
            return res.json(jobsListAlt.reverse())
          }
          else{
          res.json(jobsList.reverse())
        }
        }
        
      }) 
      })
      .catch(err => {
        res.status(400).json("Error: " + err)});
    })
    .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const userId = req.user.id;
    const title = req.body.title;
    const company = req.body.company;
    const description = req.body.description;
    const documents = req.body.documents;
    const skills = req.body.skills;
    const degrees = req.body.degrees;
    const open = true;
    const newJobOpportunity = new JobOpportunity({
        userId,
        title,
        description,
        company,
        degrees,
        skills,
        open,
    });
    console.log(documents);
    newJobOpportunity
    .save()
    .then(jobOpportunity => { 
      const jobOpportunityID = jobOpportunity.id
      const jobID = jobOpportunity.id
      console.log(jobOpportunity.id)
      documents.forEach(document => {
       const mediaName = document.name
        console.log(document.name)
        const  newJobOpportunityMedia = new JobOpportunityMedia({
        jobOpportunityID,
        mediaName,
       })
       newJobOpportunityMedia
       .save()
    })
    skills.forEach(skill => {
      const skillName = skill.name
       console.log(skill.name)
       const  newJobSkill = new JobSkill({
       jobOpportunityID,
       skillName,
      })
      newJobSkill
      .save()
   })
   console.log(degrees)
   degrees.forEach(degree => {
    const qualificationID = degree.id
    const  newJobQualifications = new JobQualifications({
      jobID,
      qualificationID,
    })
    newJobQualifications
    .save()
 })
    return res.status(200).json({msg: 'sucessfull' });
    })
    .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/save/:id").get(auth, (req, res) => {
    const jobID = req.params.id;
    JobQualifications.find({jobID: jobID})
    .then(jobQualifications => { 
        jobQualifications.forEach(singleQualification => {
            Qualification.find({degreeID: singleQualification.qualificationID})
            .then(qualification => { 
                qualification.forEach(userQualification => {
                    const thisId = userQualification.userId;
                    User.findById(thisId)
                    .then(user=>{
                        let mailOption = {
                          from: 'oaafinal831@gmail.com',
                         to: user.uwi_email,
                         subject: 'This is a test to see if match works',
                         text: 'this is a test to seee if the matching works ', 
                         html:`
                         <p> Click link to verify email.</p>
                         <h5><a href="http://localhost:8080">link</a></h5>
                         `,
                        }
                        transporter.sendMail(mailOption,function(err, data){
                          if(err){
                           console.log('error',err)
                           return res.status(400).json({msg: 'error' });
                          }else{
                           return res.status(200).json({msg: 'sucessfull' });
                          }
                        });
                      })
                });
            })
          
        });
    })
  
  });
  
  router.route("/").get(auth, (req, res) => {
    JobOpportunity.find((error, data) => {
      if (error) {
        console.log(error);
      } else {
        data.reverse();
        res.json(data);
      }
    })
  });

  router.route("/:id").get(auth, (req, res) => {
    JobOpportunity.find({userId: req.params.id})
    .then(myJobOpportunities => res.json(myJobOpportunities))
    .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/individual/:id").get(auth, (req, res) => {
    JobOpportunity.findById(req.params.id)
    .then(myJobOpportunities => res.json(myJobOpportunities))
    .catch(err => res.status(400).json("Error: " + err));
  });


  router.route("/close/:id").put(auth, (req, res) => {
    JobOpportunity.findById(req.params.id)
    .then(myJobOpportunities => 
      {
        myJobOpportunities.open = false;
        console.log(myJobOpportunities.open)
        myJobOpportunities
          .save()
          .then(() => res.json(myJobOpportunities))
          .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/successfulApplicants/:id").put(auth, (req, res) => {
    console.log(req.body)
    JobOpportunity.findById(req.params.id)
    .then(myJobOpportunities => 
      {
        myJobOpportunities.applicants = req.body;
        myJobOpportunities
          .save()
          .then(() => res.json(myJobOpportunities.applicants))
          .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/review/:id").put(auth, (req, res) => {
    console.log(req.body)
    JobOpportunity.findById(req.params.id)
    .then(myJobOpportunities => 
      {
        console.log(myJobOpportunities.applicants[req.body.index] )
        myJobOpportunities.applicants = req.body.review;
        myJobOpportunities
          .save()
          .then(() => res.json(myJobOpportunities.applicants))
          .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
  });


  router.route("/degrees2/:jobId/:userId").get(auth, (req, res) => {
    var degreesArray = [];
    var temp = null;
    var count2 = 0;
    var count1 = 0;
      JobQualifications.find({jobID: req.params.jobId})
      .then(degrees => {
        if(degrees.length == 0 ){
          res.json(degreesArray)
        }
        Qualification.find({userId: req.params.userId})
        .then(myDegrees => {
          degrees.forEach(singleDegree=>{
            count2=0
            var check=false
              if (myDegrees.length == 0){
                DegreeName.findById(singleDegree.qualificationID)
                .then(degreeToSave => {
                temp = {
                  degreeName: degreeToSave.name,
                  has: check
                }
                degreesArray.push(temp)
                count1 = count1 + 1
                if (count1 == degrees.length){
                  res.json(degreesArray)
                }
              })
              .catch(err => res.status(400).json("Error: " + err));
              }

              myDegrees.forEach(mySingleDegree =>{
              if(singleDegree.qualificationID == mySingleDegree.degreeID){
              check=true
              }
            count2= count2 + 1
              if (count2 == myDegrees.length){
                DegreeName.findById(singleDegree.qualificationID)
                .then(degreeToSave => {
                temp = {
                  degreeName: degreeToSave.name,
                  has: check
                }
                degreesArray.push(temp)
                count1 = count1 + 1
                if (count1 == degrees.length){
                  res.json(degreesArray)
                }
              })
              .catch(err => res.status(400).json("Error: " + err));
            }
          })
         
        })
      })
        .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/degrees/:id").get(auth, (req, res) => {
    var degreesArray = [];
    var temp = null;
    var count2 = 0;
    var count1 = 0;
      JobQualifications.find({jobID: req.params.id})
      .then(degrees => {
        if(degrees.length == 0 ){
          res.json(degreesArray)
        }
        Qualification.find({userId: req.user.id})
        .then(myDegrees => {
          degrees.forEach(singleDegree=>{
            count2=0
            var check=false
              if (myDegrees.length == 0){
                DegreeName.findById(singleDegree.qualificationID)
                .then(degreeToSave => {
                temp = {
                  degreeName: degreeToSave.name,
                  has: check
                }
                degreesArray.push(temp)
                count1 = count1 + 1
                if (count1 == degrees.length){
                  res.json(degreesArray)
                }
              })
              .catch(err => res.status(400).json("Error: " + err));
              }

              myDegrees.forEach(mySingleDegree =>{
              if(singleDegree.qualificationID == mySingleDegree.degreeID){
              check=true
              }
            count2= count2 + 1
              if (count2 == myDegrees.length){
                DegreeName.findById(singleDegree.qualificationID)
                .then(degreeToSave => {
                temp = {
                  degreeName: degreeToSave.name,
                  has: check
                }
                degreesArray.push(temp)
                count1 = count1 + 1
                if (count1 == degrees.length){
                  res.json(degreesArray)
                }
              })
              .catch(err => res.status(400).json("Error: " + err));
            }
          })
         
        })
      })
        .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error: " + err));

  });

  router.route("/skills/:id").get(auth, (req, res) => {
    var mySkills = []
    var count1 = 0
    var count2 = 0
    var count3 = 0
    var count4 = 0
    var check = false
    var skillsToSend =[]
    JobSkill.find({jobOpportunityID: req.params.id})
    .then(skills =>{
      if(skills.length == 0 ){
        res.json(skillsToSend)
      }
      Qualification.find({userId: req.user.id})
        .then(myDegrees => {
          if(myDegrees.length == 0){
            skills.forEach(skill =>{
              count4 = 0
                temp = {
                  skillName: skill.skillName,
                  has: false
                }
                skillsToSend.push(temp)
                count3 = count3 + 1
                if (count3 == skills.length){
                  res.json(skillsToSend)
                }
              })
          }
          myDegrees.forEach(myDegree =>{
          count2 = 0
          count1 = count1 + 1
          myDegree.courses.forEach(course =>{
            CourseName.find({courseTitle: course.name})
            .then(courseInfo =>{
            mySkills.concat(courseInfo.skills)
          })
          .catch(err => res.status(400).json("Error: " + err));
          count2 = count2 + 1
          })
               if (count1 == myDegrees.length && count2 == myDegree.courses.length){
            skills.forEach(skill =>{
              check= false
              count4 = 0
              if (mySkills.length == 0){
                
                var temp = {
                  skillName: skill.skillName,
                  has: check
                }
                skillsToSend.push(temp)
                count3 = count3 + 1
                if (count3 == skills.length){
                  return res.json(skillsToSend)
                }
              }
              mySkills.forEach(mySkill =>{
              if (skill.skillName == mySkill.name){
              check= true
              }
              count4 = count4 + 1
              if (count4 == mySkills.length ){
                temp = {
                  skillName: skill.skillName,
                  has: check
                }
                skillsToSend.push(temp)
                count3 = count3 + 1
              }
              if (count3 == skills.length){
                return res.json(skillsToSend)
              }
              })
            })
    
          }
        })
      })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));

  });

  router.route("/skills2/:jobId/:userId").get(auth, (req, res) => {
    var mySkills = []
    var count1 = 0
    var count2 = 0
    var count3 = 0
    var count4 = 0
    var ckeck = false
    var skillsToSend =[]
    JobSkill.find({jobOpportunityID: req.params.jobId})
    .then(skills =>{
      if(skills.length == 0 ){
        res.json(skillsToSend)
      }
      Qualification.find({userId: req.params.userId})
        .then(myDegrees => {
          if(myDegrees.length == 0){
            skills.forEach(skill =>{
              count4 = 0
                temp = {
                  skillName: skill.skillName,
                  has: false
                }
                skillsToSend.push(temp)
                count3 = count3 + 1
                if (count3 == skills.length){
                  res.json(skillsToSend)
                }
              })
          }
          myDegrees.forEach(myDegree =>{
          count2 = 0
          count1 = count1 + 1
          myDegree.courses.forEach(course =>{
            CourseName.find({courseTitle: course.name})
            .then(courseInfo =>{
            mySkills.concat(courseInfo.skills)
          })
          .catch(err => res.status(400).json("Error: " + err));
          count2 = count2 + 1
          })
               if (count1 == myDegrees.length && count2 == myDegree.courses.length){
            skills.forEach(skill =>{
              check= false
              count4 = 0
              if (mySkills.length == 0){
                
                temp = {
                  skillName: skill.skillName,
                  has: check
                }
                skillsToSend.push(temp)
                count3 = count3 + 1
                if (count3 == skills.length){
                  return res.json(skillsToSend)
                }
              }
              mySkills.forEach(mySkill =>{
              if (skill.skillName == mySkill.name){
              check= true
              }
              count4 = count4 + 1
              if (count4 == mySkills.length ){
                temp = {
                  skillName: skill.skillName,
                  has: check
                }
                skillsToSend.push(temp)
                count3 = count3 + 1
              }
              if (count3 == skills.length){
                return res.json(skillsToSend)
              }
              })
            })
    
          }
        })
      })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));

  });

  module.exports = router;