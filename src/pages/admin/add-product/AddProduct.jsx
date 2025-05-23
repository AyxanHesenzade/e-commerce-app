import { useState, useEffect } from 'react';
import "./AddProductStyle.css"

function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const [categories, setCategories] = useState([]); // Kateqoriyalar üçün state

  // Kateqoriyaları API-dən çək
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Kateqoriyalar yüklənmədi:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
      images: [imageUrl],
      description,
    };

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setMessage('Məhsul uğurla əlavə edildi!');
        setTitle('');
        setPrice('');
        setCategoryId('');
        setImageUrl('');
        setDescription('');
      } else {
        setMessage('Xəta baş verdi, məhsul əlavə oluna bilmədi!');
      }
    } catch (error) {
      setMessage('Serverlə əlaqə zamanı xəta baş verdi!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Məhsul əlavə et</h2>

      <form onSubmit={handleSubmit} className="add-product-form">
        <label className="form-label">
          Məhsulun adı:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Qiymət:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="form-input"
          />
        </label>

        <label className="form-label">
          Kateqoriya:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Kateqoriya seçin</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Şəkil URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Təsvir:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          />
        </label>

        <button type="submit" className="submit-button">Əlavə et</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;
