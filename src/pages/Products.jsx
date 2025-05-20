import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Card } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

import './ProductsStyle/Products.css';  // CSS faylını import et

const { Meta } = Card;

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // KATEQORİYALAR
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then((res) => res.json())
      .then((data) => setCategories(['all', ...data]))
      .catch((err) => console.log('Kateqoriya xətası:', err));
  }, []);

  // MƏHSULLAR
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        if (selectedCategory === 'all') {
          setProducts(data);
        } else {
          const filtered = data.filter((p) => p.category?.id === selectedCategory.id);
          setProducts(filtered);
        }
      })
      .catch((err) => console.log('Məhsul xətası:', err));
  }, [selectedCategory]);

  // MENÜ ÜÇÜN KATEQORİYA ITEMLƏRİ
  const menuItems = [
    {
      key: 'categories',
      icon: <AppstoreOutlined />,
      label: 'Kateqoriyalar',
      children: categories.map((cat) => ({
        key: cat === 'all' ? 'all' : cat.id?.toString(),
        label: cat === 'all' ? 'Hamısı' : cat.name,
      })),
    },
  ];

  // MENÜDƏ KATEQORİYA SEÇİLDİKDƏ
  const handleMenuClick = (e) => {
    const selected = e.key === 'all'
      ? 'all'
      : categories.find((cat) => cat !== 'all' && cat.id?.toString() === e.key);
    setSelectedCategory(selected);
  };

  return (
    <div className="products-container">
      {/* KATEQORİYA MENÜSÜ */}
      <Menu mode="horizontal" onClick={handleMenuClick} items={menuItems} />

      {/* MƏHSUL KARTLARI */}
      <div className="products-cards">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-link">
            <Card
              hoverable
              className="product-card"
              cover={
                <img
                  alt={product.title}
                  src={product.images[0]}
                  className="product-image"
                />
              }
            >
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price"><strong>Qiymət:</strong> ${product.price}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-category"><em>Kateqoriya:</em> {product.category?.name}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
