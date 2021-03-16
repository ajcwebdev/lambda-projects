import React, { useState } from 'react';
import Form from './Form';
import * as yup from 'yup';
import Axios from 'axios';

function App() {
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
  }
  const initialFormErrors = {
    name: '',
    email: '',
    password: '',
    tos: '',
  }
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name required')
      .min(2, 'Name must be at least 2 characters'),
    email: yup
      .string()
      .email('Not a valid email')
      .required('Email required'),
    password: yup
      .string()
      .required('Password required')
      .min(6, 'Password must be at least 6 characters'),
    tos: yup
      .string()
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const inputChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setSubmitDisabled(false);
        return setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        const error = err.errors[0];
        setSubmitDisabled(true);

        return setFormErrors({
          ...formErrors,
          [name]: error,
        });
      })
    
    return setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const submitHandler = event => {
    event.preventDefault();

    return Axios.post('https://reqres.in/api/users', formValues)
      .then(res => {
        return setUsers([
          ...users,
          res.data
        ])
      });
  }

  return (
    <div className="App">
      <Form 
        onInputChange={inputChangeHandler}
        onSubmit={submitHandler}
        errors={formErrors}
        submitDisabled={submitDisabled}
      />
        {users.map(user => {return <pre key={user.id}>{JSON.stringify(user)}</pre>})}
    </div>
  );
}

export default App;
