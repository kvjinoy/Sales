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
        customerOrder.orderItems.map((orderItem) => (
            total = total + (orderItem.price * orderItem.quantity)
        ));
        return total;
    };

    return (
        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="card">
            <div className="card-header">
                <h3 className="h3">Customer Orders</h3>
            </div>
            <div className="card-body">
            {orders.map((order, index) => (
                customerOrder(index, order)
            ))}
            </div>
            <div className="card-footer">
                <h3>Grand Total: ${getSalesTotal(orders)}</h3>
            </div>
            </div>
        </div>
    );

    function customerOrder(index: number, order: CustomerOrder) {
        return <div key={index} className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <p className="fw-bold">Order Number: {order.orderId}</p>
            <p className="fw-semibold">Name: {order.customer.firstName + ' ' + order.customer.lastName}</p>
            <p>Email: {order.customer.email}</p>
            <p>Phone: {order.customer.phone}</p>
            {orderDetails(order)}
            <hr />
        </div>;
    }

    function orderDetails(order: CustomerOrder) {
        return <table className="table table-striped table-bordered">
            <thead>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </thead>
            <tbody>
                {order.orderItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td><td>${item.price}</td><td>{item.quantity}</td><td> ${item.price * item.quantity}</td>
                    </tr>
                ))}
                <tr className="table-group-divider"><td colSpan={3}><p className="fw-bold">Total:</p></td><td><p className="fw-bold">${getCustomerOrderTotal(order)}</p></td></tr>
            </tbody>
        </table>;
    }
};

export default CustomerOrders;


