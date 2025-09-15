import React, { useReducer, createContext, useContext, useState } from 'react';
import './TodoList.css';

const TodoContext = createContext();

const initialState = [];

function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { text: action.payload, done: false }];
        case 'DELETE_TODO':
            return state.filter((_, index) => index !== action.payload);
        case 'TOGGLE_TODO':
            return state.map((todo, index) =>
                index === action.payload ? { ...todo, done: !todo.done } : todo
            );
        default:
            return state;
    }
}

function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}

function TodoList() {
    const { state, dispatch } = useContext(TodoContext);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim()) {
            dispatch({ type: 'ADD_TODO', payload: input });
            setInput('');
        }
    };

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
                    <button className={"add-button"} onClick={handleAdd}>Add</button>
                </div>
            </div>
            <ul className="todo-list">
                {state.map((todo, index) => (
                    <li key={index} className="todo-item">
            <span
                className={todo.done ? 'done' : ''}
                onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: index })}
            >
              {todo.text}
            </span>
                        <button
                            className="delete-button"
                            onClick={() => dispatch({ type: 'DELETE_TODO', payload: index })}
                        >
                            delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function App() {
    return (
        <TodoProvider>
            <TodoList />
        </TodoProvider>
    );
}
