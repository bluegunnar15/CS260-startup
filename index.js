const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { PeerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.text());
app.use(express.json());

app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");
  res.sendFile('index.html', { root: 'public' });
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

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Invalid' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

new PeerProxy(httpService);


apiRouter.get('/joke', (req, res) => {
  request('https://icanhazdadjoke.com/', { headers: { 'Accept': 'text/plain' } }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.status(500).send('Error getting joke');
    }
  });
});