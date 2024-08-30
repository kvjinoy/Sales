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
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" name="firstName" value={customer.firstName} onChange={handleInputChange} required />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={customer.lastName} onChange={handleInputChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={customer.email} onChange={handleInputChange} required />
            </label>
            <label>
                Phone:
                <input type="text" name="phone" value={customer.phone} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderSubmission;