import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Card, Button } from 'antd';
import './ProductDetail.module.css/ProductDetail.css';  

const { Meta } = Card;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log("Xəta Baş Verdi :", err));
  }, [id]);

  if (!product) return <p>Yüklənir...</p>;

  return (
    <div className="productDetailContainer">
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
          <Button type="primary" onClick={() => addToCart(product)}>
            Səbətə əlavə et
          </Button>,
        ]}
      >
        <Meta
          title={product.title}
          description={
            <div className="productDescription">
              <p>{product.description}</p>
              <p><strong>Qiymət:</strong> ${product.price}</p>
              <p><em>Kateqoriya:</em> {product.category?.name}</p>
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default ProductDetail;
