import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
};

// state = current/prev state
// if state is ever undefined - fallback of INITIAL_STATE
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
