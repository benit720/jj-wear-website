import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={closeMenu}>
        <Link to="/">JJ WEAR</Link>
      </div>

      {/* Desktop Links */}
      <div className={styles.navLinks}>
        <Link to="/collections">COLLECTIONS</Link>
        {user?.isAdmin && <Link to="/admin">ADMIN</Link>}
        <Link to="/contact">CONTACT</Link>
      </div>

      <div className={styles.actions}>
        <Link to="/cart" aria-label="Cart" onClick={closeMenu}>
          <ShoppingCart size={24} />
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>

        {/* User Account (Desktop) */}
        <div className={styles.userActions}>
          {user ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name.split(' ')[0].toUpperCase()}</span>
              <button onClick={logout} className={styles.logoutBtn} aria-label="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" aria-label="Account">
              <User size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.logo}>JJ WEAR</div>
          <button className={styles.closeBtn} onClick={closeMenu}>&times;</button>
        </div>
        <div className={styles.drawerLinks}>
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/collections" onClick={closeMenu}>COLLECTIONS</Link>
          {user?.isAdmin && <Link to="/admin" onClick={closeMenu}>ADMIN PANEL</Link>}
          <Link to="/contact" onClick={closeMenu}>CONTACT US</Link>
          <Link to="/shipping" onClick={closeMenu}>SHIPPING & PAYMENT</Link>
          
          <div className={styles.drawerDivider}></div>
          
          {user ? (
            <>
              <div className={styles.drawerUser}>SIGNED IN AS: {user.name.toUpperCase()}</div>
              <button onClick={() => { logout(); closeMenu(); }} className={styles.drawerLogout}>
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className={styles.drawerLogin}>
              SIGN IN / REGISTER
            </Link>
          )}
        </div>
      </div>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </nav>
  );
};


export default Navbar;
