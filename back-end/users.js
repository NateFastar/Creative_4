const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const userSchema = new mongoose.Schema({
  avatar: {
	  type: String,
	  default: "@images/profile-placeholder.jpg"
  },
  firstName: String,
  lastName: String,
  description: String,
  email: String,
  password: String,
  accepted: [String],
  role: {
    type: String,
    default: "Collaborator"
  }
});

userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // generate a hash. argon2 does the salting and hashing for us
    const hash = await argon2.hash(this.password);
    // override the plaintext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function(password) {
  try {
    // note that we supply the hash stored in the database (first argument) and
    // the plaintext password. argon2 will do the hashing and salting and
    // comparison for us.
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model('User', userSchema);

/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // if everything succeeds, move to the next middleware
  next();
};

// create a new user
router.post('/', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // passsword, otherwise return an error. A 400 error means the request was
  // malformed.
  if (!req.body.email || !req.body.password)
    return res.status(400).send({
      message: "email and password are required"
    });

  try {

    //  Check to see if username already exists and if not send a 403 error. A 403
    // error means permission denied.
    const existingUser = await User.findOne({
      email: req.body.email
    });
    if (existingUser)
      return res.status(403).send({
        message: "username already exists"
      });

    // create a new user and save it to the database
    const user = new User({
      avatar: req.body.avatar,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
	  role: req.body.role
    });
    await user.save();
    // set user session info
    req.session.userID = user._id;
    // send back a 200 OK response, along with the user that was created
    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// login a user
router.post('/login', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // password, otherwise return an error.
  if (!req.body.email || !req.body.password)
    return res.status(400).send({
      message: "email and password are required"
    });

  try {
    //  lookup user record
    const user = await User.findOne({
      email: req.body.email
    });
    // Return an error if user does not exist.
    if (!user)
      return res.status(403).send({
        message: "email or password is wrong"
      });

    // Return the SAME error if the password is wrong. This ensure we don't
    // leak any information about which users exist.
    if (!await user.comparePassword(req.body.password))
      return res.status(403).send({
        message: "email or password is wrong"
      });

    // set user session info
    req.session.userID = user._id;
    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get logged in user
router.get('/', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//get list of all users
router.get('/users', async (req, res) => {
  try {
    let users = await User.find();
    return res.send({
      users: users
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// logout
router.delete("/", validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/add", validUser, async(req, res) => {
	try{
		user = await User.findOne({
			_id: req.user._id
		})
		user.accepted.add(req.body.projectID);
		await user.save();
		return res.send({
			user: user
		})
	} catch(error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

module.exports = {
  routes: router,
  model: User,
  valid: validUser
};