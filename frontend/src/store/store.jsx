import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import reportsReducer from './reports';
import logger from 'redux-logger'

// export function rootReduc

export const rootReducer = combineReducers({
    plug: () => ({})
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    // const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


export default function configureStore(preloadedState = {}) {
    return createStore(rootReducer, preloadedState, enhancer);
}