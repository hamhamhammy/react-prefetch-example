import { combineReducers } from 'redux';

// Modules
import categories from './categories';
import device from './device';
import feed from './feed';
import user from './user';
import todos from './todos';

export default combineReducers({
  categories,
  device,
  feed,
  todos,
  user,
});
