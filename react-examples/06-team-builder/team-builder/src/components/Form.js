import React from "react";

function App({ values, onInputChange, onSubmit, memberToEdit, editMember }) {
  const roles = ["Guitar", "Bass", "Drums", "Piano", "Kazoo"];
  return (
    <form>
      <h2>Add member</h2>
      <label>Name:
        <input
          value={values.name}
          onChange={onInputChange}
          name="name"
          type="text"
        />
      </label>
      <label><br />Email:
        <input
          value={values.email}
          onChange={onInputChange}
          name="email"
          type="text"
        />
      </label>
      <label><br />Role:
        <select onChange={onInputChange} name="role">
          {roles.map((role, index) => {
            return (
              <option
                key={index}
                selected={memberToEdit && memberToEdit.role === role ? true : false}>
                {role}
              </option>
            );
          })}
        </select>
      </label><br />
      <button
        onClick={event => {
          if (memberToEdit) {return editMember(event);}
          else {return onSubmit(event);}
        }}>submit
      </button>
    </form>
  );
}

export default App;
