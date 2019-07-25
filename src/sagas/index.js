import axios from "axios";
import { put, takeLatest, all } from 'redux-saga/effects'
import uuid from 'uuid';
import { ACTIONS, addresses, emails, names, positions, surnames } from "../constants";
import { getRandomElement } from "../utils";
import { serverAddress } from "../constants";


function* fetchEmployees() {
  const employees = yield axios.get(serverAddress)
    .then(res => res.data.users);

  yield put({ type: ACTIONS.EMPLOYEES_RECEIVED, payload: employees })
}

function generateUser() {
  return {
    id:  uuid(),
    name: getRandomElement(names),
    surname: getRandomElement(surnames),
    position: getRandomElement(positions),
    email: getRandomElement(emails),
    address: getRandomElement(addresses),
    comments: []
  };
}

function* putNewUser() {
  const newUser = generateUser();

  yield put({ type: ACTIONS.PUT_NEW_EMPLOYEE, payload: newUser})
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(ACTIONS.GET_EMPLOYEES, fetchEmployees),
    yield takeLatest(ACTIONS.ADD_NEW_EMPLOYEE, putNewUser)
  ])
}