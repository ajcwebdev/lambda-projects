export const initialState = {
  inputValue: "",
  todos: [
    {
      task: "Learn about reducers",
      id: Date.now(),
      completed: false,
    },
  ],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      if (state.inputValue) {
        return {...state, todos: [...state.todos,
            {
              task: state.inputValue,
              id: Date.now(),
              completed: false,
            },
          ],
        }
      }
    case "TOGGLE_TODO":
      return { ...state, todos: state.todos.map(todo => {
        if (action.payload === todo.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })};
    case "CLEAR_COMPLETED":
      return {...state, todos: state.todos.filter(todo => todo.completed === false)}
    case "INPUT_TEXT":
      return {...state, inputValue: action.payload}
    default:
      return state;
  }
}