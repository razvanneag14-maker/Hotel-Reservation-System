import { SearchBar } from '../../ui/SearchBar/SearchBar';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
  onDateChange?: (checkIn: string, checkOut: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onDateChange }) => {
  return (
    <header className="hero-header" id="hero-header">
      <div className="hero-content">
        <p className="hero-subtitle">Online Hotel Booking</p>
        <h1 className="hero-title">Find Your Perfect Stay</h1>
        <p className="hero-description">
          Discover handpicked luxury hotels across Romania. From Black Sea resorts
          to Carpathian mountain lodges — your dream getaway awaits.
        </p>
        <div className="hero-search-wrapper">
          <SearchBar onSearch={onSearch} onDateChange={onDateChange} />
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">150+</div>
            <div className="hero-stat-label">Premium Hotels</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">50K+</div>
            <div className="hero-stat-label">Happy Guests</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">4.8</div>
            <div className="hero-stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </header>
  );
};
