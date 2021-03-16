import React from 'react';

const TodoForm = ({changeHandler, submitHandler, clearCompleted}) => {

  return(
    <div>
      <input
        onChange={event => changeHandler(event.target.value)}
        type="text"
        placeholder="Enter todo"
      />
      <button onClick={submitHandler}>Add Todo</button>
      <button onClick={clearCompleted} value="button">Clear Completed</button>
    </div>
  );
}

export default TodoForm;