import { LoginForm } from '../../components/forms/LoginForm/LoginForm';
import { useToast } from '../../components/ui/Toast/Toast';
import logo from '../../assets/logo.png';
import './LoginScreen.css';

interface LoginScreenProps {
  onNavigate: (path: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast('success', 'Welcome back!', 'You are now logged in.');
    onNavigate('/');
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-card-header">
          <img src={logo} alt="OnlineHotel Booking" className="login-card-logo-img" />
          <p className="login-card-subtitle">Sign in to your account</p>
        </div>

        <LoginForm onSuccess={handleSuccess} />

        <button className="login-back-link" onClick={() => onNavigate('/')}>
          ← Back to Hotels
        </button>
      </div>
    </div>
  );
};
