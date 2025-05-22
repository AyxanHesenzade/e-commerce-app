import { useCart } from '../context/CartContext.jsx';
import { Card, Button } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons';
import './CartStyle/Cart.css';

const { Meta } = Card;

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="empty-cart">Səbət boşdur</p>;
  }

  return (
    <div className="cart-container">
      <div className="btn-div">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={() => navigate('/products')}
        />
      </div>

      <h2 className="cart-title">Səbət</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <Card
            key={item.id}
            hoverable
            className="cart-card"
            cover={
              <Link to={`/products/${item.id}`}>
                <img
                  alt={item.title}
                  src={item.images?.[0]}
                  className="cart-image"
                />
              </Link>
            }
            actions={[
              <Button
                danger
                type="link"
                onClick={() => removeFromCart(item.id)}
                className="cart-delete-button"
              >
                Sil
              </Button>
            ]}
          >
            <Meta
              title={
                <Link to={`/products/${item.id}`} className="cart-product-title">
                  {item.title}
                </Link>
              }
              description={`Qiymət: $${item.price}`}
            />
            <div className="cart-quantity-info">
              <p className="priceP">
                <strong>Miqdar:</strong> {item.quantity}
              </p>
              <p className="priceP">
                <strong>Ümumi:</strong> ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <h4 className="cart-total-price">Ümumi Qiymət: ${totalPrice.toFixed(2)}</h4>
    </div>
  );
}

export default Cart;
