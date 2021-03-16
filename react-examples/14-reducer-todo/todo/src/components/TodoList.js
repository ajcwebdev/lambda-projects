import React from 'react';

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <ul>
    {todos.map(todo => (
        <li
          onClick={() => toggleTodo(todo.id)}
          key={todo.id}
          style={{ cursor: "pointer", textDecoration: todo.completed ? 'line-through' : "" }}
        >
          {todo.task}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;