import { IOrder } from "../interfaces/order.interface";
import { IProfile } from "../interfaces/profile.interface";

export class Profile implements IProfile {
    constructor(
        public email: string = '',
        public phone: string = '',
        public region: string = '',
        public comments: string = '',
        public discount: number | string = '',
        public firstName: string = '',
        public lastName: string = '',
        public image: string = '',
        public city: string = '',
        public street: string = '',
        public house: string = '',
        public orders: Array<IOrder> = []
    ) { }
}