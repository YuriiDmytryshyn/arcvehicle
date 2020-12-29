import { IOrder } from "./order.interface";

export interface IProfile{
    id: number | string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    region: string;
    city: string;
    street: string;
    house: string;
    comments: string,
    orders: Array<IOrder>;
}