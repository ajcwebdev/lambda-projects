import React from "react";

class TodoItem extends React.Component {
  render() {
    return (
      <li
        id={this.props.id}
        className={this.props.todo.completed ? "completed" : null}
        onClick={this.props.markComplete}
      >
        {this.props.todo.task}
      </li>
    );
  }
}

export default TodoItem;
