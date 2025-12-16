import React, { useState } from 'react';
import './AuthPage.css';
import { Mail, Lock, User, UserCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }

    if (!isLogin && !formData.email) {
      setError('Email is required');
      return;
    }

    const endpoint = isLogin 
      ? 'http://localhost/backend/login.php'
      : 'http://localhost/backend/register.php';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setError('');
        
        // If registration successful, switch to login after 2 seconds
        if (!isLogin) {
          setTimeout(() => {
            setIsLogin(true);
            setMessage('');
            setFormData({
              fullName: '',
              email: '',
              username: '',
              password: ''
            });
          }, 2000);
        }
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      setError('Connection error. Make sure PHP server is running.');
      setMessage('');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    className="form-input" 
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    className="form-input" 
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-wrapper">
              <UserCircle className="input-icon" size={18} />
              <input 
                type="text" 
                name="username"
                className="form-input" 
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                name="password"
                className="form-input" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-link">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" className="toggle-button" onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
            setError('');
            setFormData({
              fullName: '',
              email: '',
              username: '',
              password: ''
            });
          }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
