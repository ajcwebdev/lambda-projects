import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const FriendForm = ({setFriends, friendToEdit, setFriendToEdit}) => {
  const [newFriend, setNewFriend] = useState({ name: '', age: '', email: ''});

  useEffect(() => {
    if(friendToEdit) setNewFriend(friendToEdit);
  }, [friendToEdit])

  const submitFriend = e => {
    e.preventDefault();

    (friendToEdit) 
      ? axiosWithAuth()
        .put(`http://localhost:5000/api/friends/${newFriend.id}`, newFriend)
        .then(response => setFriends(response.data))
        .catch(error => console.log(error))
      : axiosWithAuth()
        .post('http://localhost:5000/api/friends', newFriend)
        .then(response => setFriends(response.data))
        .catch(error => console.log(error))
    setNewFriend({name: '', age: '', email: ''});
    setFriendToEdit(null)
  }

  const handleChange = e => {
    setNewFriend({
      ...newFriend,
      [e.target.name]: (e.target.name === 'age') ? Number(e.target.value) : e.target.value,
    })
  }

  return (
    <form onSubmit={submitFriend}>
      <input
        name="name"
        placeholder="name"
        value={newFriend.name}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="age"
        value={newFriend.age}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="email"
        value={newFriend.email}
        onChange={handleChange}
      />

      <button>{(friendToEdit) ? 'Edit' : 'Submit'}</button>
    </form>
  );
}

export default FriendForm;