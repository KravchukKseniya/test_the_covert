import { ACTIONS } from "../constants";

const initialState = {
  users: []
};

const reducer = (state = initialState, action) => {
  const stateCopy = {...state};
  const usersCopy = [...state.users];
  switch (action.type) {
    case ACTIONS.EMPLOYEES_RECEIVED:
      return {
        ...state,
        users: action.payload
      };
    case ACTIONS.ON_SUBMIT_NEW_COMMENT:
      usersCopy.find(user => user.id === action.payload.id).comments.push(action.payload.comment);
      stateCopy.users = usersCopy;
      return stateCopy;
    case ACTIONS.PUT_NEW_EMPLOYEE:
      usersCopy.push(action.payload);
      stateCopy.users = usersCopy;
      return stateCopy;
    default:
      return state;
  }
};

export default reducer