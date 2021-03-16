import React from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Friend = ({name, email, age, id, setFriends, friends, setFriendToEdit}) => {
  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setFriends(friends.filter(friend => friend.id !== id))
  }

  return (
    <>
      <h2>{name}, {age}</h2>
      <h3>{email}</h3>
      <button onClick={() => setFriendToEdit({id, name, age, email})}>Edit</button>
      <button onClick={() => deleteFriend(id)}>Delete</button>
    </>
  );
}

export default Friend;