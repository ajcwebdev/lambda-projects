import React, { useReducer } from 'react';
import { reducer, initialState } from './reducers/reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import "./App.css"

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const changeHandler = value => dispatch({type: "INPUT_TEXT", payload: value});
  const toggleTodo = id => dispatch({type: "TOGGLE_TODO", payload: id});

  return (
    <div className="App">
      <h2>Reducer Todo List</h2>
      <TodoList
        todos={state.todos}
        toggleTodo={toggleTodo}
      />
      <TodoForm 
        changeHandler={changeHandler} 
        submitHandler={() => dispatch({type: "ADD_TODO"})} 
        clearCompleted={() => dispatch({type: "CLEAR_COMPLETED"})}
      />
    </div>
  );
}

export default App;