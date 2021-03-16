import React from 'react';
import axios from 'axios';

const User = ({ name, bio, id, setUsers, users, setEditing }) => {

  const deleteUser = () => {
    axios
      .delete(`http://localhost:8910/api/users/${id}`)
      .then(res => setUsers(users.filter(user => user.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div className="user-card">
      
      <h1>{name}</h1>
      <h3>{bio}</h3>

      <button onClick={() => setEditing({ name, bio, id })}>
        Edit
      </button>

      <button onClick={deleteUser}>
        Delete
      </button>

    </div>
  );
}

export default User;