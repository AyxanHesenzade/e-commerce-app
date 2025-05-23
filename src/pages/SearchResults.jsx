import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext.jsx';
import "./SearchResultsStyle/SearchStyle.css";

const { Meta } = Card;

function SearchResults() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
      })
      .catch((err) => console.log('Axtarış xətası:', err));
  }, [location.search]);

  return (
    <div className="search-container">
      {query.trim() ? (
        <h2>"{query}" üçün nəticələr:</h2>
      ) : (
        <h2>Axtarış sorğusu daxil edilməyib.</h2>
      )}

      <div className="products-cards">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              hoverable
              className="product-card"
              cover={
                <Link to={`/products/${product.id}`}>
                  <img
                    alt={product.title}
                    src={product.images[0]}
                    className="product-image"
                  />
                </Link>
              }
              actions={[
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => addToCart(product)}
                >
                  Add
                </Button>
              ]}
            >
              <Meta
                title={
                  <Link to={`/products/${product.id}`} className="product-title">
                    {product.title}
                  </Link>
                }
                description={
                  <>
                    <p><strong>Qiymət:</strong> ${product.price}</p>
                    <p><em>Kateqoriya:</em> {product.category?.name}</p>
                  </>
                }
              />
            </Card>
          ))
        ) : (
          query.trim() && <p>Heç bir məhsul tapılmadı.</p>
        )}
        
      </div>
    </div>
  );
}

export default SearchResults;
