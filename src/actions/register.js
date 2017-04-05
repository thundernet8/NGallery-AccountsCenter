import CONSTANTS                from '../constants'
import axios                    from 'axios'

export const requestRegister = (username, email, password) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.REQUEST_REGISTER
        })

        const api = CONSTANTS.REGISTER_API
        const data = {username, email, password}
        return axios.post(api, data)
        .then(ret => ret.data)
        .then(ret /* IUserDocument */ => {
            dispatch({
                type: CONSTANTS.REQUEST_REGISTER_SUCCESS,
                payload: ret
            })
            return ret
        })
        .catch(err => {
            console.dir(err) // TODO clear
            dispatch({
                type: CONSTANTS.REQUEST_REGISTER_FAIL,
                err
            })
            throw new Error(err)
        })
    }
}
