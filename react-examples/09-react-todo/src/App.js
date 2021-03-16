import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

const todoData = [
  {
    task: "Organize Garage",
    id: 1528817077286,
    completed: false
  },
  {
    task: "Bake Cookies",
    id: 1528817084358,
    completed: false
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: todoData
    };
  }

  addTodo = task => {
    const newTask = {
      task: task,
      id: Date.now(),
      completed: false
    };
    this.setState({todo: [...this.state.todo, newTask]});
  };

  markComplete = event => {
    const id = event.target.id;
    const newTodo = [...this.state.todo];
    newTodo.splice(id, 1, {
      ...this.state.todo[id],
      completed: !this.state.todo[id].completed
    });
    this.setState({todo: newTodo});
  };

  clearCompleted = event => {
    this.setState({todo: [...this.state.todo.filter(todo => todo.completed === false)]});
  };

  render() {
    return (
      <div className="container">
        <h2>Todo List: MVP</h2>
        <TodoList todo={this.state.todo} markComplete={this.markComplete} />
        <TodoForm addTodo={this.addTodo} clearCompleted={this.clearCompleted} />
      </div>
    );
  }
}

export default App;
