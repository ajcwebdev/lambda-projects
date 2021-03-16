import React, { useState, useEffect } from "react";
import Form from "./Form";

function App() {
  const initialFormData = {
    name: "",
    email: "",
    role: ""
  };
  const initialTeam = [
    {
      id: 0,
      name: "John",
      email: "john@beatles.com",
      role: "Guitar"
    },
    {
      id: 1,
      name: "Paul",
      email: "paul@beatles.com",
      role: "Bass"
    },
    {
      id: 2,
      name: "Ringo",
      email: "ringo@beatles.com",
      role: "Drums"
    }
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [memberList, setMemberList] = useState(initialTeam);
  const [memberToEdit, setMemberToEdit] = useState(null);

  useEffect(() => {
    if (memberToEdit) {setFormData(memberToEdit);}
  }, [memberToEdit]);

  const onInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    return setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    const newMemberId = memberList.length;
    const newMemberData = {
      ...formData,
      id: newMemberId
    };
    setMemberList([...memberList, newMemberData]);
    setFormData(initialFormData);
  };

  const editMember = event => {
    event.preventDefault();

    const newMemberList = memberList.map(member => {
      if (member.id === memberToEdit.id) {return formData;}
      else {return member;}
    });

    setMemberToEdit(null);
    setFormData(initialFormData);
    return setMemberList(newMemberList);
  };

  return (
    <div className="App">
      {memberList.map((member, index) => (
        <div key={index}>
          <h2>{member.name}</h2>
          <p>{member.email}</p>
          <p>{member.role}</p>
          <button onClick={() => setMemberToEdit(member)}>Edit</button>
        </div>
      ))}
      <Form
        values={formData}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        memberToEdit={memberToEdit}
        editMember={editMember}
      />
    </div>
  );
}

export default App;
