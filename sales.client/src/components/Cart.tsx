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
        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            {
                !showOrderSubmission && <div className="card">
                    <h3 className="card-header">Shopping Cart</h3>
                    <div className="card-body">
                        <table className="table table-striped table-hover">
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
                                            <span className="badge text-bg-primary rounded-pill">{product.type}</span>
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
                                <tr className="table-group-divider"><td colSpan={3}><p className="fw-bold">Grand Total:</p></td><td><p className="fw-bold">${getGrandTotal()}</p></td></tr>
                            </tbody>
                        </table>

                        <div className="card-footer">
                            <button onClick={() => handleOrderClick()} className=" btn btn-primary">Order Now</button>
                        </div>
                    </div>
                </div>
            }

            {showOrderSubmission && <OrderSubmission selectedProducts={selectedProducts} />}

        </div>
    );
};

export default Cart;