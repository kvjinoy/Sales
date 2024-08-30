import React, { useState } from 'react';
import { Product } from '../types/Product';

interface CartProps {
    products: Product[];
}

interface SelectedProducts {
    [id: number]: {
        product: Product;
        quantity: number;
    };
}

const Cart: React.FC<CartProps> = ({ products }) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>({});
    const [showOrder, setOrderStatus] = useState(false);

    const handleIncrementProduct = (product: Product) => {
        setSelectedProducts(prevState => ({
            ...prevState,
            [product.id]: {
                product,
                quantity: prevState[product.id] ? prevState[product.id].quantity + 1 : 1,
            },
        }));
    };

    const handleDecrementProduct = (product: Product) => {
        setSelectedProducts(prevState => {
            if (prevState[product.id] && prevState[product.id].quantity > 0) {
                return {
                    ...prevState,
                    [product.id]: {
                        product,
                        quantity: prevState[product.id].quantity - 1,
                    },
                };
            }
            return prevState;
        });
    };

    const getSelectedProductPrice = (product: Product) => {
        if (selectedProducts[product.id] != undefined)
            if (selectedProducts[product.id].quantity > 0) {
                return selectedProducts[product.id].quantity * product.price;
            }
        return 0;
    };

    const getSelectedQuantity = (product: Product) => {
        if (selectedProducts[product.id] != undefined)
            if (selectedProducts[product.id].quantity > 0) {
                return selectedProducts[product.id].quantity;
            }
        return 0;
    };

    const getGrandTotal = () => {
        let total = 0;
        Object.values(selectedProducts).map(({ product, quantity }) => (
            total = total + (product.price * quantity)
        ));
        return total;
    }; 

    const handleOrderClick = () => {
        if (getGrandTotal() > 0) {
            setOrderStatus(true);
        }
    };

    return (
        <div>
        <div>
            <h1>Product List</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Price</th>
                        <th>Quantity</th>   
                        <th>Total</th> 
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}
                                {product.type}
                            </td>
                            <td>${product.price}</td>
                            <td>
                                <button onClick={() => handleIncrementProduct(product)}>+</button>
                                ${getSelectedQuantity(product)}
                                <button onClick={() => handleDecrementProduct(product)}>-</button>
                            </td>
                            <td>${getSelectedProductPrice(product)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div>
                <h3>Grand Total: {getGrandTotal()}</h3>
                <button onClick={() => handleOrderClick() }>Order Now</button>
                <ul>
                    {Object.values(selectedProducts).map(({ product, quantity }) => (
                        <li key={product.id}>{product.name} - ${product.price} x {quantity}</li>
                    ))}
                </ul>
            </div>

            {showOrder && <div> Order coming soon ... </div> }

        </div>
    );
};

export default Cart;