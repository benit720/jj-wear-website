import React, { createContext, useContext, useState, useEffect } from 'react';

const SalesContext = createContext();

export const useSales = () => useContext(SalesContext);

export const SalesProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    // Initialize with some mock history for the dashboard
    const saved = localStorage.getItem('jj_wear_orders');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: 'mock-1',
        date: '2026-01-15T10:00:00Z',
        items: [{ id: 1, name: 'ORIGIN BLACK', quantity: 2, price: 35000, costPrice: 20000 }],
        total: 70000,
        totalCost: 40000,
        profit: 30000,
        isPrivate: false
      },
      {
        id: 'mock-2',
        date: '2026-01-20T14:30:00Z',
        items: [{ id: 3, name: 'CULTURE SHOCK', quantity: 1, price: 45000, costPrice: 25000 }],
        total: 45000,
        totalCost: 25000,
        profit: 20000,
        isPrivate: true
      },
      {
        id: 'mock-3',
        date: '2026-02-05T09:15:00Z',
        items: [{ id: 2, name: 'ORIGIN WHITE', quantity: 3, price: 35000, costPrice: 20000 }],
        total: 105000,
        totalCost: 60000,
        profit: 45000,
        isPrivate: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jj_wear_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items, isPrivate = false) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCost = items.reduce((sum, item) => sum + (item.costPrice * item.quantity), 0);
    const profit = total - totalCost;

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items,
      total,
      totalCost,
      profit,
      isPrivate
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  const getMonthlyStats = () => {
    const stats = {};
    orders.forEach(order => {
      const month = new Date(order.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!stats[month]) {
        stats[month] = { revenue: 0, cost: 0, profit: 0, privateSales: 0, webSales: 0, itemsSold: 0 };
      }
      stats[month].revenue += order.total;
      stats[month].cost += order.totalCost;
      stats[month].profit += order.profit;
      stats[month].itemsSold += order.items.reduce((s, i) => s + i.quantity, 0);
      if (order.isPrivate) {
        stats[month].privateSales += 1;
      } else {
        stats[month].webSales += 1;
      }
    });
    return stats;
  };

  return (
    <SalesContext.Provider value={{ orders, addOrder, getMonthlyStats }}>
      {children}
    </SalesContext.Provider>
  );
};
