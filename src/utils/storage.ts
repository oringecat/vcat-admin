/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-27
 */

const config = {
    appTheme: "theme-default", // 系统主题
}

type ConfigType = typeof config; // 获取对象类型
//type ConfigValueType = configType[keyof configType]; // 获取对象所有值类型

export const localData = {
    get<Key extends keyof ConfigType>(key: Key): ConfigType[Key] {
        const data = localStorage.getItem(key);
        if (data !== "undefined" && data !== null) {
            return JSON.parse(data) as ConfigType[Key];
        }
        return config[key];
    },
    set<Key extends keyof ConfigType>(key: Key, value: ConfigType[Key]): void {
        if (value !== undefined && value !== null) {
            const str = JSON.stringify(value);
            localStorage.setItem(key, str);
        }
    }
}