import { IOrder } from "../interfaces/order.interface";
import { IProfile } from "../interfaces/profile.interface";

export class Profile implements IProfile {
    constructor(
        public id: number | string,
        public email: string,
        public firstName: string = '',
        public lastName: string = '',
        public phone: string = '',
        public region: string = '',
        public city: string = '',
        public street: string = '',
        public house: string = '',
        public comments: string = '',
        public orders: Array<IOrder> = []
    ) { }
}