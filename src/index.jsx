import React                                                    from 'react'
import ReactDOM                                                 from 'react-dom'
// import { browserHistory }                                       from 'react-router'
import createBrowserHistory                                     from 'history/createBrowserHistory'
import { Provider }                                             from 'react-redux'
import { combineReducers }                                      from 'redux'
import configureStore                                           from './store/configureStore'
import createRouter                                             from './routes'

let store = configureStore(window.__initState__)

const me = store.getState().me

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default
        store.replaceReducer(nextRootReducer)
    })
}

ReactDOM.render(
    <Provider store={store}>
        {createRouter(createBrowserHistory(), (me && me._id) ? me : null)}
    </Provider>,
    document.getElementById('app')
)
