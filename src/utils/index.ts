/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-17
 */

const utils = {
    //检测客户端平台
    clientAgent: (function (): { [key: string]: boolean } {
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
};

export default utils;
