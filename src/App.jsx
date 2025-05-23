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
import SearchResults from './pages/SearchResults.jsx';
import ProductList from './pages/admin/products/ProductList.jsx';
import AddProduct from './pages/admin/add-product/AddProduct.jsx';

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


          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchResults />
              </PrivateRoute>
            }
          />

          <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
          />

          <Route
                path="/admin/add-product"
                element={
                  <PrivateRoute>
                    <AddProduct />
                  </PrivateRoute>
                }
          />


        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
