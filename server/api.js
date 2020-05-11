const express = require('express');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

const { hashPassword, checkPassword } = require('./database/utils');

const { BumperDatabaseManager } = require('./database/manager');

const JWT_SECRET = 'fluffycat'; // TODO - Move to constants file

const router = express.Router();

// TODO - duplicated, move to new file utils.js
const { log } = console;

const successLog = (message) => {
  log(chalk.green(message));
};

const errorLog = (message) => {
  log(chalk.bgRed(message));
};

router.post('/user/register', async (req, res) => {
  const { password } = req.body;
  log('register req.body = ', req.body); // TODO - do not log the real password

  const hashedPassword = hashPassword(password);
  log('hashedPassword = ', hashedPassword);

  try {
    const manager = new BumperDatabaseManager();
    await manager.registerUser({ ...req.body, password: hashedPassword });
    manager.close();
    res.sendStatus(200);
  } catch (err) {
    errorLog(err);
    res.status(409).json({ error: 'User already exists' });
  }
});

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  log('login req.body = ', req.body);

  const hashedPassword = hashPassword(password);
  log('hashedPassword = ', hashedPassword);

  try {
    const manager = new BumperDatabaseManager();
    const result = await manager.fetchBasicUserInfo(email);
    manager.close();
    log('result = ', result);

    if (Boolean(result) && checkPassword(password, result.password)) {
      const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1y' });
      log('jwt accessToken = ', accessToken);

      delete result.password;

      const expires = new Date(Date.now() + 31556952000); // cookies will be removed after 1 year

      // https://expressjs.com/en/4x/api.html#res.cookie
      res.cookie('accessToken', accessToken, {
        expires,
        encode: String,
      }).cookie('basicUserInfo', JSON.stringify(result), {
        expires,
        encode: String,
      }).json({
        result: {
          ...result,
          accessToken,
        },
      });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    errorLog(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/user/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('basicUserInfo');
  res.sendStatus(200);
});

const ensureLoggedIn = function ensure (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
  }

  try {
    // const { authorization = '' } = req.headers;
    const accessToken = authorization.replace(/^Bearer\s+/, '');
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    res.locals.email = decoded.email; // eslint-disable-line no-param-reassign
    successLog('ensureLoggedIn success');
    next();
  } catch (err) {
    errorLog('ensureLoggedIn fail');
    res.sendStatus(401);
  }
};

router.get('/user/info', ensureLoggedIn, async (req, res) => {
  const { email } = res.locals;

  const manager = new BumperDatabaseManager();
  const result = await manager.fetchBasicUserInfo(email);
  manager.close();

  if (result) {
    delete result.password;
    res.json({ result });
  } else {
    res.sendStatus(404);
  }
});

router.post('/post/create', async (req, res) => {
  log('post create');
  const {
    username,
    license,
    state,
    message,
    created_date,
    emoji = '',
  } = req.body;

  const manager = new BumperDatabaseManager();
  const result = await manager.createPost({
    username,
    license,
    state,
    message,
    created_date,
    emoji,
  });
  manager.close();

  // TODO - add validation of things coming into this api

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(400);
  }
});

router.get('/post/fetch', async (req, res) => {
  log('post get');
  const { offset } = req.query;
  console.log('offset = ', offset);

  const manager = new BumperDatabaseManager();
  const results = await manager.fetchPosts(req.query);
  manager.close();

  // TODO - add validation of things coming into this api

  if (results) {
    res.json({ results });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
