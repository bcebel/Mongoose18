const { Thought, User } = require("../models");
const { add } = require("../models/Reaction");

module.exports = thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).select(
        "-__v"
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async addReaction(req, res) {
    try {
      const reaction = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with this id!" });
      }
      res.json(reaction);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with this id!" });
      }
      res.json(reaction);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
