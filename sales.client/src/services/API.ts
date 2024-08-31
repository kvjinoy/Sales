// src/services/api.ts

import { SelectedProducts } from '../types/SelectedProducts';
import { Customer } from '../types/Customer';
import { OrderItem } from '../types/OrderItem';

const HOST_API_URL = 'https://localhost:49167'; //TODO override with build/config
const API_ERROR = 'Network response was not ok';

export const fetchProducts = async () => {
    const response = await fetch(`${HOST_API_URL}/api/Product`);
    if (!response.ok) {
        throw new Error(API_ERROR);
    }
    return response.json();
};

export const fetchCustomerOrders = async () => {
    const response = await fetch(`${HOST_API_URL}/api/Order`);
    if (!response.ok) {
        throw new Error(API_ERROR);
    }
    return response.json();
};


export const submitOrder = async (selectedProducts: SelectedProducts, customer: Customer) => {

    const orderItems: OrderItem[] = [];
    Object.values(selectedProducts).forEach(function (selectedProduct) {
        const orderItem: OrderItem = { productId: selectedProduct.product.id, quantity: selectedProduct.quantity, price: selectedProduct.product.price,name:''  };
        orderItems.push(orderItem);
    });

    const payload = { 'orderItems': orderItems, 'customer': customer };

    window.console.log(JSON.stringify(payload));

    const response = await fetch(`${HOST_API_URL}/api/Order`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

};
