import React, { useState, useContext, useEffect } from 'react'
import AlertContext from './../../context/alert/alertContext';
import AuthContext from './../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { register, error, isAuth, clearError } = authContext;
    const [form, setForm] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })
    useEffect(() => {
        if (isAuth) {
            props.history.push('/');
        }
        if (error === 'Email is already exist') {
            setAlert({ msg: error, type: 'danger' })
            clearError()
        }
        // eslint-disable-next-line
    }, [error, props.history, isAuth])
    const change = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const { password1, password2, email, name } = form;
    const submit = (e) => {
        e.preventDefault()
        if (password1 !== password2) {
            setAlert({ type: 'danger', msg: 'Password does not match' })
        }
        else if (name === '' || email === '' || password2 === '' || password1 === '') {
            setAlert({ type: 'danger', msg: 'Please fill all feiled' })
        }
        else
            register({ name, email, password: password1 });
    }
    return (
        <div className='container'>
            <h1 className='text-center my-3'>Register User</h1>
            <div className="row my-3">
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={submit} autoComplete="on">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className='form-control' name="name" value={name} onChange={change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='form-control' name="email" value={email} onChange={change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password1">Password</label>
                            <input type="password" className='form-control' name="password1" value={password1} onChange={change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input type="password" className='form-control' name="password2" value={password2} onChange={change} />
                        </div>
                        <input type="submit" value="Register" className='btn btn-primary btn-block' />
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Register
