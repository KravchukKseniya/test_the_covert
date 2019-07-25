import { ACTIONS } from "../constants";

const initialState = {
  users: []
};

const reducer = (state = initialState, action) => {
  const stateCopy = {...state};
  switch (action.type) {
    case ACTIONS.EMPLOYEES_RECEIVED:
      return {
        ...state,
        users: action.payload
      };
    case ACTIONS.ON_SUBMIT_NEW_COMMENT:
      const newComments = stateCopy.users.find(user => user.id === action.id).comments;
      newComments.push(action.payload);
      return {
          ...state,
        users: stateCopy.users
      };
    case ACTIONS.PUT_NEW_EMPLOYEE:
      const usersCopy = [...state.users];
      usersCopy.push(action.payload);
      stateCopy.users = usersCopy;
      return stateCopy;
    default:
      return state;
  }
};

export default reducer