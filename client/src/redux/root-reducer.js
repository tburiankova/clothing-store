import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// persist config
const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems'],
};
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart'],
// };

const rootReducer = combineReducers({
  user: userReducer,
  cart: persistReducer(persistConfig, cartReducer),
  directory: directoryReducer,
  shop: shopReducer,
});
// const rootReducer = combineReducers({
//   user: userReducer,
//   cart: cartReducer,
// });

export default rootReducer;
// export default persistReducer(persistConfig, rootReducer);
