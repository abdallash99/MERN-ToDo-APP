import React, { useEffect, useContext } from 'react'
import TodoForm from '../todo/TodoForm'
import TodoItems from '../todo/TodoItems'
import AuthContext from './../../context/auth/authContext';
import Spinner from '../layout/Spinner'
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser, loading } = authContext;
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])
    return (
        loading ? <Spinner /> :
            <div className='container'>
                <TodoForm />
                <TodoItems />
            </div>
    )
}

export default Home
