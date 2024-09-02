import React, { useState } from 'react';
import { Customer } from '../types/Customer';

interface customerInfoProps {
    handleOrderSubmit(arg: Customer): void;
}

const CustomerInfo: React.FC<customerInfoProps> = ({ handleOrderSubmit }) => {

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

    const handleCustomerInfoSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        handleOrderSubmit(customer);
    }


    return <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h2 className="h2">Enter your details</h2>
        <form onSubmit={handleCustomerInfoSubmit}>
            <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input className="form-control" type="text" name="firstName" value={customer.firstName} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Last Name:</label>
                <input className="form-control" type="text" name="lastName" value={customer.lastName} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Email: </label>
                <input className="form-control" type="email" name="email" value={customer.email} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Phone:  </label>
                <input className="form-control" type="tel" name="phone" value={customer.phone} onChange={handleInputChange} required placeholder="123-456-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <small>Format: 123-456-6789</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit Order</button>
        </form>
    </div>;
}

export default CustomerInfo;