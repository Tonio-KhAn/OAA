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

router.route("/userposts/:id").get(auth, (req, res) => {
  var userposts = []
  Post.find()
    .then(posts => {
      posts.forEach(post => {
        if(post.userId == req.params.id) {
          var temp = {
            _id: post._id,
            title: post.title,
            body: post.body,
            createdAt: post.createdAt,
            userId: post.userId
          }
          userposts.push(temp)
        }
      })
      userposts.sort((a, b) => b.createdAt - a.createdAt)
      res.json(userposts);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/allposts").get(auth, (req, res) => {
  var allposts = []

  User.find()
    .then(users => {
      Post.find()
        .then(posts => {
          users.forEach(user => {
            posts.forEach(post => {
              if(post.userId == user._id) {
                var temp = {
                  _id: post._id,
                  title: post.title,
                  body: post.body,
                  createdAt: post.createdAt,
                  userId: post.userId,
                  first_name: user.first_name,
                  owner: 0
                }
                allposts.push(temp)
              }
            })
          })
          allposts.forEach(individualpost => {
            if(individualpost.userId == req.user.id) {
              individualpost.owner = 1
            }
          })
          allposts.sort((a, b) => b.createdAt - a.createdAt)
          res.json(allposts);
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
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
                var temp = {
                  _id: post._id,
                  title: post.title,
                  body: post.body,
                  createdAt: post.createdAt,
                  userId: post.userId,
                  first_name: '',
                  owner: 0
                }
                communityposts.push(temp)
              }
            })
          })
          posts.forEach(post => {
            if(post.userId == user._id) {
              var temp = {
                _id: post._id,
                title: post.title,
                body: post.body,
                createdAt: post.createdAt,
                userId: post.userId,
                first_name: '',
                owner: 1
              }
              communityposts.push(temp)
            }
          })
          communityposts.sort((a, b) => b.createdAt - a.createdAt)

          User.find()
            .then(users => {
              users.forEach(person => {
                communityposts.forEach(communitypost => {
                  if(person._id == communitypost.userId) communitypost.first_name = person.first_name;
                })
              })
              res.json(communityposts)
            })
            .catch(err => res.status(400).json("Error: " + err));  
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/myposts").get(auth, (req, res) => {
  var myposts = []

  User.findById(req.user.id)
    .then(user => {
      Post.find()
        .then(posts => {
          posts.forEach(post => {
            if(post.userId == user._id) {
              var temp = {
                _id: post._id,
                title: post.title,
                body: post.body,
                createdAt: post.createdAt,
                userId: post.userId,
              }
              myposts.push(temp)
            }
          })
          myposts.sort((a, b) => b.createdAt - a.createdAt)
          
          res.json(myposts)
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/deletepost/:id").delete(auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post.userId == req.user.id) {
        Post.findByIdAndDelete(req.params.id)
          .then(res.json('Post deleted.'))
          .catch(err => res.status(400).json("Error: " + err));
      }
      else {
        res.json('Post delete attempt failed. Invalid user.')
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get(auth, (req, res) => {
  Post.find({userId: req.params.id})
    .then(myPosts => res.json(myPosts))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router; 