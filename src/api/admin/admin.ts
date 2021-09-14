/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-03
 */

import { Model } from "../model";
import cryptojs from "crypto-js";

interface IAdmin {
    id?: number;
    account?: string;
    password?: string;
    passwordHash?: string;
    realName?: string;
    avatar?: string;
    createdBy?: string
}

class Admin extends Model<IAdmin> implements IAdmin {
    id = 0;
    account = "";
    password = "";
    passwordHash = "";
    avatar = "";
    realName = "";
    createdBy = "";

    constructor(data?: IAdmin) {
        super(data);
        Object.assign(this, data);
    }

    getPasswordHash(): string {
        return cryptojs.SHA256(this.password).toString();
    }
}

export { IAdmin, Admin };
