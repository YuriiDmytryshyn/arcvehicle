import { IProduct } from "./product.interface";

export interface IOrder {
    products: Array<IProduct>;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    totalPrice: number;
    comments: string;
    date: Date;
}