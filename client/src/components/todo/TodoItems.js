import React, { useContext, useEffect } from 'react'
import TodoItem from './TodoItem'
import TodoContext from './../../context/todo/todoContext';

const TodoItems = () => {
    const todoContext = useContext(TodoContext)
    const { todo, getTodo } = todoContext;
    useEffect(() => {
        getTodo()
        // eslint-disable-next-line
    }, [])
    return (
        todo.map((item) => {
            return <TodoItem item={item} key={item._id} />
        })
    )
}

export default TodoItems
