import React, { Component } from "react";
import GithubCard from "./GithubCard";
import axios from "axios";
import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      followers: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/ajcwebdev`)
      .then(response => {this.setState({ user: response.data });})
      .catch(error => console.log("ERROR: ", error));

    axios
      .get(`https://api.github.com/users/ajcwebdev/followers`)
      .then(response => {
        response.data.forEach(item => {
          axios
            .get(`${item.url}`)
            .then(response => {this.setState({followers: [...this.state.followers, response.data]});})
            .catch(error => console.log("ERROR:", error));
        });
      })
      .catch(error => {console.log("Error: ", error);});
  }

  render() {
    return (
      <div>
        <GithubCard data={this.state.user} />
        {this.state.followers.map(followers => (
          <GithubCard key={followers.id} data={followers} />
        ))}
      </div>
    );
  }
}
export default App;
