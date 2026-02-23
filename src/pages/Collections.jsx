import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import styles from './Collections.module.css';

const Collections = () => {
  const { products } = useProducts();

  return (
    <div className={styles.collections}>
      <header className={styles.header}>
        <h1>ALL COLLECTIONS</h1>
        <p>WEAR YOUR ESSENCE</p>
      </header>
      
      <div className={styles.grid}>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={product.image} alt={product.name} />
              <div className={styles.overlay}>VIEW 3D</div>
            </div>
            <div className={styles.info}>
              <h3>{product.name}</h3>
              <p>{parseInt(product.price).toLocaleString()} {product.currency}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
