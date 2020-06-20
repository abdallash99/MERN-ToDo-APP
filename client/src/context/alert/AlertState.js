import React, { useReducer } from 'react'
import AlertContext from './alertContext';
import {
    SET_ALERT,
    CLEAR_ALERT
}
    from '../type'
import alertReducer from './alertReducer';

const AlertState = (props) => {
    const initialState = {
        alerts: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //Set Alert
    const setAlert = (alert) => {
        dispatch({ type: SET_ALERT, payload: alert })

        setTimeout(() => { dispatch({ type: CLEAR_ALERT }) }, 5000)
    }
    return <AlertContext.Provider
        value={{
            alert: state.alert,
            setAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState