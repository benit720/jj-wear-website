import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <header className={styles.hero}>
        <h1>CONTACT</h1>
        <p>GET IN TOUCH WITH THE SOURCE</p>
      </header>

      <section className={styles.section}>
        <h2>Our Story</h2>
        <div className={styles.storyContent}>
          JJ WEAR was born in 2024 from the combined vision of <span className={styles.highlight}>Juste and Justin</span>. 
          What started as a shared passion for authentic representation evolved into a mission to redefine Burundian streetwear. 
          Every design is a bridge between cultural depth and modern aesthetics.
        </div>
      </section>

      <section className={styles.section}>
        <h2>The Idea</h2>
        <div className={styles.visionContent}>
          The core idea of JJ WEAR is to create more than just clothing; we create <span className={styles.highlight}>identity</span>. 
          By merging the raw energy of the streets with the richness of our heritage, we provide a voice for 
          the bold, the creative, and the proud.
        </div>
      </section>

      <section className={styles.section}>
        <h2>Direct Links</h2>
        <div className={styles.contactGrid}>
          <a 
            href="https://www.instagram.com/jj__wear/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.contactCard}
          >
            <Instagram size={24} />
            <div>
              <h3>INSTAGRAM</h3>
              <p>Follow our journey @jj__wear</p>
            </div>
          </a>

          <a 
            href="https://wa.me/250796148211" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.contactCard}
          >
            <MessageCircle size={24} />
            <div>
              <h3>WHATSAPP</h3>
              <p>Direct support: +250 796 148 211</p>
            </div>
          </a>
        </div>
      </section>

      <footer className={styles.credits}>
        <p>Website meticulously crafted by <strong>New Dawn Web</strong></p>
      </footer>
    </div>
  );
};

export default Contact;
