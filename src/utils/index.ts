/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-17
 */

const utils = {
    // 检测客户端平台
    clientAgent: ((): { [key: string]: boolean } => {
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
    })(),
    //函数防抖 (等待触发)
    debounce: (callback: () => void, ms: number) => {
        let timer = 0;
        return () => {
            clearTimeout(timer);
            timer = window.setTimeout(callback, ms);
        }
    },
    //函数节流 (间隔触发)
    throttle: (callback: () => void, ms: number) => {
        let timer = 0;
        return () => {
            if (timer) return;
            timer = window.setTimeout(() => {
                callback();
                timer = 0;
            }, ms);
        }
    },
};

export default utils;
