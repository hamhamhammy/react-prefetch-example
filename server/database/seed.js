const { BumperDatabaseManager } = require('./manager');

const manager = new BumperDatabaseManager();

const BASE_POST_FIRST = {
  username: 'User7',
  license: '7777777',
  state: 'Alabama',
  message: 'Hey this is user7',
  created_date: (new Date()).toISOString(),
  emoji: '',
};

const BASE_POST_SECOND = {
  username: 'Anonymous',
  license: '1234567',
  state: 'California',
  message: 'Foobar message index',
  created_date: (new Date()).toISOString(),
  emoji: '',
};

let posts = new Array(30).fill(BASE_POST_SECOND);

posts = [BASE_POST_FIRST, BASE_POST_FIRST, ...posts];

async function insertPosts (postsArray) {
  for (const [index, post] of postsArray.entries()) {
    await manager.createPost({
      ...post,
      message: `${post.message} ${index + 1}`,
    });
  }
}

async function trigger () {
  await insertPosts(posts);
  manager.close();
}

trigger();
