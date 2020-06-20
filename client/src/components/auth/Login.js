import React, { useState, useContext, useEffect } from 'react'
import AlertContext from './../../context/alert/alertContext';
import AuthContext from './../../context/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { login, isAuth, error, clearError } = authContext;
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(() => {
        if (isAuth) {
            props.history.push('/')
        }
        if (error === 'User Does not exist' || error === 'Incorrect Password') {
            setAlert({ msg: error, type: 'danger' })
            clearError()
        }
        // eslint-disable-next-line
    }, [error, props.history, isAuth])
    const change = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const { password, email, } = form;
    const submit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setAlert({ type: 'danger', msg: 'Please fill all feiled' })
        }
        else
            login({ email, password: password });
    }
    return (
        <div className='container'>
            <h1 className='text-center my-3'>Login User</h1>
            <div className="row my-3">
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={submit} autoComplete="on">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='form-control' name="email" value={email} onChange={change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className='form-control' name="password" value={password} onChange={change} />
                        </div>
                        <input type="submit" value="Login" className='btn btn-primary btn-block' />
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Login
