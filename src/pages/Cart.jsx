import { useCart } from '../context/CartContext.jsx';
import { Card, Button } from 'antd';

import './CartStyle/Cart.css'; 

const { Meta } = Card;

function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="empty-cart">Səbət boşdur</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Səbət</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <Card
            key={item.id}
            hoverable
            className="cart-card"
            cover={
              <img
                alt={item.title}
                src={item.images?.[0]}
                className="cart-image"
              />
            }
            actions={[
              <Button danger type="link" onClick={() => removeFromCart(item.id)} className="cart-delete-button">Sil</Button>
            ]}
          >
            <Meta title={item.title} description={`Qiymət: $${item.price}`} />
            <div className="cart-quantity-info">
              <p className='priceP'><strong>Miqdar:</strong> {item.quantity}</p>
              <p className='priceP'><strong>Ümumi:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </Card>
        ))}
      </div>

      <h4 className="cart-total-price">Ümumi Qiymət: ${totalPrice.toFixed(2)}</h4>
    </div>
  );
}

export default Cart;
