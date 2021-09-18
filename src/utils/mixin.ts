/*!
 * author: teamwei
 * date: 2021-08-20
 */

import { localData } from "@/lib/storage";

// 切换主题样式
export const setAppTheme = (className: string): void => {
    const classList = document.body.classList;

    classList.remove(localData.get("appTheme"));
    classList.add(className);
}

// 获取当前主题
export const getAppTheme = (): void => {
    const classList = document.body.classList;
    classList.add(localData.get("appTheme"));
}