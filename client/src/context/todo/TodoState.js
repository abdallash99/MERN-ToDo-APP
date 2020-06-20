import React, { useReducer } from 'react'
import axios from 'axios'
import TodoContext from './todoContext';
import {

    ADD_TODO,
    DELETE_TODO,
    GET_TODO,
    DONE
}
    from '../type'
import todoReducer from './todoReducer';

const TodoState = (props) => {
    const initialState = {
        todo: [

        ]
    }

    const [state, dispatch] = useReducer(todoReducer, initialState);

    //add todo

    const addTodo = async (todo) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/todo', todo, config)
            dispatch({ type: ADD_TODO, payload: res.data });

        } catch (err) {
            console.log(err.response.data)
        }
    }
    //get todo
    const getTodo = async () => {
        try {
            const res = await axios.get('/api/todo')
            dispatch({ type: GET_TODO, payload: res.data });

        } catch (err) {
            console.log(err.response.data)
        }
    }

    //delete todo
    const deleteTodo = async (id) => {
        try {
            dispatch({ type: DELETE_TODO, payload: id });
            await axios.delete(`/api/todo/${id}`)
        } catch (err) {
            console.log(err.response.data)
        }

    }
    // DONE
    const done = async (todo) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            dispatch({ type: DONE, payload: todo });
            await axios.put(`/api/todo/${todo._id}`, todo, config)
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return <TodoContext.Provider
        value={{
            todo: state.todo,
            error: state.error,
            addTodo,
            getTodo,
            deleteTodo,
            done
        }}
    >
        {props.children}
    </TodoContext.Provider>
}

export default TodoState