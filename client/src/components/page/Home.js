import React, { useEffect, useContext } from 'react'
import TodoForm from '../todo/TodoForm'
import TodoItems from '../todo/TodoItems'
import AuthContext from './../../context/auth/authContext';
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='container'>
            <TodoForm />
            <TodoItems />
        </div>
    )
}

export default Home
