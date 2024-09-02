import React, { useState } from 'react';
import { SelectedProducts } from '../types/SelectedProducts';
import { Customer } from '../types/Customer';
import { Order } from '../types/Order';
import { submitOrder } from '../services/API';
import CustomerInfo from './CustomerInfo';

interface OrderSubmissionProps {
    selectedProducts: SelectedProducts;
}

const OrderSubmission: React.FC<OrderSubmissionProps> = ({ selectedProducts }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [order, setOrder] = useState<Order>({
        id: 0,
        customerId: 0,
        date: new Date()
    });

    const handleOrderSubmit = async (customer: Customer) => {

        setLoading(true);

        try {

            const orderResponse = await submitOrder(selectedProducts, customer);
            setOrder(orderResponse);
            setLoading(false);
            setOrderSuccess(true);
        } catch (error) {
            window.console.log(error)
            setError(null);
            setLoading(false);
        }
    };

    const getOrderTotal = () => {
        const discount = 0;
        let total = 0;
        Object.values(selectedProducts).map(({ product, quantity }) => (
            total = total + (product.price * quantity)
        ));
        return total - discount;
    };

    if (loading) {
        return <div className="spinner-border" role="status">   <span className="visually-hidden">Loading...</span> Submitting...</div>;
    }

    if (error) {
        return <div> <p className="text-danger"> Error: {error}</p></div>;
    }

    if (orderSuccess) {
        return <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            {orderedItems()}
            <p className="text-success-emphasis">
                Order submitted successfully!
                <span className="badge text-bg-primary rounded-pill">Your Order Number: {order.id}</span>
            </p>
        </div>;
    }


    return (

        <>
            {orderedItems()}
            <CustomerInfo handleOrderSubmit={handleOrderSubmit} />
        </>
    );

    function orderedItems() {
        return <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <h2 className="h2">Your Items</h2>
            <ul className="list-group">
                {Object.values(selectedProducts).map(({ product, quantity }) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={product.id}>
                        {product.name} - {product.type}
                        <span className="badge text-bg-primary rounded-pill">  ${product.price} x {quantity}</span>
                    </li>
                ))}
            </ul>
            <h4 className="h3">Order Total: ${getOrderTotal()} </h4>
        </div>;
    }

};

export default OrderSubmission;