/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-02
 */

interface Action<T> {
  getData<K extends keyof T>(this: T, keys: K[]): T;
  setData(data: T): void;
}

export class Model<T> implements Action<T> {
  source?: T;

  constructor(data?: T) {
    this.source = data;
  }

  /**
   * 根据属性获取目标对象
   * @param {Array} keys 属性key值
   */
  getData<K extends keyof T>(this: T, keys: K[]): T {
    const result = {} as T;

    keys.forEach((key) => {
      result[key] = this[key];
    });

    return result;
  }

  /**
   * 从数据复制属性值到目标对象
   * @param {object} data 数据
   */
  setData(data: T): void {
    this.source = data;
    Object.assign(this, data);
  }
}