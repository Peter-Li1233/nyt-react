const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/nytreact"
);

const articleSeed = [
  {
    title: "The Dead Zone",
    url: "https://www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "Lord of the Flies",
    url: "https://nodejs.org",
    date: new Date(Date.now())
  },
  {
    title: "The Catcher in the Rye",
    url: "https://www.cnn.com/",
    date: new Date(Date.now())
  },
  {
    title: "The Punch Escrow",
    author: "https://reactjs.org/",
    date: new Date(Date.now())
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    url: "https://www.javascript.com/",
    date: new Date(Date.now())
  } 
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });