import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Card, Button, List } from 'antd';
import './ProductDetail.module.css/ProductDetail.css';  
import {  ShoppingCartOutlined, LeftOutlined } from '@ant-design/icons';



const { Meta } = Card;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([])


  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log("Xəta Baş Verdi :", err));
  }, [id]);


useEffect(() => {
  if (product && product.category?.id) {
    fetch(`https://api.escuelajs.co/api/v1/categories/${product.category.id}/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.id !== Number(id)).slice(0, 5);
        setRecommendedProducts(filtered);
      })
      .catch((err) => console.log("Xəta:", err));
  }
}, [product, id]);


  if (!product) return <p>Yüklənir...</p>;

  return (
    <div className="productDetailContainer">
      <div  className='btn-div'>
        <Button
          type="primary"
          icon={<LeftOutlined />}
          onClick={() => navigate('/products')}
        />
      </div>

      <Card
        hoverable
        className="productCard"
        cover={
          <img
            alt={product.title}
            src={product.images?.[0]}
            className="productImage"
          />
        }
        actions={[
          <Button type="primary" icon={<ShoppingCartOutlined />} onClick={() => addToCart(product)}>
            Add
          </Button>,
        ]}
      >
        <Meta
          title={product.title}
          description={
            <div className="productDescription">
              <p>{product.description}</p>
              <p  className='priceP'><strong>Qiymət:</strong> ${product.price}</p>
              <p><em>Kateqoriya:</em> {product.category?.name}</p>
            </div>
          }
        />
      </Card>

      <div className="recommended-section">

        <h2>Bunlarda marağınızı çəkə bilər</h2>

        <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={recommendedProducts}
        renderItem={(item) => (
          <List.Item>
            <Card
            hoverable
            cover={<img alt={item.title} src={item.images[0] || 'https://via.placeholder.com/150'} />}
            onClick={() => navigate(`/products/${item.id}`)}
            >
              <Meta title={item.title} description={`$${item.price}`} />
          
            </Card>
          </List.Item>
        )}
         
        />


      </div>
    </div>
  );
}

export default ProductDetail;
