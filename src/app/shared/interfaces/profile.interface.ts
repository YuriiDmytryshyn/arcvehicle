import { IOrder } from "./order.interface";

export interface IProfile {
    email: string;
    phone: string;
    region: string;
    comments: string;
    discount: number | string;
    firstName: string;
    lastName: string;
    image: string;
    city: string;
    street: string;
    house: string;
    orders: Array<IOrder>;
}