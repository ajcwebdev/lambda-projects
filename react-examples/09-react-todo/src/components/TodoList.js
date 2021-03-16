import React from "react";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todo.map((todo, id) => (
          <TodoItem
            key={todo.id}
            id={id}
            todo={todo}
            markComplete={this.props.markComplete}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
