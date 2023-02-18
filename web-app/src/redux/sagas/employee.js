import { getEmployeesAPI, getEmployeeByIdAPI, createEmployeeAPI, updateEmployeeAPI, deleteEmployeeByIdAPI, getEmployeeByCafeAPI } from '../../apis/index'
import { setUserSlice } from '../slice/user'
import { getEmployeesSlice, addEmployeeSlice, editEmployeeSlice, deleteEmployeeSlice, getEmployeesByCafeSlice } from '../slice/employee'
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE_BY_ID, GET_EMPLOYEES, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE_BY_ID, GET_EMPLOYEES_BY_CAFE } from '../types'
import { put, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify';

export function* getEmployeesSaga() {
    const employees = yield getEmployeesAPI()
    yield put(getEmployeesSlice(employees.data))
}

export function* getetEmployeeByIdSaga(action) {
    yield getEmployeeByIdAPI(action.id)
    yield put(setUserSlice(action.id))
}
export function* creatEmployeeSaga(action) {
    try {
        yield createEmployeeAPI(action.employee)
        yield put(addEmployeeSlice(action.employee))
        toast.success("Successfully Added");
    } catch (error) {
        toast.error(error.message);
    }
}

export function* updateEmployeeSaga(action) {
    try {
        yield updateEmployeeAPI(action.employee)
        yield put(editEmployeeSlice(action.employee))
        toast.success("Successfully Updated");
    } catch (error) {
        toast.error(error.message);
    }
}

export function* deleteetEmployeeByIdSaga(action) {
    yield deleteEmployeeByIdAPI(action.id)
    yield put(deleteEmployeeSlice(action.id))
}

export function* getEmployeesByCafeSaga(action) {
    const employees = yield getEmployeeByCafeAPI(action.id)
    yield put(getEmployeesByCafeSlice(employees.data))
}

export function* watchetEmployeeAsync() {
    yield takeEvery(GET_EMPLOYEES, getEmployeesSaga)
    yield takeEvery(GET_EMPLOYEE_BY_ID, getEmployeeByIdAPI)
    yield takeEvery(CREATE_EMPLOYEE, creatEmployeeSaga)
    yield takeEvery(UPDATE_EMPLOYEE_BY_ID, updateEmployeeSaga)
    yield takeEvery(DELETE_EMPLOYEE_BY_ID, deleteetEmployeeByIdSaga)
    yield takeEvery(GET_EMPLOYEES_BY_CAFE, getEmployeesByCafeSaga)
}