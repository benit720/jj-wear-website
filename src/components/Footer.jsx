import styles from './Footer.module.css';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h3>JJ WEAR</h3>
          <p>EST. 2024 - BURUNDI</p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h4>SHOP</h4>
            <ul>
              <li><a href="/collections">All Collections</a></li>
              <li><a href="/new-arrivals">New Arrivals</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>CONNECT</h4>
            <div className={styles.social}>
              <a 
                href="https://www.instagram.com/jj__wear/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Instagram size={20} />
                <span>INSTAGRAM</span>
              </a>
              <a 
                href="https://wa.me/250796148211" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <MessageCircle size={20} />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} JJ WEAR. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
