import React from 'react';
import { Truck, CreditCard, ShieldCheck } from 'lucide-react';
import styles from './Shipping.module.css';

const Shipping = () => {
  return (
    <div className={styles.shippingPage}>
      <header className={styles.hero}>
        <h1>SHIPPING</h1>
        <p>DELIVERY & PAYMENT POLICY</p>
      </header>

      <section className={styles.section}>
        <h2>Delivery Process</h2>
        <div className={styles.stepGrid}>
          <div className={styles.stepCard}>
            <span className={styles.stepNumber}>01</span>
            <Truck size={32} strokeWidth={1} />
            <h3>ORDER PROCESSING</h3>
            <p>Once your order is placed, we prepare your items for dispatch. Standard processing takes 24-48 hours within Burundi.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNumber}>02</span>
            <ShieldCheck size={32} strokeWidth={1} />
            <h3>SECURE DELIVERY</h3>
            <p>Our dedicated courier service ensures your JJ WEAR gear arrives in perfect condition at your specified location.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Payment Methods</h2>
        <div className={styles.content}>
          <p>We accept several secure mobile and bank payment options to make the process convenient for you:</p>
          <div className={styles.paymentList}>
            <div className={styles.paymentItem}>
              <h4>MOBILE MONEY</h4>
              <p>Lumicash & EcoCash accepted.</p>
            </div>
            <div className={styles.paymentItem}>
              <h4>BANK TRANSFER</h4>
              <p>Local Burundian bank accounts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Confirm Your Order</h2>
        <div className={styles.content}>
          <p>To ensure your order is processed immediately, please follow these steps:</p>
          <div className={styles.importantNote}>
            <p>
              1. Make your payment using one of the methods above.<br />
              2. <span className={styles.highlight}>Take a screenshot</span> of the successful transaction confirmation.<br />
              3. Send the screenshot along with your Order ID to our WhatsApp support at <span className={styles.highlight}>+250 796 148 211</span>.
            </p>
          </div>
          <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
            No order will be dispatched until the payment screenshot has been verified by our team.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
