import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-content">
        <div>
          <div className="footer-brand-name">
            Online<span>Hotel</span> Booking
          </div>
          <p className="footer-brand-desc">
            Premium hotel reservation platform featuring handpicked accommodations
            across Romania. Experience luxury at every destination.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Explore</div>
          <ul className="footer-links">
            <li>All Hotels</li>
            <li>Beach Resorts</li>
            <li>Mountain Lodges</li>
            <li>City Hotels</li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Support</div>
          <ul className="footer-links">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Cancellation Policy</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          © 2026 OnlineHotel Booking. All rights reserved.
        </span>
        <span className="footer-copy">
          Built with ♥ in Romania
        </span>
      </div>
    </footer>
  );
};
