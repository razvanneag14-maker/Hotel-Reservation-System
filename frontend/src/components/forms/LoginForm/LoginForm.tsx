import React, { useState } from 'react';
import { useStoreAuth } from '../../../common/stores/useStoreAuth';
import { Button } from '../../ui/Button/Button';
import './LoginForm.css';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, register } = useStoreAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const toggleMode = () => {
    resetFields();
    setIsRegister((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500));

    let result: { success: boolean; message: string };

    if (isRegister) {
      if (!firstName.trim() || !lastName.trim()) {
        setError('Please fill in your first and last name.');
        setLoading(false);
        return;
      }
      result = register(firstName.trim(), lastName.trim(), email, password);
    } else {
      result = login(email, password);
    }

    setLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} id="login-form">
      {error && <div className="login-error">{error}</div>}

      {isRegister && (
        <div className="login-name-row">
          <div className="login-field">
            <label className="login-label" htmlFor="login-firstname">
              First Name
            </label>
            <input
              id="login-firstname"
              className="login-input"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="login-lastname">
              Last Name
            </label>
            <input
              id="login-lastname"
              className="login-input"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <div className="login-field">
        <label className="login-label" htmlFor="login-email">
          Email Address
        </label>
        <input
          id="login-email"
          className="login-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="login-field">
        <label className="login-label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className="login-input"
          type="password"
          placeholder={isRegister ? 'Create a password' : 'Enter your password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
        {loading
          ? (isRegister ? 'Creating account...' : 'Signing in...')
          : (isRegister ? 'Create Account' : 'Sign In')
        }
      </Button>

      <div className="login-toggle">
        {isRegister ? (
          <>Already have an account? <button type="button" className="login-toggle-btn" onClick={toggleMode}>Sign In</button></>
        ) : (
          <>Don't have an account? <button type="button" className="login-toggle-btn" onClick={toggleMode}>Create Account</button></>
        )}
      </div>

      {!isRegister && (
        <div className="login-hint">
          <strong>Admin:</strong> admin@hotel.com / admin123<br />
          <strong>Guest:</strong> user@hotel.com / user123
        </div>
      )}
    </form>
  );
};
