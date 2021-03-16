import React, { Component } from "react";

class GithubCard extends Component {
  render() {
    return (
      <div className="card">
        <img alt="avatar" src={this.props.data.avatar_url} />
        <div className="card-info">
          <h2 className="name"><a href={this.props.data.html_url}>{this.props.data.name}</a></h2>
          <h3 className="username">{this.props.data.login}</h3>
          <p>{this.props.data.bio}</p>
          <p>Followers: {this.props.data.followers}</p>
          <p>Following: {this.props.data.following}</p>
        </div>
      </div>
    );
  }
}

export default GithubCard;
