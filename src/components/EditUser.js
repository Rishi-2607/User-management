const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      alert('User deleted');
      fetchUsers(); // Refresh the user list
    } catch (error) {
      alert('Delete failed');
    }
  };
  