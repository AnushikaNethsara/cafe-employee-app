import { all } from "redux-saga/effects";
import { watchetEmployeeAsync } from "./employee";
import { watchetCafeAsync } from "./cafe";

export function* rootSaga() {
    yield all([
        watchetEmployeeAsync(),
        watchetCafeAsync()
    ])
}