import {all} from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([helloSaga()])
}

export function* helloSaga() {
    console.log('hello saga');
}
