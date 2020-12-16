import { INews } from "../interfaces/news.interface";

export class News implements INews {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public image: string,
        public date: string,
    ) { }
}