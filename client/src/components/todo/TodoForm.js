import React, { useState, useContext } from 'react'
import TodoContext from './../../context/todo/todoContext';
const TodoForm = () => {
    const todoContext = useContext(TodoContext)
    const { addTodo } = todoContext;
    const [form, setForm] = useState({
        title: ''
    })
    const change = (e) => {
        setForm({ title: e.target.value })
    }
    const submit = e => {
        e.preventDefault()
        addTodo(form)
        setForm({
            title: ''
        })
    }
    return (
        <form className="form-group" onSubmit={submit}>
            <div className="row">
                <div className="col-sm-10 mt-3">
                    <input type="text" className="form-control" value={form.title} onChange={change} name="title" placeholder='Add New' />
                </div>
                <div className="col-sm-2 mt-3">
                    <input type="submit" value="ADD" className="btn btn-success btn-block" />
                </div>

            </div>
        </form>
    )
}

export default TodoForm
