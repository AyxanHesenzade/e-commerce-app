// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./LoginStyle/Login.css"; 
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Burada istəsən API ilə yoxlama da əlavə edə bilərsən
    login({
      name: formData.username,
      email: formData.email
    });

    setTimeout(() => {
      setLoading(false);
      navigate("/products");
    }, 1000);
  };

  return (
    <div className="login-container">
       <h2>Welcome E-Commerce App</h2>
      <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="username-input"
          />
        </div>

        <div className="email-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="email-input"
          />
        </div>

        <Button
            type="primary"
            icon={<PoweroffOutlined />}
            disabled={loading}
            htmlType="submit" 
            className="login-button"
          >
            {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      </div>
    </div>
  );
};

export default Login;
