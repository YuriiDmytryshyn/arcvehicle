import { ICategory } from "./category.interface";

export interface IProduct{
    id: number | string;
    category: ICategory;
    name: string;
    count: number;
    description: string;
    price: number;
    image: string;
    characteristics?: Array<any>;
    size?: Array<any>;
}