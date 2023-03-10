const { User, Thought } = require("../models");

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({
      _id: req.params.userId,
    })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((userData) => {
        !userData
          ? res.status(404).json({
              message:
                "No user with that ID. It would be-hoove you to check the ID again.",
            })
          : res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
      .then((userData) => {
        !userData
          ? res.status(404).json({
              message:
                "No such user exists here. Maybe try Catskills Sanctuary.",
            })
          : res.json(userData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const userData = User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!userData) {
        return res.status(404).json({
          message: "No such user exists. It is possible they were adopted.",
        });
      }

      await Thought.deleteMany({
        _id: {
          $in: userData.thoughts,
        },
      });

      res.json({ message: `User(${req.params.userId}) deleted` });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $addToSet: {
          friends: req.params.friendId,
        },
      },
      {
        new: true,
      }
    )
      .then((userData) => {
        !userData
          ? res.status(404).json({
              message:
                "No user with this id. Can I interest you in sponsoring a duck?",
            })
          : res.json(userData);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  },
  // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $pull: {
          friends: req.params.friendId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user with this id. Have you checked out our merch store?",
            })
          : res.json(userData)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
