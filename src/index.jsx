import React                                                    from 'react'
import ReactDOM                                                 from 'react-dom'
import { browserHistory }                                       from 'react-router'
import { Provider }                                             from 'react-redux'
import { combineReducers }                                      from 'redux'
import { syncHistoryWithStore }                                 from 'react-router-redux'
import configureStore                                           from './store/configureStore'
import createRouter                                             from './routes'

let store = configureStore(window.__initState__)

const me = store.getState().me

const history = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default
        store.replaceReducer(nextRootReducer)
    })
}

ReactDOM.render(
    <Provider store={store}>
        {createRouter(history, (me && me._id) ? me : null)}
    </Provider>,
    document.getElementById('app')
)
