import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [blockchainId, setBlockchainId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { username, email, password, blockchainId });
      localStorage.setItem('token', res.data.token);
      // Redirect to home
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={blockchainId} onChange={(e) => setBlockchainId(e.target.value)} placeholder="Blockchain ID" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
