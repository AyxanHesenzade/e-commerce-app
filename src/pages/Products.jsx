import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Card, Button } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext.jsx';

import styles from './ProductsStyle/Products.module.css';

const { Meta } = Card;

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart(); 
  const [sortOption, setSortOption] = useState();

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then((res) => res.json())
      .then((data) => setCategories(['all', ...data]))
      .catch((err) => console.log('Kateqoriya xətası:', err));
  }, []);

  useEffect(() => {
    let sorted = [...products];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'date-newest') {
      sorted.sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt));
    } else if (sortOption === 'date-oldest') {
      sorted.sort((a, b) => new Date(a.creationAt) - new Date(b.creationAt));
    }
    setProducts(sorted);
  }, [sortOption]);

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

  const handleMenuClick = (e) => {
    const selected =
      e.key === 'all'
        ? 'all'
        : categories.find((cat) => cat !== 'all' && cat.id?.toString() === e.key);
    setSelectedCategory(selected);
  };

  return (
    <div className={styles.productsContainer}>
      <div>
        <Menu mode="horizontal" onClick={handleMenuClick} items={menuItems} />
        <div className={styles.sortOption}>
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sırala</option>
            <option value="price-asc">Əvvəlcə ucuz</option>
            <option value="price-desc">Əvvəlcə bahalı</option>
            <option value="date-newest">Ən yeni</option>
            <option value="date-oldest">Ən köhnə</option>
          </select>
        </div>
      </div>

      <div className={styles.productsCards}>
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            className={styles.productCard}
            cover={
              <Link to={`/products/${product.id}`} className={styles.productLink}>
                <img
                  alt={product.title}
                  src={product.images[0]}
                  className={styles.productImage}
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
              </Button>,
            ]}
          >
            <Meta
              title={product.title}
              description={
                <>
                  <p className={styles.priceP}><strong>Qiymət:</strong> ${product.price}</p>
                  <p><em>Kateqoriya:</em> {product.category?.name}</p>
                </>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
