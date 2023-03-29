const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('dumbquestions').collection('questions');

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




module.exports = { postQuestion, getPopularQuestions, addAgree };
