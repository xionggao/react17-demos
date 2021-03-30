import {all} from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([])
}

export function* helloSaga() {
    console.log('hello saga');
}
