import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">JJ WEAR</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/collections">COLLECTIONS</Link>
        {user?.isAdmin && <Link to="/admin">ADMIN</Link>}
      </div>
      <div className={styles.actions}>
        <Link to="/cart" aria-label="Cart">
          <ShoppingCart size={24} />
        </Link>
        {user ? (
          <>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{user.name.split(' ')[0].toUpperCase()}</span>
            <button onClick={logout} className={styles.mobileMenu} aria-label="Logout" style={{ display: 'block' }}>
              <LogOut size={24} />
            </button>
          </>
        ) : (
          <Link to="/login" aria-label="Account">
            <User size={24} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
