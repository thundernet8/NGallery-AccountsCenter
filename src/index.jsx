import React                                                    from 'react'
import ReactDOM                                                 from 'react-dom'
import createBrowserHistory                                     from 'history/lib/createBrowserHistory'
import { Provider }                                             from 'react-redux'
import { combineReducers }                                      from 'redux'
import configureStore                                           from './store/configureStore'
import createRouter                                             from './routes'
import './styles/global/global.scss'
import 'grommet/grommet.min.css'

let store = configureStore(window.__initState__)

const me = store.getState().user

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default
        store.replaceReducer(nextRootReducer)
    })
}

ReactDOM.render(
    <Provider store={store}>
        {createRouter(createBrowserHistory(), (me.profile && me.profile._id) ? me : null)}
    </Provider>,
    document.getElementById('app')
)
