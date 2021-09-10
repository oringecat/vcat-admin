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
        realName: "未登录",
        token: "",
    },
    // 用户自动登录
    autoLogin: false,
    // 动态路由列表
    routerMap: [],
}

type AppStorage = typeof appStorage;
//type AppStorageKey = AppStorage[keyof AppStorage]; // 获取对象所有值类型

type StorageData = {
    get<Key extends keyof AppStorage>(storage: Storage, key: Key): AppStorage[Key];
    set<Key extends keyof AppStorage>(storage: Storage, key: Key, value: AppStorage[Key]): void;
}

type StorageItem = {
    get<Key extends keyof AppStorage>(key: Key): AppStorage[Key];
    set<Key extends keyof AppStorage>(key: Key, value: AppStorage[Key]): void;
    remove<Key extends keyof AppStorage>(key: Key): void;
}

const storageData: StorageData = {
    get(storage, key) {
        const data = storage.getItem(key);
        if (data !== "undefined" && data !== null) {
            return JSON.parse(data);
        }
        return appStorage[key];
    },
    set(storage, key, value) {
        if (value !== undefined && value !== null) {
            const str = JSON.stringify(value);
            storage.setItem(key, str);
        }
    }
}

export const localData: StorageItem = {
    get(key) {
        return storageData.get(localStorage, key);
    },
    set(key, value) {
        storageData.set(localStorage, key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}

export const sessionData: StorageItem = {
    get(key) {
        return storageData.get(sessionStorage, key);
    },
    set(key, value) {
        storageData.set(sessionStorage, key, value);
    },
    remove(key) {
        sessionStorage.removeItem(key);
    }
}