const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');
let Profile = require('../models/profile.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
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

  




router.route("/email/:id").get((req, res) => {
  const email = req.params.id;
  const uwi_email3 = email.replace('!','.');
  const uwi_email2 = uwi_email3.replace('!','.');
  const uwi_email = uwi_email2.replace('!','.');
  console.log(uwi_email)
    User.findOne({uwi_email: uwi_email})
    .then(user => {
      if(user) return res.status(200).json(
          {msg: 'User with same username already exist'}
      )
      return res.status(200).json(
        {msg: 'User does not exist'}
     );

}); 
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
  newUser
    .save()
    .then(user => {

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