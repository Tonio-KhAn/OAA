const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');
let Qualification = require('../models/qualification.model');
let DegreeName = require('../models/degreeName.model');
let Profile = require('../models/profile.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

const axios = require('axios');

let transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'oaafinal831@gmail.com',
    pass:'thisisthepassword',
  },
  tls:{rejectUnauthorized: false
  }
});

router.route('/').get(auth, (req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });

  
  router.route('/user').get(auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user))
      .catch(err => res.status(400).json('msg: ' + err));
   
});

router.route('/addfriend/').put(auth, (req, res) => {
  var count = 0;
  User.findById(req.user.id)
    .then(user => {
      user.friends.push(req.body.id);

      User.find()
        .then(users => {
          users.forEach(person => {
            count++;
            if(person._id == req.body.id) {
              person.friends.push(req.user.id)
            }

            if(count == users.length) {
              user
                .save()
                .then(() => {
                  person
                    .save()
                    .then(() => res.json(user))
                    .catch(err => res.status(400).json("Error: " + err));
                })
                .catch(err => res.status(400).json("Error: " + err));
            }
          })
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/deletefriend/').put(auth, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      var index = user.friends.indexOf(req.body.id);
      if (index > -1) {
        user.friends.splice(index, 1);
      }
      
      user
        .save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/community').get(auth, (req, res) => {
  var userArray = []
  User.findById(req.user.id)
    .then(myUser => {
      User.find()
      .then(users => {
        users.forEach(user => {
          if (user._id != req.user.id) {
            var temp = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              status: false
            }
            myUser.friends.forEach(friend => {
              if (friend == user._id) {
                temp.status = true;
              }
            })
            userArray.push(temp);
          }
        })
        res.json(userArray)
      })
    .catch(err => res.status(400).json("Error: " + err));
    }) 
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/mycommunity').get(auth, (req, res) => {
  var userArray = []
  User.findById(req.user.id)
    .then(myUser => {
      User.find()
      .then(users => {
        users.forEach(user => {
          if (user._id != req.user.id) {
            var temp = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              status: false
            }
            myUser.friends.forEach(friend => {
              if (friend == user._id) {
                temp.status = true;
                userArray.push(temp);
              }
            })
          }
        })
        res.json(userArray)
      })
    .catch(err => res.status(400).json("Error: " + err));
    }) 
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/suggestedfriends').get(auth, (req, res) => {
  var userDegree = []
  var tempArray = []
  var suggestedArray = []
  DegreeName.find()
    .then(degrees => {
      User.findById(req.user.id)
        .then(user => {
          User.find()
            .then(people => {
              Qualification.find()
                .then(qualifications => {
                  people.forEach(person => {
                    if (person._id != req.user.id) {
                      var temp = {
                        _id: person._id,
                        first_name: person.first_name,
                        last_name: person.last_name,
                        qualifications: [],
                        status: false
                      }
                      user.friends.forEach(friend => {
                        if (friend == person._id) {
                          temp.status = true;
                        }
                      })
                      if (temp.status == false) {
                        tempArray.push(temp)
                      }
                    }
                  })
                  qualifications.forEach(qualification => {
                    tempArray.forEach(temp => {
                      if (qualification.userId == temp._id) {
                        degrees.forEach(degree => {
                          if (qualification.degreeID == degree._id) {
                            temp.qualifications.push(degree.name)
                          }
                        })
                      }
                    })
                  })
                  qualifications.forEach(qualification => {
                    if (qualification.userId == req.user.id) {
                      degrees.forEach(degree => {
                        if (qualification.degreeID == degree._id) {
                          userDegree.push(degree.name)
                        }
                      })
                    }
                  })
                  tempArray.forEach(temp => {
                    temp.qualifications.forEach(qualification => {
                      userDegree.forEach(degree => {
                        if (qualification == degree) {
                          temp.qualifications[0] = degree;
                          suggestedArray.push(temp);
                        }
                      })
                    })
                  })
                res.json(suggestedArray)
                })
                .catch(err => res.status(400).json("Error: " + err));
            })
            .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/email/:id").get((req, res) => {
  const email = req.params.id;
  const uwi_email3 = email.replace('!','.');
  const uwi_email2 = uwi_email3.replace('!','.');
  const uwi_email = uwi_email2.replace('!','.');
  
  User.findOne({uwi_email: uwi_email})
    .then(user => {
      if(user) {
        console.log('User already exists.')
        return res.status(200).json(
          {msg: 'User with same username already exist.'}
        )
      }
      else {
        console.log('User does not exist.')
        return res.status(200).json(
          {msg: 'User does not exist.'}
        )
      }
    })
    .catch(err => res.status(400).json("Error: " + err))
});


router.route('/add').post((req, res) => {
  const uwi_email = req.body.uwi_email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const alt_email = req.body.alt_email;
  const friends = [];
  const dob = req.body.dob;
  const type = req.body.type;
  const sex = req.body.sex;
  const password = req.body.password;
  const resetToken = null;
  const resetTokenExpire = null;
  const verifiedToken = null;
  const verified = 0;
  
  if (!uwi_email || !first_name || !last_name || !dob || !type || !sex || !password){
      return res.status(400).json({msg: ' Enter all Fields' });
  };
  User.findOne({uwi_email})
  .then(user => {
      if(user) return res.status(200).json(
          {msg: 'User with same username already exist'}
      );
      const newUser = new User({
        uwi_email,
        first_name,
        last_name,
        alt_email,
        friends,
        dob,
        type,
        sex,
        password,
        resetToken,
        resetTokenExpire,
        verified,
        verifiedToken,
      });
  bcrypt.genSalt(10,(err,salt) =>{
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          
          newUser.password= hash;
          console.log(newUser.password);
  newUser
    .save()
    .then(
      user => {
      crypto.randomBytes(32,(err,buffer)=>{
        if(err){
          console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({uwi_email})
        .then(user=>{
          if(!user){
            return res.status(200).json({error:"No User with that email address"})
          }
          user.verifiedToken = token
          user.save()
          User.findOne({uwi_email})
          .then(user=>{
            let mailOption = {
              from: 'oaafinal831@gmail.com',
             to: user.uwi_email,
             subject: 'This is a test',
             text: 'this is a test ', 
             html:`
             <p> Click link to verify email.</p>
             <h5><a href="https://dcitconnect.herokuapp.com/verification/${token}">link</a></h5>
             `,
            }
            transporter.sendMail(mailOption,function(err, data){
              if(err){
               console.log('error',err)
               return res.status(200).json({msg: 'error' });
              }else{
                axios.post(
                  'https://api.chatengine.io/projects/people/',
                  { 'username': user.uwi_email, 'secret': 'dcitConnect', 'first_name': user.first_name, 'last_name': user.last_name },
                  { headers: { "Private-Key": '6451a947-04bd-4a1f-ad1b-f26ea5f77c3a' } }
                )
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error))
                return res.status(200).json({msg: 'sucessfull' });
              }
            });
          })
        })
      });
          }
      )
      .catch(err => res.status(400).json("msg: " + err));
      });
      })
  })
});

router.route('/login').post((req, res) => {
  const uwi_email = req.body.uwi_email;
  const password = req.body.password;
  
  if (!uwi_email || !password){
      return res.status(400).json({msg: ' Enter all Fields' });
  }
  User.findOne({uwi_email})
  .then(user => {
      if(!user) return res.status(400).json(
          {msg: 'User does not exist'}
      );
      if(user.verified == false) return res.status(400).json(
        {msg: 'User not verified'}
    );
      bcrypt.compare(password, user.password)
      .then(isMatch =>{
          if(!isMatch) return res.status(400).json({msg: ' Wrong PassWord' });
          JWT.sign(
              {id:user.id
              },
              config.get('jwtSecret'),
              { expiresIn:3600},
              (err, token) =>{
                  if(err) throw err;
                  res.json({token,
                      user:{
                          id: user.id,
                          uwi_email: user.uwi_email
                      }
                  })
                  .catch(err => res.status(400).json("Error: " + err));
              }
          )
      })
});
});

router.route("/verify/:id").post((req, res) => {
  const sentToken = req.params.id;
  User.findOne({verifiedToken: sentToken})
  .then(user=> {
  if(user.verified == true){
    return res.status(200).json(
      {msg: 'User already verified'})
  }
  user.verified = true;
    user.save()
    .then(user=> {
      const userID = user._id;
      const profilePictureID = null;

      const newProfile = new Profile({
        userID,
        profilePictureID
    })
    newProfile.save()
    .then(profile => {
      return res.status(200).json(
        {msg: 'User verified'})
      })

})
.catch(err => res.status(400).json("Error: " + err));
});
})

router.route("/reset").post((req,res)=>{
  const uwi_email = req.body.uwi_email;
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({uwi_email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User with that email does not exist!"})
          }
          user.resetToken = token
          user.resetTokenExpire = Date.now() + 3600000
          user.save().then((result)=>{
              let mailOption = {
               from: 'oaafinal831@gmail.com',
               to: user.uwi_email,
               subject: 'Reset Password',
               text: 'this is a test ', 
               html:`
               <p> Click link to reset password.</p>
               <h5><a href="http://localhost:3000/reset/${token}">link</a></h5>
               `,
              }
              transporter.sendMail(mailOption,function(err, data){
                if(err){
                 console.log('error',err)
                 return res.status(200).json({msg: 'error' });
                }else{
                 return res.status(200).json({msg: 'sucessfull' });
                }
              });
            })

      })
  })
})

router.route("/newpassword").post((req,res)=>{
  const newpassword = req.body.password
  const sentToken = req.body.token

  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})

module.exports = router;