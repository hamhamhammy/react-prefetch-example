// These are similar to vuex getters

export const getTodosState = store => store.todos;

// Get allIds from store
export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : [];

// Get todo item by id
export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id));

