import React, { useState } from 'react';
import { Product } from '../types/Product';
import { SelectedProducts } from '../types/SelectedProducts';
import OrderSubmission from './OrderSubmission'

interface CartProps {
    products: Product[];
}


const Cart: React.FC<CartProps> = ({ products }) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>({});
    const [showOrderSubmission, setOrderSubmissionStatus] = useState(false);

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
            setOrderSubmissionStatus(true);
        }
    };

    return (
        <>
            {
                !showOrderSubmission && <>
                <div>
                    <h1>Select Item</h1>
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
                                        <span className="product-type">{product.type}</span>
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
                    <button onClick={() => handleOrderClick()}>Order Now</button>
                </div>

                </>
            }

            {showOrderSubmission && <OrderSubmission selectedProducts={selectedProducts} />}

        </>
    );
};

export default Cart;