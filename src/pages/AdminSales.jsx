import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { useProducts } from '../context/ProductContext';
import styles from './AdminSales.module.css';
import { TrendingUp, TrendingDown, Package, DollarSign, Plus } from 'lucide-react';

const AdminSales = () => {
  const { orders, addOrder, getMonthlyStats } = useSales();
  const { products } = useProducts();
  const [showPrivateForm, setShowPrivateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const stats = getMonthlyStats();
  const months = Object.keys(stats).reverse();

  const handlePrivateSale = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;

    addOrder([{ ...product, quantity }], true); // isPrivate = true
    setShowPrivateForm(false);
    setSelectedProduct('');
    setQuantity(1);
    alert('Private sale recorded successfully!');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>SALES ANALYTICS</h2>
        <button 
          className={styles.addBtn} 
          onClick={() => setShowPrivateForm(!showPrivateForm)}
        >
          <Plus size={18} /> {showPrivateForm ? 'CLOSE' : 'RECORD PRIVATE SALE'}
        </button>
      </header>

      {showPrivateForm && (
        <form className={styles.privateForm} onSubmit={handlePrivateSale}>
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Select T-Shirt</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.price.toLocaleString()} BIF)</option>
            ))}
          </select>
          <input 
            type="number" 
            min="1" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
          <button type="submit">RECORD SALE</button>
        </form>
      )}

      <div className={styles.statsCards}>
        {months.length > 0 && (
          <>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <DollarSign size={20} color="#888" />
                <span>MONTHLY REVENUE</span>
              </div>
              <h3>{stats[months[0]].revenue.toLocaleString()} BIF</h3>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <TrendingUp size={20} color="#4CAF50" />
                <span>MONTHLY PROFIT</span>
              </div>
              <h3 style={{ color: '#4CAF50' }}>{stats[months[0]].profit.toLocaleString()} BIF</h3>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Package size={20} color="#888" />
                <span>ITEMS SOLD</span>
              </div>
              <h3>{stats[months[0]].itemsSold}</h3>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <TrendingUp size={20} color="#2196F3" />
                <span>SPLIT (WEB/PVT)</span>
              </div>
              <h3>{stats[months[0]].webSales} / {stats[months[0]].privateSales}</h3>
            </div>
          </>
        )}
      </div>

      <div className={styles.historySection}>
        <h3>MONTHLY BREAKDOWN</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Cost</th>
              <th>Profit</th>
              <th>Items</th>
              <th>Web/Pvt</th>
            </tr>
          </thead>
          <tbody>
            {months.map(month => (
              <tr key={month}>
                <td>{month}</td>
                <td>{stats[month].revenue.toLocaleString()} BIF</td>
                <td>{stats[month].cost.toLocaleString()} BIF</td>
                <td style={{ color: stats[month].profit >= 0 ? '#4CAF50' : '#FF5252' }}>
                  {stats[month].profit.toLocaleString()} BIF
                  {stats[month].profit >= 0 ? <TrendingUp size={14} style={{marginLeft: 5}} /> : <TrendingDown size={14} style={{marginLeft: 5}} />}
                </td>
                <td>{stats[month].itemsSold}</td>
                <td>{stats[month].webSales} / {stats[month].privateSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSales;
