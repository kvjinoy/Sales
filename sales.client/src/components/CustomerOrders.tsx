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

    const getSalesTotal = (customerOrders: CustomerOrder[]) => {
        let total = 0;
        customerOrders.map((customerOrder) => (
            total = total + getCustomerOrderTotal(customerOrder)
        ));
        return total;
    };

    const getCustomerOrderTotal = (customerOrder: CustomerOrder) => {
        let total = 0;
        customerOrder.orderItems.map(( orderItem ) => (
            total = total + (orderItem.price * orderItem.quantity)
        ));
        return total;
    };

    return (
        <div>
            <h1>Customer Orders</h1>
            {orders.map((order, index) => (
                customerOrder(index, order)
            ))}
            <h3>Total: {getSalesTotal(orders)}</h3>
        </div>
    );

    function customerOrder(index: number, order: CustomerOrder) {
        return <div key={index}>
            <p>Order Number: {order.orderId}</p>
            <h2>Customer: {order.customer.firstName + ' ' + order.customer.lastName}</h2>
            <p>Email: {order.customer.email}</p>
            <p>Phone: {order.customer.phone}</p>
            <h3>Ordered Products:</h3>
            {orderDetails(order)}
            <p>Total: {getCustomerOrderTotal(order)}</p>
            <hr />
        </div>;
    }

    function orderDetails(order: CustomerOrder) {
        return <table>
            {order.orderItems.map((item, index) => (
                <tr key={index}>
                    {item.name} - ${item.price * item.quantity}
                </tr>
            ))}
        </table>;
    }
};

export default CustomerOrders;


