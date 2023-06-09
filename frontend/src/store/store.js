import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import reportsReducer from './reports';
// import logger from 'redux-logger'
import sessionReducer from './session';
import formReducer from './formReducer';
import questionReducer from './questionReducer';
import submissionReducer from './submissionReducer';
import responseReducer from './responseReducer';
import contactReducer from './contactReducer';

// export function rootReduc

export const rootReducer = combineReducers({
    session: sessionReducer,
    forms: formReducer,
    questions: questionReducer,
    submissions: submissionReducer,
    responses: responseReducer,
    contacts: contactReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


export default function configureStore(preloadedState = {}) {
    return createStore(rootReducer, preloadedState, enhancer);
}