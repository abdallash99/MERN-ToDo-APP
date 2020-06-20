import React, { useContext } from 'react'
import AlertContext from './../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext;
    return (
        alert ?
            (
                <div className="container">
                    <div className={`alert my-3 alert-${alert.type}`}>
                        {alert.msg}
                    </div>
                </div>
            ) : null
    )
}

export default Alert
