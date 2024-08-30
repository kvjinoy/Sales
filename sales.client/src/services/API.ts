// src/services/api.ts

import { SelectedProducts } from '../types/SelectedProducts';
import { Customer } from '../types/Customer';

const HOST_API_URL = 'https://localhost:49159';
const API_ERROR = 'Network response was not ok';

export const fetchProducts = async () => {
    const response = await fetch(`${HOST_API_URL}/api/Product`);
    if (!response.ok) {
        throw new Error(API_ERROR);
    }
    return response.json();
};

export const submitOrder = async (selectedProducts: SelectedProducts, customer: Customer) => {


    const response = await fetch(`${HOST_API_URL}/api/Product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selectedProducts,
            customer,
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

};
