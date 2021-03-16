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
        <div className="form-control">
          <label htmlFor="size">Choice of Size: </label>

          <select
            onChange={onInputChange}
            htmlFor="size"
            name="size"
            value="size"
            id="size"
            form="size"
          >
            <option>Big</option>
            <option>Really Big</option>
            <option>Super Big</option>
            <option>Like Crazy Big Dude</option>
          </select>
        </div>
        Choice of Sauce:
        <div>
          <input
            onChange={onInputChange}
            type="radio"
            htmlFor="red"
            id="red"
            name="red"
            value="red"
          />
          <label htmlFor="red">Original Red</label>
        </div>
        <div>
          <input
            onChange={onInputChange}
            type="radio"
            htmlFor="ranch"
            id="ranch"
            name="ranch"
            value="ranch"
          />
          <label onChange={onInputChange} htmlFor="ranch">
            Garlic Ranch
          </label>
        </div>
        <div>
          <input
            onChange={onInputChange}
            type="radio"
            htmlFor="bbq"
            id="bbq"
            name="bbq"
            value="bbq"
          />
          <label onChange={onInputChange} htmlFor="bbq">
            BBQ Sauce
          </label>
        </div>
        <div>
          <input
            onChange={onInputChange}
            type="radio"
            htmlFor="spinach"
            id="spinach"
            name="spinach"
            value="spinach"
          />
          <label onChange={onInputChange} htmlFor="spinach">
            Spinach Alfredo
          </label>
        </div>
        <br />
        <br />
        Add Toppings:
        <br />
        <input onChange={onInputChange} type="checkbox" name="pepperoni" />
        Pepperoni
        <br />
        <input onChange={onInputChange} type="checkbox" name="sausage" />
        Sausage
        <br />
        <input onChange={onInputChange} type="checkbox" name="canadianBacon" />
        Canadian Bacon
        <br />
        <input onChange={onInputChange} type="checkbox" name="italianSausage" />
        Spicy Italian Sausage
        <br />
        <br />
        <br />
        <div className="form-control">
          <label>Special instructions:</label>

          <textarea
            onChange={onInputChange}
            type="text"
            name="instructions"
            rows="4"
            cols="38"
          >
            Anything else you'd like to add?
          </textarea>
        </div>
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
