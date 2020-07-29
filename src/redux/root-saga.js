import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';

// all allows us to run code altogether side by side at once (not wait until one finished after another)
export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}
