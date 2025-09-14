import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import EmptyState from './components/EmptyState';
import './styles/App.css';

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        if (text.trim() === '') return;
        setTodos([...todos, { text, completed: false }]);
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <h1>Todo List</h1>
            <TodoInput addTodo={addTodo} />
            {todos.length === 0 ? (
                <EmptyState />
            ) : (
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            index={index}
                            todo={todo}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
