import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Form, Input, Button, List, Card } from 'antd';
import styles from './CheckoutStyle/Checkout.module.css';

const { Meta } = Card;

function Checkout() {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
  });

  const product = location.state?.product;
  const items = product ? [product] : cart;

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Sifariş:', { items, formData, total });
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className={styles.container}>
      <h2>Sifariş</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item style={{display:'flex'}}>
            <Card
              className={styles.card}
              cover={<img alt={item.title} src={item.images[0] || 'https://via.placeholder.com/150'} className={styles.image} />}
            >
              <Meta
                title={item.title}
                description={
                  <>
                    <p>Qiymət: ${item.price}</p>
                    <p>Miqdar: {item.quantity || 1}</p>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      <p className={styles.total}><strong>Ümumi: ${total}</strong></p>
      <Form className={styles.form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Kart nömrəsi" name="cardNumber" rules={[{ required: true, len: 16 }]}>
          <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Son istifadə tarixi (MM/YY)" name="expiry" rules={[{ required: true }]}>
          <Input name="expiry" value={formData.expiry} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="CVV" name="cvv" rules={[{ required: true, len: 3 }]}>
          <Input name="cvv" value={formData.cvv} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Ünvan" name="address" rules={[{ required: true }]}>
          <Input name="address" value={formData.address} onChange={handleInputChange} />
        </Form.Item>
        <Button className={styles.submitButton} type="primary" htmlType="submit">
          Sifarişi tamamla
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;