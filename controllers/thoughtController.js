const { Thought, User } = require("../models");

const thoughtController = {
  // Get all the thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({
        createdAt: -1,
      })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({
      _id: req.params.thoughtId,
    })
      .select("-__v")
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({
              message:
                "No thoughts here with that ID. Go-at Figure. Sorry, please don't leave! There are so many good animals puns!",
            })
          : res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        {
          _id: req.body.userId,
        },
        {
          $push: {
            thoughts: thoughtData._id,
          },
        },
        {
          new: true,
        }
      );

      if (!userData) {
        return res.status(404).json({
          message: "Thought created but there was not a user with that id",
        });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  // delete thought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughtData) {
        return res.status(404).json({
          message: "No thought with that ID here.",
        });
      }
      await User.findOneAndUpdate(
        {
          thoughts: req.params.thoughtId,
        },
        {
          $pull: {
            thoughts: req.params.thoughtId,
          },
        },
        {
          new: true,
        }
      );

      res.json(thoughtData);
    } catch (err) {
      console(err);
      res.status(500).json(err);
    }
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message: "No thought with that ID here! Too baaaaa-d!",
            })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // add reaction to a thought
  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $addToSet: {
            reactions: req.body,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!thoughtData) {
        return res.status(404).json({
          message:
            "Reaction created but found no thought with this id. A belly run would be very appreciated for the extra effort on my part.",
        });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // remove reaction to a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId,
          },
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message:
                "No reaction with this id. Have you checked the pasture?",
            })
          : res.json(thoughtData)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
