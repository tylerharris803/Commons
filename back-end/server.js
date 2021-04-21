const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/SocialMedia', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


const users = require("./users.js");
app.use("/api/users", users.routes);
const User = users.model;
const validUser = users.valid;

// a scheme for all profiles
const profileSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  city: String,
});

// a model for all profiles
const Profile = mongoose.model('Profile', profileSchema);

// const followSchema = new mongoose.Schema({
//   follower: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Friend'
//     },
//   followee: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Friend'
//   },
// });

//profiles youre following (friends)
const friendSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  username: String,
  name: String,
  email: String,
  city: String,
});

const Friend = mongoose.model('Friend', friendSchema);

// const postSchema = new mongoose.Schema({
//   content: String,
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Friend'
//   }
// })
//
// const Post = mongoose.model('Post', postSchema);

// const newCommentSchema = new mongoose.Schema({
//   name: String,
//   comment: String,
// })
//
// const NewComment = mongoose.model('NewComment', newCommentSchema);

// Create a new profile: takes username, name, email, and city.
app.post('/api/profiles', validUser, async (req, res) => {
  const profile = new Profile({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
  });
  try {
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Add friends.
app.post('/api/profiles/friends', validUser, async (req, res) => {
  const friend = new Friend({
    user: req.user,
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
  });
  try {
    await friend.save();
    res.send(friend);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all profiles.
app.get('/api/profiles', async (req, res) => {
  try {
    let profiles = await Profile.find({});
    res.send(profiles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Get list of profiles youre following (friends)
app.get('/api/profiles/friends', validUser, async (req, res) => {
  // try{
  //   let friends = await Friend.find();
  //   res.send(friends);
  // }
  try {
    let friends = await Friend.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(friends);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get an individual profile.
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let profile = await Profile.findOne({_id:id});
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Delete one profile
app.delete('/api/profiles/:id', validUser, async (req, res) => {
  console.log("Delete ", req.params.id);
  try {
    await Profile.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// (Unfollow) Delete a friend
app.delete('/api/profiles/friends/:id', validUser, async (req, res) => {
  console.log("Delete ", req.params.id);
  try {
    await Friend.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
