import { all } from "redux-saga/effects";
import { watchetEmployeeAsync } from "./employee";

export function* rootSaga() {
    yield all([
        watchetEmployeeAsync()
    ])
}