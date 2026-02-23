import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ThreeDViewer from '../components/ThreeDViewer';
import { useProducts } from '../context/ProductContext';
import styles from './Home.module.css';

const Home = () => {
  const { products } = useProducts();

  // Select a few products to showcase - ideally one from each collection
  const showcaseProducts = useMemo(() => {
    const selected = [];
    const collections = new Set();
    
    // Shuffle or just pick first from each unique collection
    products.forEach(product => {
      if (!collections.has(product.collection)) {
        selected.push(product);
        collections.add(product.collection);
      }
    });

    // If we have few collections, just take the first 4 products
    if (selected.length < 2) {
      return products.slice(0, 4);
    }
    
    return selected;
  }, [products]);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>JJ WEAR</h1>
          <p className={styles.subtitle}>DEFINING BURUNDIAN STREETWEAR</p>
          <Link to="/collections" className={styles.ctaButton}>
            EXPLORE COLLECTION
          </Link>
        </div>
        <div className={styles.heroVisual}>
          <ThreeDViewer products={showcaseProducts} />
        </div>
      </section>
      
      <section className={styles.aboutPreview}>
        <h2>CRAFTED BY JUSTE & JUSTIN</h2>
        <p>Experience the fusion of modern aesthetics and cultural depth.</p>
      </section>
    </div>
  );
};

export default Home;

