import axios from "axios";
import { put, takeLatest, all } from 'redux-saga/effects'
import { ACTIONS, addresses, emails, names, positions, surnames } from "../constants";
import uuid from 'uuid';

function* fetchEmployees() {
  const employees = yield axios.get('http://3zo61.mocklab.io/fullinfo')
    .then(res => res.data.users);

  yield put({ type: ACTIONS.EMPLOYEES_RECEIVED, payload: employees })
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
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