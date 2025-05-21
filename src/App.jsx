import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Navbar from './components/Header.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {!shouldHideNavbar && <Navbar />}

        <Routes>
          {/* Giriş səhifəsi */}
          <Route path="/login" element={<Login />} />

          {/* Əsas səhifə */}
          <Route path="/" element={<Navigate to="/products" />} />

          {/* Məhsullar */}
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }

            
          />

          {/* Məhsul detalları */}
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />

          {/* Səbət */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
 
          />

        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
