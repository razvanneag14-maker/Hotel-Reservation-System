import React from 'react';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#003580', 
    padding: '20px 0 60px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    width: '100%'
  };

  const logoStyle: React.CSSProperties = {
    width: '90%',
    maxWidth: '1024px',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const handleSearch = (dest: string, start: string, end: string) => {
    console.log(`Searching for ${dest} from ${start} to ${end}`);
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>HotelReservation.com</div>
      <div style={{ width: '90%', maxWidth: '1024px' }}>
        <h1 style={{ margin: '0 0 20px 0' }}>Find your next stay</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    </header>
  );
};