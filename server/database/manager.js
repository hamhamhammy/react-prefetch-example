
const sqlite3 = require('sqlite3').verbose(); // https://github.com/mapbox/node-sqlite3/wiki/API

class DatabaseManager {
  constructor (filepath, mode = sqlite3.OPEN_READWRITE) {
    this.db = new sqlite3.Database(filepath, mode);
  }

  // whereFilter: used to create database filter string and array of values
  // Array of key value pairs, key is database column name, value is database column value
  // Ex. [{ column: 'license', value: 777777 }, { column: 'state', value: 'California' }]
  static whereFilter (filters) {
    const filtersArray = filters.filter(filter => Boolean(filter.value));
    const query = filtersArray.reduce((acc, { column }, index) => {
      if (index === 0) {
        acc += ' WHERE'; // eslint-disable-line no-param-reassign
      }

      if (acc !== '' && index !== 0) {
        acc += ' AND'; // eslint-disable-line no-param-reassign
      }

      acc += ` ${column} = ?`; // eslint-disable-line no-param-reassign
      return acc;
    }, '').trim();

    const values = filtersArray.map(filter => filter.value);

    return {
      query,
      values,
    };
  }

  // run: used to create or alter tables and to insert or update table data
  run (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function run (err) {
        if (err) {
          console.log(`Error running sql (run) ${sql}`);
          console.log(err);
          reject(err);
        } else {
          console.log('DatabaseManager run success');
          resolve({
            id: this.lastID,
            changes: this.changes,
          });
        }
      });
    });
  }

  // get: used to select a single row of data from one or more tables
  get (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log(`Error running sql (get) ${sql}`);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // all: select multiple rows of data from one or more tables
  all (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, results) => {
        if (err) {
          console.log(`Error running sql (all) ${sql}`);
          console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  close () {
    console.log('close db');
    this.db.close();
  }
}

class BumperDatabaseManager extends DatabaseManager {
  constructor () {
    super('./server/database/bumper.db'); // call the super class constructor and pass in the name parameter
  }

  async registerUser ({ email, password, username, license, state = '' }) {
    const result = await this.run(
      'INSERT INTO users (email, password, username, license, state) VALUES(?,?,?,?,?)',
      [email, password, username, license, state],
    );
    return result;
  }

  async fetchBasicUserInfo (email) {
    const result = await this.get('SELECT * FROM users WHERE email = ?', [email]);
    console.log('fetchUser', result);
    return result;
  }

  async createPost ({ username = '', license, state, message, created_date, emoji = '' }) {
    const result = await this.run(
      'INSERT INTO posts (username, license, state, message, created_date, emoji) VALUES(?,?,?,?,?,?)',
      [username, license, state, message, created_date, emoji],
    );
    return result;
  }

  async fetchPosts ({ limit, offset, license = '', state = '', username = '' }) {
    const { query, values } = BumperDatabaseManager.whereFilter([
      { column: 'username', value: username },
      { column: 'license', value: license },
      { column: 'state', value: state },
    ]);
    console.log('whereFilter=', query, values);

    const results = await this.all(
      `SELECT rowid, * FROM posts ${query} ORDER BY rowid DESC LIMIT ? OFFSET ?`,
      [...values, limit, offset],
    );

    console.log('fetchPosts count = ', results.length);

    return results;
  }
}

module.exports = {
  BumperDatabaseManager,
};
