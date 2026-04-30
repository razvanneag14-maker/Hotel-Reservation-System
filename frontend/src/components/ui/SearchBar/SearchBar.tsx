import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onDateChange?: (checkIn: string, checkOut: string) => void;
  placeholder?: string;
  showDates?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onDateChange,
  placeholder = 'Search hotels by name or location...',
  showDates = true,
}) => {
  const [query, setQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Get today's date in YYYY-MM-DD format for min constraint
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    if (onDateChange) {
      onDateChange(checkIn, checkOut);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // Live search as user types
    onSearch(value);
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckIn(value);
    if (checkOut && value > checkOut) {
      setCheckOut('');
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(e.target.value);
  };

  return (
    <div>
      <form className="search-bar-container" onSubmit={handleSubmit}>
        <input
          className="search-bar-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          id="search-input"
        />
        <button className="search-bar-btn" type="submit" id="search-btn">
          Search
        </button>
      </form>
      {showDates && (
        <div className="search-bar-container search-date-row">
          <div className="search-date-field">
            <span className="search-date-label">Check-in</span>
            <input
              className="search-date-input"
              type="date"
              value={checkIn}
              min={today}
              onChange={handleCheckInChange}
              id="search-checkin"
            />
          </div>
          <div className="search-date-field">
            <span className="search-date-label">Check-out</span>
            <input
              className="search-date-input"
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={handleCheckOutChange}
              id="search-checkout"
            />
          </div>
        </div>
      )}
    </div>
  );
};
