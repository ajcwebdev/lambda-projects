import React, { useState } from "react";
import Form from "./Form";
import * as yup from "yup";
import Axios from "axios";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  const initialFormValues = {
    name: "",
    size: "",
    sauce: ""
  };
  const initialFormErrors = {
    name: "",
    size: "",
    sauce: ""
  };
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name required")
      .min(2, "Name must be at least 2 characters"),
    pepperoni: yup.string(),
    sausage: yup.string(),
    canadianBacon: yup.string(),
    italianSausage: yup.string(),
    instructions: yup.string(),
    size: yup.string(),
    sauce: yup.string(),
    red: yup.string(),
    bbq: yup.string(),
    spinach: yup.string(),
    ranch: yup.string()
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const inputChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setSubmitDisabled(false);
        return setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(err => {
        const error = err.errors[0];
        setSubmitDisabled(true);

        return setFormErrors({
          ...formErrors,
          [name]: error
        });
      });

    return setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const submitHandler = event => {
    event.preventDefault();

    return Axios.post("https://reqres.in/api/users", formValues).then(
      response => {
        return setUsers([...users, response.data]);
      }
    );
  };

  return (
    <div className="App">
      <Switch>
        <Route path={"/pizza"}>
          <Form
            onInputChange={inputChangeHandler}
            onSubmit={submitHandler}
            errors={formErrors}
            submitDisabled={submitDisabled}
          />
          {users.map(user => {
            return <pre key={user.id}>{JSON.stringify(user)}</pre>;
          })}
        </Route>
        <Route path={"/"}>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
