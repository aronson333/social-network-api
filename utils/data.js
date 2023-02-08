const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughts = [
  "I'm so happy!",
  "I'm so sad!",
  "I'm so hungry!",
  "I'm so sleepy!",
  "I'm so angry!",
  "I'm so excited!",
  "I'm so bored!",
  "I'm so tired!",
  "I'm so confused!",
  "I'm so scared!",
  "I'm so lonely!",
];

// get a random element given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

// Get a random User name
const getUserName = () => {
  const username = getRandomArrItem(names);
  const num = getRandomNum(1, 1000);
  return `${username}${num}`;
};

// Get email
const getEmail = () => {
  const name = getRandomArrItem(names);
  const num = getRandomNum(1, 1000);
  return `${name}${num}@fakegmail.com`;
};

// Get thoughts
const createRandomThoughts = (int, users) => {
  const randomThoughts = [];
  for (let i = 0; i < int; i++) {
    const user = getRandomArrItem(users);
    randomThoughts.push({
      thoughtText: getRandomArrItem(thoughts),
      username: user.username,
    });
  }
  return randomThoughts;
};

const createUsers = (numOfUsers = 5) => {
  let users = [];
  for (let i = 0; i < numOfUsers; i++) {
    const username = getUserName();
    const email = getEmail();

    const user = {
      username,
      email,
    };

    users.push(user);
  }

  return users;
};

// export the function for use in seed.js
module.exports = {
  createUsers,
  createRandomThoughts,
};
