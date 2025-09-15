import React, { useContext, useState, useEffect } from 'react';
import './TodoList.css';
import {getTodos, createTodos, deteleTodos, updateTodos} from '../api/api';
import { TodoContext } from '../context/TodoContext';

function TodoList() {
    const { state, dispatch } = useContext(TodoContext);
    const [input, setInput] = useState('');

    const [editTodo, setEditTodo] = useState(null); // 当前正在编辑的 todo
    const [editText, setEditText] = useState('');   //

    const handleAdd = async () => {
        if (input && input.trim()) {
            const newTodo = {
                done: false,
                text: input.trim()
            }
            const response = await createTodos(newTodo);
            console.log(response)
            dispatch({ type: 'ADD_TODO', todo: response.data });
            setInput('');
        }
    };

    const handleCancelEdit = () => {
        setEditTodo(null);
        setEditText('');
    };

    const handleUpdate = async () => {
        if (editText.trim()) {
            const updated = { ...editTodo, text: editText };
            await updateTodos(editTodo.id, updated);
            dispatch({ type: 'LOAD_TODO', todos: state.map(t => t.id === editTodo.id ? updated : t) });
            setEditTodo(null);
            setEditText('');
        }
    };


    const DeleteTodo = async (id) => {
        try {
            await deteleTodos(id);
            dispatch({ type: 'DELETE_TODO', payload: id }); // ✅ 修复：使用正确的 action type
        } catch (error) {
            console.error('删除失败:', error);
        }
    };

    const ToggleTodo = async (todo) => {
        try {
            const updated = { ...todo, done: !todo.done };
            await updateTodos(todo.id,updated);
            dispatch({ type: 'TOGGLE_TODO', payload: todo.id }); // ✅ 使用 todo.id
        } catch (error) {
            console.error('更新失败:', error);
        }
    };

    useEffect(() => {
        getTodos().then(response => {
            dispatch({ type: 'LOAD_TODO', todos: response.data });
        });
    }, [dispatch]);

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <div className="todo-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task"
                />
                <div>
                    <button className="add-button" onClick={handleAdd}>Add</button>
                </div>
            </div>
            <ul className="todo-list">
                {state.map((todo, index) => (
                    <li key={todo.id || index} className="todo-item">
                        <span
                            className={todo.done ? 'done' : ''}
                            onClick={() => ToggleTodo(todo)}
                            onDoubleClick={() => {
                                setEditTodo(todo);
                                setEditText(todo.text);
                            }}

                        >
                            {todo.text}
                        </span>
                        <button
                            className="delete-button"
                            onClick={() => DeleteTodo(todo.id)} // ✅ 使用 todo.id 而不是 index
                        >
                            delete
                        </button>

                    </li>
                ))}

                {/* 编辑弹窗 */}
                {editTodo && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Edit Todo</h3>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <div className="modal-buttons">
                                <button onClick={handleCancelEdit}>Cancel</button>
                                <button onClick={handleUpdate}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

            </ul>
        </div>
    );
}

export default TodoList;
