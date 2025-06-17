import { useCart } from '../context/CartContext.jsx';
import { Card, Button } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { LeftOutlined, WalletOutlined} from '@ant-design/icons';
import './CartStyle/Cart.css';

const { Meta } = Card;

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
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
          icon={<LeftOutlined />}
          onClick={() => navigate('/products')}
        />
      </div>

      <h2 className="cart-title">Səbət</h2>
      <br />
       <h4 className="cart-total-price">Ümumi Qiymət: ${totalPrice.toFixed(2)}</h4>

       <div  className='BuyBtn'>

        <Button
          type="primary"
          icon={<WalletOutlined/>}
          onClick={() => navigate('/checkout')}
        >
          Əldə et
        </Button>

       </div>


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
                <strong>Miqdar:</strong>
                    <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                    <Button onClick={() => increaseQuantity(item.id)}>+</Button>
              </p>
              <p className="priceP">
                <strong>Ümumi:</strong> ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>

     
    </div>
  );
}

export default Cart;
