import { useStoreAuth } from '../../../common/stores/useStoreAuth';
import { Button } from '../../ui/Button/Button';
import './Navbar.css';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useStoreAuth();

  const handleLogout = () => {
    logout();
    onNavigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-logo" onClick={() => onNavigate('/')}>
        Online<span>Hotel</span>
      </div>

      <div className="navbar-nav">
        <button
          className={`navbar-link ${currentPath === '/' ? 'active' : ''}`}
          onClick={() => onNavigate('/')}
        >
          Home
        </button>
        {isAdmin && (
          <button
            className={`navbar-link ${currentPath === '/admin' ? 'active' : ''}`}
            onClick={() => onNavigate('/admin')}
          >
            Dashboard
          </button>
        )}
      </div>

      <div className="navbar-user-section">
        {isAuthenticated ? (
          <>
            <div className="navbar-user-badge">
              <span className="avatar">
                {currentUser?.name.charAt(0).toUpperCase()}
              </span>
              {currentUser?.name}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => onNavigate('/login')}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
