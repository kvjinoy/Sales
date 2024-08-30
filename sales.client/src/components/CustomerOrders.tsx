import React, { useEffect, useState } from 'react';
import { CustomerOrder } from '../types/CustomerOrder';
import { fetchCustomerOrders } from '../services/API';

const CustomerOrders: React.FC = () => {
    const [orders, setOrders] = useState<CustomerOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCustomerOrders();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                window.console.log(error)
                setError(null);
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Customer Orders</h1>
            {orders.map((order, index) => (
                <div key={index}>
                    <h2>Customer: {order.customer.firstName + ' ' + order.customer.lastName}</h2>
                    <p>Email: {order.customer.email}</p>
                    <p>Phone: {order.customer.phone}</p>
                    <h3>Ordered Products:</h3>
                    <ul>
                        {order.orderItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CustomerOrders;