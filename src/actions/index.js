import {ACTIONS} from "../constants";

export const getEmployees = () => ({
  type: ACTIONS.GET_EMPLOYEES
});

export const onSubmitNewComment = (id, comment) => ({
  type: ACTIONS.ON_SUBMIT_NEW_COMMENT,
  payload: comment,
  id: id
});

export const addNewEmployeeToState = () => ({
  type: ACTIONS.ADD_NEW_EMPLOYEE
});
