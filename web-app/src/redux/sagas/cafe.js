import { getCafesAPI, getCafeByIdAPI, createCafeAPI, updateCafeAPI, deleteCafeByIdAPI } from '../../apis/index'
import { getCafesSlice, addCafeSlice, editCafeSlice, deleteCafeSlice } from '../slice/cafe'
import { CREATE_CAFE, DELETE_CAFE_BY_ID, GET_CAFE_BY_ID, GET_CAFES, UPDATE_CAFE_BY_ID } from '../types'
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
    console.log(action);
    yield updateCafeAPI(action.cafe)
    yield put(editCafeSlice(action.cafe))
}

export function* deleteCafeByIdSaga(action) {
    yield deleteCafeByIdAPI(action.id)
    yield put(deleteCafeSlice(action.id))
}

export function* watchetCafeAsync() {
    yield takeEvery(GET_CAFES, getCafesSaga)
    yield takeEvery(GET_CAFE_BY_ID, getCafeByIdSaga)
    yield takeEvery(CREATE_CAFE, creatCafeSaga)
    yield takeEvery(UPDATE_CAFE_BY_ID, updateCafeSaga)
    yield takeEvery(DELETE_CAFE_BY_ID, deleteCafeByIdSaga)
}