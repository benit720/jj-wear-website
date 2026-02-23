/**
 * Simulated notification service for JJ WEAR
 */
export const sendOrderNotification = async (orderData) => {
  // In a real app, this would be an API call to a backend or a service like EmailJS
  console.log('%c[ORDER NOTIFICATION]', 'color: #00ff00; font-weight: bold;');
  console.log(`To: kingjusteaymar@gmail.com`);
  console.log(`Subject: New Order Received - #${orderData.id}`);
  console.log('Customer Details:', orderData.customer);
  console.log('Items:', orderData.items);
  console.log('Total:', orderData.total, 'BIF');
  
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Notification successfully sent to kingjusteaymar@gmail.com');
      resolve({ success: true });
    }, 1000);
  });
};
