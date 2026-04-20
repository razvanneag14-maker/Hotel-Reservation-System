import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (dest: string, start: string, end: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [dest, setDest] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const barStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#febb02', // Booking.com Yellow
    padding: '4px',
    borderRadius: '4px',
    gap: '4px',
    width: '100%',
    maxWidth: '1024px'
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '2px',
    outline: 'none'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 24px',
    backgroundColor: '#0071c2', 
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '2px'
  };

  return (
    <div style={barStyle}>
      <input 
        style={inputStyle} 
        placeholder="Where are you going?" 
        onChange={(e) => setDest(e.target.value)} 
      />
      <input 
        style={inputStyle} 
        type="date" 
        onChange={(e) => setStart(e.target.value)} 
      />
      <input 
        style={inputStyle} 
        type="date" 
        onChange={(e) => setEnd(e.target.value)} 
      />
      <button 
        style={buttonStyle} 
        onClick={() => onSearch(dest, start, end)}
      >
        Search
      </button>
    </div>
  );
};