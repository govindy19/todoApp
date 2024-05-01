import React, { useState, useEffect } from 'react';
import ThemeButton from './ThemeButton';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editedTodo, setEditedTodo] = useState(null);
  const [editing, setEditing] = useState(false); // New state variable for editing mode

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
    // else{

    // }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );

    // Disable editing when clicking the checkbox
    if (editing) {
      setEditing(false);
      setEditedTodo(null);
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container mx-auto max-w-lg p-10">
      <ThemeButton />
      <h1 className="text-3xl font-semibold mb-4 dark:text-white">Todo App</h1>

      <div className="flex">
        <input
          type="text"
          className="w-full rounded-l py-2 px-3 border border-gray-300"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r py-2 px-4 dark:bg-orange-700"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center ${
              todo.completed ? 'bg-green-500' : 'bg-white dark:bg-slate-600'
            } rounded-lg shadow-md p-3 mt-2`}
          >
            <div>
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
              />
            </div>
            <input
              type="text"
              className={`${
                editedTodo === todo.id && !todo.completed ? 'border' : ''
              } p-2 mx-1 outline-none w-full bg-transparent rounded-lg ${
                todo.completed ? 'line-through' : ''
              }`}
              value={todo.text}
              onChange={(e) => {
                if (editedTodo === todo.id) {
                  editTodo(todo.id, e.target.value);
                }
              }}
              readOnly={editedTodo !== todo.id || todo.completed}
            />
            <div className='flex'>
              <button
                className={`text-yellow-500 hover:text-yellow-600 mr-2 ${
                  todo.completed ? 'hidden' : ''
                }`}
                onClick={() => {
                  if (editedTodo === todo.id) {
                    setEditedTodo(null);
                  } else {
                    setEditedTodo(todo.id);
                  }

                  // Update editing state
                  setEditing(editedTodo !== todo.id);
                }}
              >
                {editedTodo === todo.id ? "📁" : "✏️"}
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => deleteTodo(todo.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
