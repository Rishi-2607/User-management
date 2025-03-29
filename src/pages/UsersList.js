import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    };
    fetchUsers();
  }, [page]);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleSaveClick = async (userId) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${userId}`, editedUser);
      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, ...updatedUser } : user))
      );
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">Our Users</h1>

      {/* User Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card p-6 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform transform duration-300 flex flex-col items-center space-y-4"
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="user-avatar w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
            />

            {editingUserId === user.id ? (
              <>
                <input
                  type="text"
                  value={editedUser.first_name}
                  onChange={(e) => setEditedUser({ ...editedUser, first_name: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={editedUser.last_name}
                  onChange={(e) => setEditedUser({ ...editedUser, last_name: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Email"
                />
                <button
                  onClick={() => handleSaveClick(user.id)}
                  className="px-4 py-2 mt-2 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-700 text-center">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500 text-center">{user.email}</p>

                <button
                  onClick={() => handleEditClick(user)}
                  className="px-4 py-2 mt-2 text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform duration-200 transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="px-4 py-2 mt-2 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-transform duration-200 transform hover:scale-105"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-4">
      <button id='button'
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-105"
        >
          Next
        </button>
        <button id='button'
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-105"
        >
          Previous
        </button>
        
      </div>
    </div>
  );
}
