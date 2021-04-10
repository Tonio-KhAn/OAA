const router = require('express').Router();
let User = require('../models/user.model');
let Post = require('../models/post.model');
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
    postMedia.find({postID: req.params.id})
      .then(postMedia => res.json(postMedia))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const userId = req.user.id;
    const title = req.body.title;
    const body = req.body.body;
    const newPost = new Post({
        userId,
        title,
        body,
    });
    newPost
    .save()
    .then(() => res.json(newPost))
    .catch(err => res.status(400).json("Error: " + err));
});
  
router.route("/").get(auth, (req, res) => {
  Post.find((error, data) => {
    if (error) {
      console.log(error);
    } else {
      data.reverse();
      res.json(data);
    }
  })
});

router.route("/communityposts").get(auth, (req, res) => {
  var communityposts = []
  User.findById(req.user.id)
    .then(user => {
      Post.find()
        .then(posts => {
          user.friends.forEach(friend => {
            posts.forEach(post => {
              if(post.userId == friend) {
                communityposts.push(post)
              }
            })
          })
          posts.forEach(post => {
            if(post.userId == user._id) communityposts.push(post)
          })
          communityposts.sort((a, b) => b.createdAt - a.createdAt)
          
          res.json(communityposts)
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get(auth, (req, res) => {
  Post.find({userId: req.params.id})
    .then(myPosts => res.json(myPosts))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router; 