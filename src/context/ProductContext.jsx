import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../utils/mockData';
import { fetchShopifyProducts } from '../utils/shopify';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    const loadShopifyData = async () => {
      const shopifyData = await fetchShopifyProducts();
      if (shopifyData) {
        setProducts(shopifyData);
      }
    };
    loadShopifyData();
  }, []);


  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id) || product.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};
