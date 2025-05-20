import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { UnorderedListOutlined , ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const [current, setCurrent] = useState('products');
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  // Dinamik menyu elementləri - cart sayı və user adı göstərmək üçün
  const items = [
    {
      label: 'Məhsullar',
      key: 'products',
      icon: <UnorderedListOutlined />,
    },
    {
      label: `Səbət (${cart.length})`,
      key: 'cart',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: 'Parametrlər',
      key: 'settings',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'İstifadəçi',
          children: user
            ? [
                { label: `Profil (${user.name})`, key: 'profile' },
                { label: 'Çıxış', key: 'logout' },
              ]
            : [],
        },
      ],
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'products':
        navigate('/');
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        logout();
        navigate('/login');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // İstəyə görə: istifadəçi login olduqda aktiv menyu "products" olacaq
    if (!user) setCurrent('products');
  }, [user]);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default Header;
