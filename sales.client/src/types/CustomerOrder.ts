import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export interface CustomerOrder {
    orderItems: OrderItem[],
    customer: Customer,
    orderId: number,
    total: number,
    orderDate: Date
}
