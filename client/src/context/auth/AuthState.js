import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken'
import {
    LOAD_USER,
    LOGIN,
    LOGOUT,
    REGISTER,
    AUTH_ERROR,
    CLEAR_ERROR
}
    from '../type'
import authReducer from './authReducer';

const AuthState = (props) => {
    const initialState = {
        loading: true,
        user: null,
        token: null,
        isAuth: false,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load  user

    const loadUser = async () => {
        setAuthToken(localStorage.getItem('token'))
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: LOAD_USER, payload: res.data })
        } catch (err) {
            console.log(err.response.data.msg)
            dispatch({ type: AUTH_ERROR, payload: err.response.data.msg })
        }
    }

    //Register
    const register = async (form) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', form, config)
            dispatch({ type: REGISTER, payload: res.data })
            loadUser()
        } catch (err) {
            console.log(err.response)
            dispatch({ type: AUTH_ERROR, payload: err.response.data.msg })
        }
    }
    // login
    const login = async (form) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post('/api/auth', form, config)
            dispatch({ type: LOGIN, payload: res.data })
            loadUser()
        } catch (err) {
            console.log(err.response)
            dispatch({ type: AUTH_ERROR, payload: err.response.data.msg })
        }
    }
    //clear Error
    const clearError = () => {
        dispatch({ type: CLEAR_ERROR })
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
    }


    return <AuthContext.Provider
        value={{
            loading: state.loading,
            user: state.user,
            token: state.token,
            isAuth: state.isAuth,
            error: state.error,
            login,
            register,
            logout,
            clearError,
            loadUser
        }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthState