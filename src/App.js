import React, { useState } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App = () => {
  const [products, setProducts] = useState([
    { name: 'Digital Thermometer', stock: 150, status: 'in stock', expiry: '2024-10-07' },
    { name: 'Blood Pressure Monitor', stock: 85, status: 'in stock', expiry: '2024-12-15' },
    { name: 'Glucose Test Strips', stock: 0, status: 'out of stock', expiry: '2023-09-30' }
  ]);
  const [salesToday, setSalesToday] = useState(8250);
  const [salesHistory, setSalesHistory] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '', expiry: '' });
  const [history, setHistory] = useState([]);

  const updateStock = (index, newStock) => {
    const updatedProducts = [...products];
    const stock = parseInt(newStock);
    const date = new Date().toISOString().split('T')[0]; // Date now used here

    const previousStock = updatedProducts[index].stock;
    updatedProducts[index].stock = stock;
    updatedProducts[index].status = stock > 0 ? 'in stock' : 'out of stock';
    setProducts(updatedProducts);

    // Use previousStock to calculate the change correctly
    const change = stock - previousStock;

    setHistory(prev => [
      ...prev,
      { name: updatedProducts[index].name, date, change, stock }
    ]);
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.stock || !newProduct.expiry) return;
    const stock = parseInt(newProduct.stock);
    const status = stock > 0 ? 'in stock' : 'out of stock';
    const newItem = { ...newProduct, stock, status };
    setProducts([...products, newItem]);

    const date = new Date().toISOString().split('T')[0];
    setHistory(prev => [...prev, { name: newItem.name, date, change: stock, stock }]);

    setNewProduct({ name: '', stock: '', expiry: '' });
  };

  const submitSales = () => {
    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleDateString();
    const formattedTime = timestamp.toLocaleTimeString();
    setSalesHistory(prev => [...prev, { amount: salesToday, date: formattedDate, time: formattedTime }]);
  };

  const stockHistory = history.reduce((acc, entry) => {
    const found = acc.find(item => item.date === entry.date);
    if (!found) acc.push({ date: entry.date, stock: entry.stock });
    return acc;
  }, []);

  return (
    <div className="dashboard">
      <header>
        <div className="company-info">
          <img src="/logo.png" alt="Logo" />
          <div>
            <h1>Nano Life Science Pvt Ltd</h1>
            <p>Muthanallur Cross, Bangalore</p>
          </div>
        </div>
        <div className="admin">ADMIN</div>
      </header>

      <div className="metrics">
        <div className="metric-card customers">👥 120 Total Customers</div>
        <div className="metric-card products">📦 {products.length} Products</div>
        <div className="metric-card orders">🛒 4 Pending Orders</div>
        <div className="metric-card sales">
          ₹ <input type="number" value={salesToday} onChange={(e) => setSalesToday(e.target.value)} />
          <button onClick={submitSales}>Save</button>
        </div>
      </div>

      <div className="main-content">
        <div className="products-overview">
          <h2>Products Overview</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Expiry</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td><span className={`status ${product.status.replace(/\s/g, '-')}`}>{product.status}</span></td>
                  <td>{product.expiry}</td>
                  <td>
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => updateStock(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="add-product-form">
            <h3>Add New Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <input
              type="date"
              placeholder="Expiry"
              value={newProduct.expiry}
              onChange={(e) => setNewProduct({ ...newProduct, expiry: e.target.value })}
            />
            <button onClick={addProduct}>Add Product</button>
          </div>
        </div>

        <div className="side-content">
          <div className="sales-analytics">
            <h2>Stock Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stockHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stock" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <h3>Sales History</h3>
            <ul>
              {salesHistory.map((sale, i) => (
                <li key={i}>₹{sale.amount} on {sale.date} at {sale.time}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
