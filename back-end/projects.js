const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Projects
//

const User = users.model;
const validUser = users.valid;

// This is the schema for a ticket
const projectSchema = new mongoose.Schema({
  title: String,
  problem: String,
  reward: String,
  created: {
    type: Date,
    default: Date.now
  },
  type: String
});

const Project = mongoose.model('Project', projectSchema);

// get tickets -- will list tickets that a user has submitted
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find({
      //user: req.user
    }).sort({
      created: -1
    });
    return res.send({
      projects: projects
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// create a ticket
router.post('/', validUser, async (req, res) => {
  const project = new Project({
    title: req.body.title,
    problem: req.body.problem,
	reward: req.body.reward,
	type: req.user.role
  });
  try {
    await project.save();
    return res.send({
      project: project
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router
}