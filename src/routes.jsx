import React                                                                from 'react'
import { Route, Router, Redirect, IndexRoute, applyRouterMiddleware }       from 'react-router'
// import { useScroll }                                                        from 'react-router-scroll'
import { getUrlQuery, addUrlQuery }                                         from './utils/url'

// Containers
import Home from './containers/home'
import Login from './containers/login'

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
            const redirect = getUrlQuery('_redirect')
            if (redirect) {
                window.location.replace(addUrlQuery(decodeURIComponent(redirect), {token: user.accessToken})) // TODO salt token
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
            <Route path="/" component={Home} onEnter={requireAuth} onLeave={triggerLeave}/>
            <Route path="/signin" component={Login} onEnter={authRedirect} onLeave={triggerLeave}/>
        </Router>
    )
}
