import React, { useState } from 'react';

import { useCart } from '../context/useCart';
import { useSales } from '../context/SalesContext';
import styles from './Checkout.module.css';
import { CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendOrderNotification } from '../utils/notificationService';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useSales();
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };


  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(async () => {
      // Record the sale
      const orderId = Date.now().toString();
      addOrder(cart, false); // isPrivate = false for web checkout
      
      // Send notification to admin
      await sendOrderNotification({
        id: orderId,
        customer,
        items: cart,
        total
      });

      setLoading(false);
      clearCart();
      alert('Order Confirmed! Thank you for choosing JJ WEAR.');
      navigate('/');
    }, 2000);

  };

  if (cart.length === 0) {
    return <div className={styles.empty}>Cart is empty</div>;
  }

  return (
    <div className={styles.checkoutPage}>
      <h1>CHECKOUT</h1>
      
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>SHIPPING DETAILS</h2>
          <form id="checkout-form" onSubmit={handlePayment}>
            <div className={styles.row}>
              <input type="text" name="firstName" placeholder="First Name" value={customer.firstName} onChange={handleInputChange} required />
              <input type="text" name="lastName" placeholder="Last Name" value={customer.lastName} onChange={handleInputChange} required />
            </div>
            <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleInputChange} required />
            <input type="text" name="address" placeholder="Address" value={customer.address} onChange={handleInputChange} required />
            <input type="text" name="city" placeholder="City" value={customer.city} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={customer.phone} onChange={handleInputChange} required />

            
            <h2 className={styles.paymentTitle}>PAYMENT METHOD</h2>
            <div className={styles.paymentTabs}>
              <button 
                type="button"
                className={paymentMethod === 'visa' ? styles.activeTab : ''}
                onClick={() => setPaymentMethod('visa')}
              >
                <CreditCard size={20} /> VISA
              </button>
              <button 
                type="button"
                className={paymentMethod === 'mtn' ? styles.activeTab : ''}
                onClick={() => setPaymentMethod('mtn')}
              >
                <Smartphone size={20} /> MTN
              </button>
              <button 
                type="button"
                className={paymentMethod === 'lumicash' ? styles.activeTab : ''}
                onClick={() => setPaymentMethod('lumicash')}
              >
                <Smartphone size={20} /> LUMICASH
              </button>
            </div>

            <div className={styles.paymentContent}>
              {paymentMethod === 'visa' && (
                <div className={styles.cardForm}>
                  <input type="text" placeholder="Card Number" required />
                  <div className={styles.row}>
                    <input type="text" placeholder="MM/YY" required />
                    <input type="text" placeholder="CVC" required />
                  </div>
                </div>
              )}
              {(paymentMethod === 'mtn' || paymentMethod === 'lumicash') && (
                <div className={styles.mobileForm}>
                  {paymentMethod === 'mtn' ? (
                    <div className={styles.ussdInfo}>
                      <p className={styles.ussdCode}>Pay on <span>*182*1*1*0796148211#</span></p>
                      <p className={styles.merchantName}>Name: <strong>NKINGI JUSTE AYMAR</strong></p>
                    </div>
                  ) : (
                    <div className={`${styles.ussdInfo} ${styles.lumicashInfo}`}>
                      <p className={styles.ussdCode}>Pay on <span>+257 62 05 08 15</span></p>
                      <p className={styles.merchantName}>Name: <strong>JUSTIN</strong></p>
                    </div>
                  )}
                  <div className={styles.uploadSection}>
                    <label htmlFor="screenshot">Upload Payment Screenshot</label>
                    <input 
                      type="file" 
                      id="screenshot" 
                      accept="image/*" 
                      required 
                      className={styles.fileInput}
                    />
                  </div>
                </div>
              )}

            </div>

            <button type="submit" className={styles.payButton} disabled={loading}>
              {loading ? 'PROCESSING...' : `CONFIRM PAYMENT & ORDER`}
            </button>

          </form>
        </div>

        <div className={styles.summarySection}>
          <h2>ORDER SUMMARY</h2>
          {cart.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} BIF</span>
            </div>
          ))}
          <div className={styles.totalRow}>
            <span>TOTAL</span>
            <span>{total.toLocaleString()} BIF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
