/*!
* ©teamwei.com
* author: teamwei
* date: 2021-09-24
*/

import { onActivated, onDeactivated, onUnmounted } from "vue";
import { debounce } from "@/utils"
import * as echarts from 'echarts'

// 创建 iframe 对象
const createIframe = (parent: HTMLElement): HTMLIFrameElement => {
    const iframe = document.createElement('iframe');
    // 设置 iframe 样式
    iframe.style.cssText = 'position: absolute; z-index: -1000; left: 0; top: 0; width: 100%; height: 100%; border: 0; visibility: hidden; pointer-events: none;';
    // 添加 iframe 节点
    parent.appendChild(iframe);

    return iframe;
}

type UseEchart = {
    echart: echarts.ECharts,
    setOptions: (options: echarts.EChartsOption) => void
}

export function useEchart(el: HTMLElement): UseEchart {
    const iframe = createIframe(el.parentElement || el);
    // 初始化图表
    const echart = echarts.init(el);
    echart.showLoading({
        text: '加载中...',
        textColor: '#fff',
        color: 'rgba(255, 255, 255, 0.75)',
        maskColor: 'transparent',
    });

    // 图表配置项
    const setOptions = (options: echarts.EChartsOption) => {
        echart.hideLoading();
        echart.setOption(options);
    };

    const onresize = debounce(() => {
        // 如果 canvas 宽高和父元素不一致，重新渲染
        if (echart.getWidth() !== el.clientWidth || echart.getHeight() !== el.clientHeight) {
            echart.resize && echart.resize();
        }
    }, 50);

    const addEventListener = () => {
        // 监听 iframe 变化，虽然可直接用 ResizeObserver 监听 chartElement 变化，不过 ResizeObserver 还未正式修订
        iframe.contentWindow?.addEventListener('resize', onresize);
    }

    const removeEventListener = () => {
        // 移除 iframe 监听事件
        iframe.contentWindow?.removeEventListener('resize', onresize);
    }

    addEventListener();

    onUnmounted(() => {
        removeEventListener();
    })

    // 针对 keepalive 组件缓存
    onActivated(() => {
        addEventListener();
    })

    // 针对 keepalive 组件缓存
    onDeactivated(() => {
        removeEventListener();
    })

    return {
        echart,
        setOptions,
    }
}