// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow login with specific credentials
    if (email !== 'eve.holt@reqres.in' || password !== 'cityslicka') {
      setError('Invalid login credentials');
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      // Store the token and navigate to the Users List page
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-2xl transition-transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600">Welcome Back!</h2>
        <p className="text-center text-gray-500">Please log in to your account</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
