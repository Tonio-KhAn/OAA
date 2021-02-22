const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
//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
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User with that email does not exist!"})
            }
            user.resetToken = token
            user.resetTokenExpire = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-replay@dcitconnect.com",
                    subject:"Password Reset",
                    html:`
                    <p>You have requested to reset your password</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"Please check your email"})
            })
  
        })
    })
  })
  
  router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,resetTokenExpire:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again. Session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"Password updated successfully"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
  })
  
  
  module.exports = router;