/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-17
 */

// 检测客户端平台
export const clientAgent = ((): { [key: string]: boolean } => {
    const ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
            /(?:iPad|PlayBook)/.test(ua) ||
            (isAndroid && !/(?:Mobile)/.test(ua)) ||
            (isFireFox && /(?:Tablet)/.test(ua)),
        isiPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isiPhone && !isAndroid && !isSymbian;

    return {
        isTablet: isTablet,
        isiPhone: isiPhone,
        isAndroid: isAndroid,
        isChrome: isChrome,
        isPc: isPc,
    };
})();

//函数防抖 (等待触发)
export const debounce = (callback: () => void, ms: number): () => void => {
    let timer = 0;
    return function <T>(this: T) {
        clearTimeout(timer);
        timer = window.setTimeout(callback.bind(this), ms);
    }
}

//函数节流 (间隔触发)
export const throttle = (callback: () => void, ms: number): () => void => {
    let timer = 0;
    return function <T>(this: T) {
        if (timer) return;
        timer = window.setTimeout(() => {
            callback.call(this);
            timer = 0;
        }, ms);
    }
}

// 监听窗口大小变化
export const onresize = (callback: () => void, ms = 100): void => {
    window.addEventListener('resize', debounce(() => {
        callback();
    }, ms));
}