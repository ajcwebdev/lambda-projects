import React from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    cred: {username: "", password: ""},
    isFetching: false
  };

  handleChange = event => {
    this.setState({cred: {...this.state.cred, [event.target.name]: event.target.value}});
  };

  login = event => {
    event.preventDefault();
    this.setState({isFetching: true});
    axiosWithAuth()
      .post("/login", this.state.cred)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        this.props.history.push("/protected");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
      <form onSubmit={this.login}>
        <input type="text" name="username" value={this.state.cred.username} onChange={this.handleChange} />
        <input type="password" name="password" value={this.state.cred.password} onChange={this.handleChange} />
        <button>Login</button>
        {this.state.isFetching && "Logging in"}
      </form>
      </div>
    );
  }
}

export default Login;