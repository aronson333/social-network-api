const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { createUsers, createRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // drop existing thoughts
  await Thought.deleteMany({});

  // drop existing users
  await User.deleteMany({});

  console.log("Dropped existing collections");

  const users = createUsers(10);

  // add users to the collection and await the results
  const newUsers = await User.insertMany(users);

  // add thoughts to the collection and await the results
  const thoughts = createRandomThoughts(10, newUsers);

  const newThoughts = await Thought.insertMany(thoughts);

  for (let thought of newThoughts) {
    await User.findOneAndUpdate(
      {
        username: thought.username,
      },
      {
        $push: {
          thoughts: thought._id,
        },
      },
      {
        new: true,
      }
    );
  }

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
