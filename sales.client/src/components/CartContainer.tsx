
import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { Product } from '../types/Product';
import { fetchProducts } from '../services/API';


const CartContainer: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchProducts();
                setProducts(data);
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

    return <Cart products={products} />;
};

export default CartContainer;