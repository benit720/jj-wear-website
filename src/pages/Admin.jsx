import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import AdminSales from './AdminSales';
import styles from './Admin.module.css';

const Admin = () => {
  const { user } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();
  const [collectionName, setCollectionName] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');


  if (!user || !user.isAdmin) {
    return <div className={styles.denied}>Access Denied. Admins only.</div>;
  }

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') setImage(reader.result);
        if (type === 'back') setBackImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(),
      name: productName.toUpperCase(),
      price: parseInt(price),
      costPrice: parseInt(costPrice) || Math.floor(parseInt(price) * 0.6),
      currency: 'BIF',

      image: image || 'https://via.placeholder.com/400x400/000000/FFFFFF?text=NO+IMAGE',
      backImage: backImage || null,
      description: description,
      collection: collectionName.toUpperCase()
    };

    addProduct(newProduct);
    alert(`Product "${productName}" added to "${collectionName}" collection!`);
    
    // Reset form
    setCollectionName('');
    setProductName('');
    setPrice('');
    setCostPrice('');
    setDescription('');
    setImage(null);
    setBackImage(null);
  };


  return (
    <div className={styles.adminPage}>
      <h1>ADMIN DASHBOARD</h1>
      <div className={styles.adminStats}>
        <p>Welcome back, {user.name}</p>
        <div className={styles.tabs}>
          <button 
            className={activeTab === 'inventory' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('inventory')}
          >
            INVENTORY
          </button>
          <button 
            className={activeTab === 'sales' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('sales')}
          >
            SALES & ANALYTICS
          </button>
        </div>
      </div>

      {activeTab === 'sales' ? (
        <AdminSales />
      ) : (
        <div className={styles.container}>

        <div className={styles.uploadSection}>
          <h2>UPLOAD NEW DESIGN</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Collection Name</label>
              <input 
                type="text" 
                value={collectionName} 
                onChange={(e) => setCollectionName(e.target.value)} 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input 
                type="text" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Price (BIF)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Cost Price (BIF) - For Analytics</label>
              <input 
                type="number" 
                value={costPrice} 
                onChange={(e) => setCostPrice(e.target.value)} 
                placeholder="e.g. 20000"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                className={styles.textarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Front Design / Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'front')} 
                className={styles.fileInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Back Design / Image (Optional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'back')} 
                className={styles.fileInput}
              />
            </div>

            <button type="submit" className={styles.uploadButton}>UPLOAD TO STORE</button>
          </form>
        </div>

        <div className={styles.listSection}>
          <h2>CURRENT INVENTORY</h2>
          <div className={styles.productList}>
            {products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <img src={product.image} alt={product.name} className={styles.productThumb} />
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p>{product.collection}</p>
                  <p>{parseInt(product.price).toLocaleString()} {product.currency}</p>
                </div>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className={styles.deleteButton}
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>



  );
};

export default Admin;
