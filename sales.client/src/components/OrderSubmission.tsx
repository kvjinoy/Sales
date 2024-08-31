import React, { useState } from 'react';
import { SelectedProducts } from '../types/SelectedProducts';
import { Customer } from '../types/Customer';
import { submitOrder } from '../services/API';

interface OrderSubmissionProps {
    selectedProducts: SelectedProducts;
}

const OrderSubmission: React.FC<OrderSubmissionProps> = ({ selectedProducts }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [customer, setCustomer] = useState<Customer>({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {

            submitOrder(selectedProducts, customer);
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            window.console.log(error)
            setError(null);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Submitting...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (success) {
        return <div>Order submitted successfully!</div>;
    }

    return (

        <>
            <div>
                <h2>Selected Items</h2>
                <ul>
                    {Object.values(selectedProducts).map(({ product, quantity }) => (
                        <li key={product.id}>{product.name} - ${product.price} x {quantity}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Enter customer details</h2>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">
                        First Name:
                        <input className="form-input" type="text" name="firstName" value={customer.firstName} onChange={handleInputChange} required />
                    </label>
                    <label className="form-label">
                        Last Name:
                        <input className="form-input"  type="text" name="lastName" value={customer.lastName} onChange={handleInputChange} required />
                    </label>
                    <label className="form-label">
                        Email:
                        <input className="form-input"  type="email" name="email" value={customer.email} onChange={handleInputChange} required />
                    </label>
                    <label className="form-label">
                        Phone:
                        <input className="form-input"  type="text" name="phone" value={customer.phone} onChange={handleInputChange} required />
                    </label>
                    <button type="submit">Submit Order</button>
                </form>
            </div>
        </>
    );
};

export default OrderSubmission;