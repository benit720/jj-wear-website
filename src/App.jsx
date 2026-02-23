import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { SalesProvider } from './context/SalesContext';

function App() {
  return (
    <SalesProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="collections" element={<Collections />} />
                  <Route path="product/:id" element={<Product />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="login" element={<Login />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="shipping" element={<Shipping />} />
                </Route>
              </Routes>
            </Router>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </SalesProvider>
  );
}

export default App;
