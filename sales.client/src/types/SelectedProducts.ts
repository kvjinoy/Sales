import { Product } from "./Product";

export interface SelectedProducts {
    [id: number]: {
        product: Product;
        quantity: number;
    };
}
