<template>
    <div class="cat-chart" :style="{ width: width, height: height }">
        <div ref="chartElement" class="cat-chart__canvas"></div>
        <iframe ref="iframeElement" class="cat-chart__iframe"></iframe>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-09-11
     */

    import { defineComponent, ref, onMounted, onActivated, onDeactivated } from "vue";
    import { debounce } from "@/utils"
    import * as echarts from "echarts";

    export default defineComponent({
        name: "CatChart",
        props: {
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                required: true
            }
        },
        setup(props, { emit }) {
            const iframeElement = ref(),
                chartElement = ref();

            let chart: unknown = null;

            const onresize = debounce(function (this: echarts.ECharts) {
                const el: HTMLIFrameElement = iframeElement.value;
                // 如果 chart 宽高和 iframe 不一致，重新渲染
                if (el.clientWidth !== this.getWidth() || el.clientHeight !== this.getHeight()) {
                    this.resize && this.resize();
                }
            }, 100);

            onMounted(() => {
                chart = echarts.init(chartElement.value);
                emit("load", chart);
            })

            onActivated(() => {
                const el: HTMLIFrameElement = iframeElement.value;
                // 监听变化
                el.contentWindow?.addEventListener("resize", onresize.bind(chart));
            })

            onDeactivated(() => {
                const el: HTMLIFrameElement = iframeElement.value;
                // 移除监听事件
                el && el.contentWindow?.removeEventListener("resize", onresize);
            })

            return {
                iframeElement,
                chartElement,
            }
        }
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
