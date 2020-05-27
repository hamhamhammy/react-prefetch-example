import { call, put, takeLatest } from 'redux-saga/effects'; // takeEvery, takeLatest
import { FETCH_CATEGORIES_SUCCESS } from '@/store/actions/actionTypes';
import fetchCategories from '@/mock/api/fetchCategories';

// worker Saga: will be fired on GET_CATEGORIES actions
function* getCategories(action) { // action.payload.categoryId
  const {
    resolve = () => {},
    reject = () => {},
  } = action;

   try {
      const { data: { categories } } = yield call(fetchCategories);
      yield put({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: {
          serviceCategories: categories,
        },
      });

      resolve(categories);

      return categories;
   } catch (e) {
      console.log('getCategories fail', e);
      reject(e);
   }
}

export function* sagaCategories () {
  console.log('sagaCategories called');
  yield takeLatest('CATEGORIES_FETCH_REQUESTED', getCategories);
}
