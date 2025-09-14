import React from 'react';
import '../styles/TodoItem.css';

function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
    return (
        <li className="todo-item">
      <span
          onClick={() => toggleTodo(index)}
          className={todo.completed ? 'completed' : ''}
      >
        {todo.text}
      </span>
            <button onClick={() => deleteTodo(index)}>X</button>
        </li>
    );
}

export default TodoItem;
