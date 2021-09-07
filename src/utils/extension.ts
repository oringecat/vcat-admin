/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-09-05
 */

// eslint-disable-next-line
interface ObjectConstructor {
    /**
     * 待定义
     */
    isEqual<T1, T2>(a: T1, b: T2): boolean;
}

// eslint-disable-next-line
interface Array<T> {
    /**
     * 键值是否存在数组中
     */
    findExist<Key extends keyof T>(key: Key, value: T[Key]): boolean;
}

Array.prototype.findExist = function (key, value) {
    return this.some((e) => {
        if (!value) return false;
        if (Object.entries(e[key]).toString() === Object.entries(value).toString()) return true;

        const values = Object.values(e);

        for (let i = 0; i < values.length; i++) {
            const v = values[i];
            if (Array.isArray(v)) return v.findExist(key, value);
        }
    })
}