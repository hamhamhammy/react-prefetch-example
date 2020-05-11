// https://www.sqlitetutorial.net/sqlite-nodejs/connect/
// https://github.com/mapbox/node-sqlite3/wiki/API

const sqlite3 = require('sqlite3').verbose();
const chalk = require('chalk');

const { log } = console;

const successLog = (message) => {
  log(chalk.green(message));
};

const errorLog = (message) => {
  log(chalk.bgRed(message));
};

try {
  // Create or connect to database if it does not exist
  const db = new sqlite3.Database('./server/database/bumper.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => { // eslint-disable-line no-bitwise
    if (err) {
      throw (err.message);
    }
    successLog('Connect to the bumper database');
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      email TEXT NOT NULL PRIMARY KEY UNIQUE,
      password TEXT NOT NULL,
      username TEXT NOT NULL,
      license TEXT NOT NULL UNIQUE,
      state TEXT NOT NULL
    )`, (err) => {
      if (err) {
        throw (err.message);
      }
      successLog('Create the users table');
    },
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
      username TEXT,
      license TEXT NOT NULL,
      state TEXT NOT NULL,
      message TEXT NOT NULL,
      created_date TEXT NOT NULL,
      emoji TEXT
    )`, (err) => {
      if (err) {
        throw (err.message);
      }
      successLog('Create the posts table');
    },
  );

  // Close database connection
  db.close((err) => {
    if (err) {
      throw (err.message);
    }
    successLog('Close the database connection');
  });
} catch (err) {
  errorLog(`Error: ${err}`);
}
