import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ThreeDViewer from '../components/ThreeDViewer';
import styles from './Product.module.css';
import { ArrowLeft, Check } from 'lucide-react';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { getProductById } = useProducts();
  const product = getProductById(id);
  const [added, setAdded] = useState(false);
  const [viewSide, setViewSide] = useState('front'); // 'front' or 'back'

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const toggleView = () => {
    setViewSide(prev => prev === 'front' ? 'back' : 'front');
  };

  return (
    <div className={styles.productPage}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowLeft size={20} /> BACK
      </button>

      <div className={styles.content}>
        <div className={styles.viewerContainer}>
           {product.id > 100 ? (
             <div className={styles.imageWrapper}>
               <img 
                 src={viewSide === 'front' ? product.image : (product.backImage || product.image)} 
                 alt={`${product.name} ${viewSide}`} 
                 className={`${styles.mainImage} ${viewSide === 'back' ? styles.flipped : ''}`} 
               />
               {product.backImage && (
                 <button onClick={toggleView} className={styles.rotateButton}>
                   ROTATE / FLIP
                 </button>
               )}
             </div>
           ) : (
             <ThreeDViewer color={product.name.includes("BLACK") ? "#111" : "#fff"} />
           )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.collection}>{product.collection} COLLECTION</p>
          <p className={styles.price}>{product.price.toLocaleString()} {product.currency}</p>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.actions}>
            <button 
              className={`${styles.addButton} ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? <><Check size={20} /> ADDED</> : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
