
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CartContainer from './components/CartContainer';
import CustomerOrders from './components/CustomerOrders';

const App: React.FC = () => {
    return (
        <Router>
            <nav id="menu">
                <ul>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<CartContainer />} />
                <Route path="/cart" element={<CartContainer />} />
                <Route path="/orders" element={<CustomerOrders />} />
            </Routes>
        </Router>
    );
};

export default App;