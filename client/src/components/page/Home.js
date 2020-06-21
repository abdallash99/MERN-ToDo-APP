import React, { useEffect, useContext } from 'react'
import TodoForm from '../todo/TodoForm'
import TodoItems from '../todo/TodoItems'
import AuthContext from './../../context/auth/authContext';
import MYSpinner from '../layout/MYSpinner';
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser, loading } = authContext;
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])
    return (
        loading ? <MYSpinner /> :
            <div className='container'>
                <TodoForm />
                <TodoItems />
            </div>
    )
}

export default Home
