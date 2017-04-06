import React                                                                from 'react'
import { Route, Router, Redirect, IndexRoute, applyRouterMiddleware }       from 'react-router'
// import { useScroll }                                                        from 'react-router-scroll'
import { getUrlQuery, addUrlQuery }                                         from './utils/url'
import appConfig                                                            from '../config'
import { Base64 }                                                           from 'js-base64'

// Containers
import App from './containers/app'
import Home from './containers/home'
import Login from './containers/login'
import Register from './containers/register'

export default (history, user) => {
    const triggerEnter = (nextState, replaceState) => {

    }

    const triggerLeave = (nextState, replaceState) => {

    }

    const requireAuth = (nextState, replaceState) => {
        if (!user) {
            replaceState({
                pathname: '/signin',
                query: {},
                state: {nextPathname: nextState.location.pathname}
            })
            return
        }
        triggerEnter(nextState, replaceState)
    }

    const authRedirect = (nextState, replaceState) => {
        if (user) {
            const redirect = getUrlQuery(appConfig.authRedirectKey)
            if (redirect) {
                let info = Base64.encode(JSON.stringify({token: user.accessToken, expires: user.expires}))
                location.href = addUrlQuery(decodeURIComponent(redirect), {[appConfig.authInfoKey]: info})
            } else {
                replaceState({
                    pathname: '/',
                    query: {},
                    state: {nextPathname: nextState.location.pathname}
                })
            }

            return
        }
        triggerEnter(nextState, replaceState)
    }

    return (
        <Router history={history} /* render={applyRouterMiddleware(useScroll())} */>
            <Route path="/" component={App}>
                <IndexRoute component={Home} onEnter={requireAuth} onLeave={triggerLeave}/>
            </Route>
            <Route path="/signin" component={Login} onEnter={authRedirect} onLeave={triggerLeave}/>
            <Route path="/signup" component={Register} onEnter={authRedirect} onLeave={triggerLeave}/>
        </Router>
    )
}
