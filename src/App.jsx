import { TodoProvider } from './context/TodoContext';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
    return (
        <TodoProvider>
            <div className="app">
                <h2>Todo List</h2>
                <TodoList />
            </div>
        </TodoProvider>
    );
}

export default App;
