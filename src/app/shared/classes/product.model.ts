import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";



export class Product implements IProduct {
    constructor(
        public id: number | string,
        public category: ICategory,
        public name: string,
        public count: number,
        public description: string,
        public price: number,
        public image: string,
        public characteristics: Array<any> = [],
        public size: Array<any> = [],
    ) { }
}