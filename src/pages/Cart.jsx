import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import styles from './Cart.module.css';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>YOUR CART IS EMPTY</h2>
        <Link to="/collections" className={styles.continueLink}>CONTINUE SHOPPING</Link>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1>SHOPPING CART</h1>
      
      <div className={styles.cartContent}>
        <div className={styles.items}>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.itemInfo}>
                <Link to={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                <p className={styles.itemPrice}>{item.price.toLocaleString()} {item.currency}</p>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        
        <div className={styles.summary}>
          <h2>ORDER SUMMARY</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{total.toLocaleString()} BIF</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>{total.toLocaleString()} BIF</span>
          </div>
          
          <Link to="/checkout" className={styles.checkoutButton}>
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
