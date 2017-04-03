import * as CONSTANTS           from '../constants'
import axios                    from 'axios'

export const requestLogin = (username, password) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.REQUEST_LOGIN
        })

        const api = CONSTANTS.LOGIN_API
        const data = {username, password}
        return axios.post(api, data)
        .then(ret => ret.data)
        .then(ret /* {expire, access_token} */ => {
            dispatch({
                type: CONSTANTS.REQUEST_LOGIN_SUCCESS,
                payload: ret
            })
            return ret
        })
        .catch(err => {
            dispatch({
                type: CONSTANTS.REQUEST_LOGIN_FAIL,
                err
            })
            throw new Error(err)
        })
    }
}
