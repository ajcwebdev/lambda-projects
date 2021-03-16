import React from "react";

class TodoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    };
  }

  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.props.addTodo(this.state.inputValue);
    this.setState({
      inputValue: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          type="text"
          onChange={this.inputChange}
          value={this.state.inputValue}
        />
        <button>Add Todo</button>
        <button
          type="button"
          onClick={this.props.clearCompleted}
        >
          Clear Completed
        </button>
      </form>
    );
  }
}

export default TodoForm;
