import  { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log('Xəta:', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((p) => p.id !== id));
          message.success('Məhsul silindi');
        } else {
          message.error('Silmə zamanı xəta oldu');
        }
      })
      .catch(() => message.error('Server xətası'));
  };

  const columns = [
    {
      title: 'Şəkil',
      dataIndex: 'images',
      render: (images) => <img src={images[0]} alt="img" width="50" />,
    },
    {
      title: 'Ad',
      dataIndex: 'title',
    },
    {
      title: 'Qiymət',
      dataIndex: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Əməliyyatlar',
      render: (_, record) => (
        <>
          <Link to={`/admin/EditProduct/${record.id}`}>
            <Button type="link">Redaktə et</Button>
          </Link>
          <Popconfirm
            title="Silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">Sil</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2>Məhsullar Siyahısı</h2>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </div>
  );
}

export default ProductList;
