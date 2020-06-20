import React, { useContext } from 'react'
import TodoContext from './../../context/todo/todoContext';
const TodoItem = (props) => {
    const todoContext = useContext(TodoContext)
    const { deleteTodo, done } = todoContext;
    const deleteTo = () => {
        deleteTodo(props.item._id)
    }
    const Done = () => {
        done({ ...props.item, done: true })
    }
    return (
        <div className='card text-center my-3'>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-8">
                        {
                            props.item.done ? <del><p>{props.item.title}</p></del> : <p>{props.item.title}</p>
                        }
                    </div>
                    <div className="col my-2">
                        <button className='btn btn-dark btn-block ' onClick={Done} disabled={props.item.done}>Done</button>
                    </div>
                    <div className="col my-2">
                        <button className='btn btn-danger btn-block' onClick={deleteTo}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
