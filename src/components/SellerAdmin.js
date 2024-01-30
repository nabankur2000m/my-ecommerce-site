import React, { useState, useEffect } from 'react';
import './SellerAdmin.css';

const SellerAdmin = () => {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [products, setProducts] = useState({});
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    const savedTotalSum = parseFloat(localStorage.getItem('totalSum'));

    if (savedProducts) {
      setProducts(savedProducts);
    }

    if (!isNaN(savedTotalSum)) {
      setTotalSum(savedTotalSum);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('totalSum', totalSum.toString());
  }, [products, totalSum]);

  const handleAddProduct = () => {
    if (productID && productName && sellingPrice) {
      const newProduct = {
        id: productID,
        name: productName,
        price: parseFloat(sellingPrice),
      };
      const updatedProducts = { ...products, [productID]: newProduct };
      setProducts(updatedProducts);
      setTotalSum(totalSum + parseFloat(sellingPrice));
      setProductID('');
      setProductName('');
      setSellingPrice('');
    }
  };

  const handleDeleteProduct = (productId) => {
    const deletedProduct = products[productId];
    if (deletedProduct) {
      const updatedTotalSum = totalSum - deletedProduct.price;
      setTotalSum(updatedTotalSum);
      const updatedProducts = { ...products };
      delete updatedProducts[productId];
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      <h1>Seller's Admin Page</h1>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
        />
      </div>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label>Selling Price:</label>
        <input
          type="text"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
      <div>
        <h2>Added Products</h2>
        <ul>
          {Object.keys(products).map((productId) => (
            <li key={productId}>
              Product ID: {productId}, Name: {products[productId].name}, Price: ₹{products[productId].price.toFixed(2)}
              <button onClick={() => handleDeleteProduct(productId)}>Delete</button>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: '20px' }}>Total Sum: ₹{totalSum.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SellerAdmin;
