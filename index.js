const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.text());
app.use(express.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Get Popular Page
apiRouter.get('/getPopular', async (_req, res) => {
  const scores = await DB.getPopularQuestions();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/postQuestion', async (req, res) => {
  await DB.postQuestion(req.body);
  const scores = await DB.getPopularQuestions();
  res.send(scores);
});


apiRouter.post('/addAgree', async (req, res) => {
  const question = await DB.addAgree(req.body);
  res.send(question);
});

apiRouter.post('/addDisagree', async (req, res) => {
  const question = await DB.addDisagree(req.body);
  res.send(question);
});

apiRouter.post('/addUnsure', async (req, res) => {
  const question = await DB.addUnsure(req.body);
  res.send(question);
});

apiRouter.post('/getQuestion', async (req, res) => {
  const question = await DB.getQuestion(req.body);
  res.send(question);
});

apiRouter.post('/addComment', async (req, res) => {
  const question = await DB.addComment(req.body);
  res.send(question);
});
