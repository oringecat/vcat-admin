/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-27
 */

export const appStorage = {
    // 系统主题
    appTheme: "theme-default",
    // 用户登录信息
    loginInfo: {
        id: 0,
        account: "guest",
        realName: "访客",
        token: "",
    },
    // 用户自动登录
    autoLogin: false,
    // 动态路由列表
    routerMap: [],
}

type AppStorage = typeof appStorage; // 获取对象类型
//type AppStorageKey = AppStorage[keyof AppStorage]; // 获取对象所有值类型

const storageData = {
    get<Key extends keyof AppStorage>(storage: Storage, key: Key): AppStorage[Key] {
        const data = storage.getItem(key);
        if (data !== "undefined" && data !== null) {
            return JSON.parse(data) as AppStorage[Key];
        }
        return appStorage[key];
    },
    set<Key extends keyof AppStorage>(storage: Storage, key: Key, value: AppStorage[Key]): void {
        if (value !== undefined && value !== null) {
            const str = JSON.stringify(value);
            storage.setItem(key, str);
        }
    }
}

export const localData = {
    get<Key extends keyof AppStorage>(key: Key): AppStorage[Key] {
        return storageData.get(localStorage, key);
    },
    set<Key extends keyof AppStorage>(key: Key, value: AppStorage[Key]): void {
        storageData.set(localStorage, key, value);
    },
    remove<Key extends keyof AppStorage>(key: Key): void {
        localStorage.removeItem(key);
    }
}

export const sessionData = {
    get<Key extends keyof AppStorage>(key: Key): AppStorage[Key] {
        return storageData.get(sessionStorage, key);
    },
    set<Key extends keyof AppStorage>(key: Key, value: AppStorage[Key]): void {
        storageData.set(sessionStorage, key, value);
    },
    remove<Key extends keyof AppStorage>(key: Key): void {
        sessionStorage.removeItem(key);
    }
}