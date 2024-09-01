
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CartContainer from './components/CartContainer';
import CustomerOrders from './components/CustomerOrders';

const App: React.FC = () => {
    return (
        <Router>
            <nav id="menu" className="navbar bg-primary fixed-top bg-body-tertiary" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <ul className="nav nav-underline">
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link" >Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/orders" className="nav-link">Orders</Link>
                        </li>
                    </ul>
                </div>
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