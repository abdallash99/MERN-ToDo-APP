import {
    LOAD_USER,
    LOGIN,
    LOGOUT,
    REGISTER,
    AUTH_ERROR,
    CLEAR_ERROR
}
    from '../type'

export default function (state, action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
                loading: false
            }
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth: false,
                token: null,
                loading: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER: return {
            ...state,
            isAuth: true,
            loading: false,
            user: action.payload
        }
        case CLEAR_ERROR: return {
            ...state,
            error: null
        }
        default:
            return state
    }
}