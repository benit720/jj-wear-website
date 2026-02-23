import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [locating, setLocating] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDetectLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Auto-detected)`);
        setLocating(false);
      },
      () => {
        alert('Unable to retrieve your location');
        setLocating(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password, location);
    if (success) {
      if (email === 'admin@jjwear.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h1>{isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" required className={styles.input} />
              <div className={styles.locationWrapper}>
                <input 
                  type="text" 
                  placeholder="Delivery Location / Address" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required 
                  className={styles.input}
                />
                <button 
                  type="button" 
                  onClick={handleDetectLocation}
                  className={styles.locationButton}
                  disabled={locating}
                >
                  {locating ? '...' : 'AUTO-DETECT'}
                </button>
              </div>
            </>
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'SIGN IN' : 'REGISTER'}
          </button>
        </form>
        
        <p className={styles.switchMode}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
