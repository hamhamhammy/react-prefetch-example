const { BumperDatabaseManager } = require('./manager');

const manager = new BumperDatabaseManager();

async function trigger () {
  await manager.run('DELETE FROM users;');
  await manager.run('DELETE FROM posts;');
  manager.close();
}

trigger();
