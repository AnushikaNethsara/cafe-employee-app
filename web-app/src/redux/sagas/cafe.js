import { getCafesAPI, getCafeByIdAPI, createCafeAPI, updateCafeAPI, deleteCafeByIdAPI, getCafesByLocationAPI, getEmployeeByCafeAPI } from '../../apis/index'
import { getCafesSlice, addCafeSlice, editCafeSlice, deleteCafeSlice, getCafesByLocationSlice, getEmployeesByCafeSlice } from '../slice/cafe'
import { CREATE_CAFE, DELETE_CAFE_BY_ID, GET_CAFE_BY_ID, GET_CAFES, UPDATE_CAFE_BY_ID, GET_CAFE_BY_LOCATION, GET_EMPLOYEES_BY_CAFE } from '../types'
import { put, takeEvery } from 'redux-saga/effects'


export function* getCafesSaga() {
    const cafes = yield getCafesAPI()
    yield put(getCafesSlice(cafes.data))
}

export function* getCafeByIdSaga(action) {
    yield getCafeByIdAPI(action.id)
    //yield put(setUserSlice(action.id))
}
export function* creatCafeSaga(action) {
    yield createCafeAPI(action.cafe)
    yield put(addCafeSlice(action.cafe))
}

export function* updateCafeSaga(action) {
    yield updateCafeAPI(action.cafe)
    yield put(editCafeSlice(action.cafe))
}

export function* deleteCafeByIdSaga(action) {
    yield deleteCafeByIdAPI(action.id)
    yield put(deleteCafeSlice(action.id))
}

export function* getCafesByLocationSaga(action) {
    const cafes = yield getCafesByLocationAPI(action.location)
    yield put(getCafesByLocationSlice(cafes.data))
}

export function* getEmployeesByCafeSaga(action) {
    const employees = yield getEmployeeByCafeAPI(action.id)
    yield put(getEmployeesByCafeSlice(employees.data))
}


export function* watchetCafeAsync() {
    yield takeEvery(GET_CAFES, getCafesSaga)
    yield takeEvery(GET_CAFE_BY_ID, getCafeByIdSaga)
    yield takeEvery(CREATE_CAFE, creatCafeSaga)
    yield takeEvery(UPDATE_CAFE_BY_ID, updateCafeSaga)
    yield takeEvery(DELETE_CAFE_BY_ID, deleteCafeByIdSaga)
    yield takeEvery(GET_CAFE_BY_LOCATION, getCafesByLocationSaga)
    yield takeEvery(GET_EMPLOYEES_BY_CAFE, getEmployeesByCafeSaga)
}