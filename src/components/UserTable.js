// src/components/UserTable.js
import React from 'react';

export default function UserTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td><img src={user.avatar} alt="avatar" /></td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
