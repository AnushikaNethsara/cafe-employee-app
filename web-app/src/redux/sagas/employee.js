import { getEmployeesAPI, getEmployeeByIdAPI, createEmployeeAPI, updateEmployeeAPI, deleteEmployeeByIdAPI } from '../../apis/index'
import { setUserSlice } from '../slice/user'
import { getEmployeesSlice, addEmployeeSlice, editEmployeeSlice, deleteEmployeeSlice } from '../slice/employee'
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE_BY_ID, GET_EMPLOYEES, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE_BY_ID } from '../types'
import { put, takeEvery } from 'redux-saga/effects'

export function* getEmployeesSaga() {
    const employees = yield getEmployeesAPI()
    yield put(getEmployeesSlice(employees.data))
}

export function* getetEmployeeByIdSaga(action) {
    yield getEmployeeByIdAPI(action.id)
    yield put(setUserSlice(action.id))
}
export function* creatEmployeeSaga(action) {
    yield createEmployeeAPI(action.employee)
    yield put(addEmployeeSlice(action.employee))
}

export function* updateEmployeeSaga(action) {
    yield updateEmployeeAPI(action.employee)
    yield put(editEmployeeSlice(action.employee))
}

export function* deleteetEmployeeByIdSaga(action) {
    yield deleteEmployeeByIdAPI(action.id)
    yield put(deleteEmployeeSlice(action.id))
}

export function* watchetEmployeeAsync() {
    yield takeEvery(GET_EMPLOYEES, getEmployeesSaga)
    yield takeEvery(GET_EMPLOYEE_BY_ID, getEmployeeByIdAPI)
    yield takeEvery(CREATE_EMPLOYEE, creatEmployeeSaga)
    yield takeEvery(UPDATE_EMPLOYEE_BY_ID, updateEmployeeSaga)
    yield takeEvery(DELETE_EMPLOYEE_BY_ID, deleteetEmployeeByIdSaga)
}