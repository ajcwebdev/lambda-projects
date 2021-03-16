import React from "react";

function Form(props) {
  const { onInputChange, onSubmit, errors, submitDisabled } = props;
  return (
    <div className="container">
      <form className="form">
        <span>{errors.name}</span>
        <div className="form-control">
          <label className="name" htmlFor="name">
            Name:
            <input onChange={onInputChange} type="text" name="name" />
          </label>
        </div>
        <span>{errors.email}</span>
        <div className="form-control">
          <label className="name" htmlFor="name">
            Email:
            <input onChange={onInputChange} type="text" name="email" />
          </label>
        </div>
        <span>{errors.password}</span>
        <div className="form-control">
          <label className="name" htmlFor="name">
            Password:
            <input
              onChange={onInputChange}
              type="text"
              name="password"
              id="password"
            />
          </label>
        </div>
        <span>{errors.tos}</span>
        Terms of Service:
        <input onChange={onInputChange} type="checkbox" name="tos" />
        {!submitDisabled ? (
          <button onClick={onSubmit}>Submit</button>
        ) : (
          <button disabled={submitDisabled}>Submit</button>
        )}
      </form>
    </div>
  );
}

export default Form;
