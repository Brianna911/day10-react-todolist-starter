import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

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
    <div>
      <input
        type="text"
        value={input}
        placeholder="Add a task"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {state.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: index })}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: index })}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
