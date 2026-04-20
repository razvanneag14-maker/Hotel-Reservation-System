import React, { useState } from 'react';
import * as API from '../services/api/endpoints'; //

export const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Sending request to: ${API.backendUrl}${API.signInEndpoint}`); //
    
    try {
      const response = await fetch(`${API.backendUrl}${API.signInEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login Response:', data);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', maxWidth: '400px', margin: '40px auto' }}>
      <h2 style={{ color: '#003580', marginBottom: '20px' }}>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle} 
          required 
        />
        <button type="submit" style={buttonStyle}>Sign In</button>
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '12px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  fontSize: '16px'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0071c2',
  color: 'white',
  border: 'none',
  padding: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '4px'
};