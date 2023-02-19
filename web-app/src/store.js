import { configureStore } from "@reduxjs/toolkit";
import employee from "./redux/slice/employee";
import cafe from "./redux/slice/cafe";
import createSagaMiddleware from "@redux-saga/core";
import {rootSaga} from './redux/sagas'
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        employee,
        cafe
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)

export default store