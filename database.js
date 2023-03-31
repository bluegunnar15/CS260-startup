const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('dumbquestions').collection('questions');
const userCollection = client.db('dumbquestions').collection('users');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function getPopularQuestions() {
  const query = {};
  const options = {
    sort: { score: -1 },
    //limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

function postQuestion(question) {
  scoreCollection.insertOne(question);
}

async function addAgree(theQuestion) {
  const query = { question: theQuestion };
  const cursor = scoreCollection.findOne(query);
  const question = await cursor;

  const updatedQuestion = await scoreCollection.updateOne(
    { question: theQuestion },
    { $inc: { "numUpVotes": 1 } }
  );

  return updatedQuestion;
}

async function addDisagree(theQuestion) {
  const query = { question: theQuestion };
  const cursor = scoreCollection.findOne(query);
  const question = await cursor;

  const updatedQuestion = await scoreCollection.updateOne(
    { question: theQuestion },
    { $inc: { "numDownVotes": 1 } }
  );

  return updatedQuestion;
}

async function addUnsure(theQuestion) {
  const query = { question: theQuestion };
  const cursor = scoreCollection.findOne(query);
  const question = await cursor;

  const updatedQuestion = await scoreCollection.updateOne(
    { question: theQuestion },
    { $inc: { "numUnsureVotes": 1 } }
  );

  return updatedQuestion;
}

async function getQuestion(theQuestion) {
  const query = { question: theQuestion };
  const cursor = scoreCollection.findOne(query);
  const question = await cursor;

  return question;
}

async function addComment(theQuestion) {
  const query = { question: theQuestion.question };
  const cursor = scoreCollection.findOne(query);
  const question = await cursor;

  // Create a new comment object with postingUser and comment properties
  const newComment = { postingUser: theQuestion.postingUser, comment: theQuestion.newComment };

  // Add the new comment object to the "comments" array
  const updatedQuestion = await scoreCollection.updateOne(
    { question: theQuestion.question },
    { $push: { comments: newComment } }
  );

  return updatedQuestion;
}




module.exports = { postQuestion, getPopularQuestions, addAgree, addDisagree, addUnsure, getQuestion, addComment, createUser, getUser, getUserByToken };
