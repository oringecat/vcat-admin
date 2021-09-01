/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-02
 */

import { Model } from "../model";

interface IProduct {
    id?: number;
    title?: string;
    detail?: string;
    galleries?: {
        id: number;
        imageUrl: string;
        thumbnailUrl: string;
    }[];
}

class Product extends Model<IProduct> {
    id = 0;
    title = "";
    detail = "";
    galleries = [];

    constructor(data?: IProduct) {
        super(data);
        Object.assign(this, data);
    }
}

export { IProduct, Product };
