<template>
    <echart-base :options="options"></echart-base>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-09-25
     */

    import { defineComponent, computed, PropType } from "vue";
    import EchartBase from './echart-base.vue'
    import * as echarts from 'echarts'

    // 处理数据
    const splitData = (rawData: (number | string)[][]) => {
        const _rawData = JSON.parse(JSON.stringify(rawData));

        const times = _rawData.map((e: (number | string)[]) => e[0]);
        const price = _rawData.map((e: (number | string)[]) => e[1]);
        const avgPrice = _rawData.map((e: (number | string)[]) => e[2]);

        return {
            price,
            avgPrice,
            times,
        };
    };

    export default defineComponent({
        name: 'CatChartTime',
        components: {
            EchartBase
        },
        props: {
            // 图表数据
            seriesData: {
                type: Array as PropType<(number | string)[][]>,
                required: true,
            },
            // 颜色配置
            colors: Array as PropType<string[]>,
        },
        setup(props) {
            let optionFlag = false;

            const options = computed(() => {
                // 判断图表数据是否为空
                if (props.seriesData.length) {
                    const { price, avgPrice,times } = splitData(props.seriesData);
                    // 判断图表是否已初始化
                    if (optionFlag) {
                        return {
                            xAxis: {
                                // X轴数据
                                data: times,
                            },
                            series: [
                                {
                                    // Y轴数据
                                    data: price,
                                },
                                {
                                    // Y轴数据
                                    data: avgPrice,
                                },
                            ],
                        }
                    } else {
                        optionFlag = true;
                        return {
                            // 图表背景颜色
                            backgroundColor: 'transparent',
                            //坐标指示器全局公用设置
                            axisPointer: {
                                label: {
                                    color: '#fff',
                                }
                            },
                            legend: { //图例控件,点击图例控制哪些系列不显示
                                type: 'scroll',
                                itemWidth: 14,
                                itemHeight: 2,
                                left: 0,
                                top: 0,
                                animation: true,
                                textStyle: {
                                    fontSize: 12,
                                    color: '#0e99e2'
                                },
                            },
                            // 悬浮框
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                },
                                backgroundColor: 'rgba(255,255,255,.9)',
                                borderWidth: 1,
                                borderRadius: 3,
                                textStyle: {
                                    color: '#4d535c',
                                },
                                // eslint-disable-next-line
                                formatter: (params: any) => {
                                    const firstParams = params[0];
                                    const data = firstParams.data;
                                    const result = `<div><span style="display: inline-block; width: 40px">日期：</span><span style="display: inline-block; width: 100px; text-align: right">${firstParams.name}</span></div>
            <div><span style="display: inline-block; width: 40px">当前价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[1]}</span></div>
            <div><span style="display: inline-block; width: 40px">平均价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[2]}</span></div>
            <div><span style="display: inline-block; width: 40px">涨幅：</span><span style="display: inline-block; width: 100px; text-align: right">${data[3]}</span></div>
            <div><span style="display: inline-block; width: 40px">成交量：</span><span style="display: inline-block; width: 100px; text-align: right">${data[4]}</span></div>`;
                                    return result;
                                },
                            },
                            grid: {
                                top: '12%',
                                left: '8%',
                                right: '8%',
                                bottom: '8%',
                            },
                            xAxis: {
                                type: 'category',
                                // X轴数据
                                data: times,
                                splitLine: {
                                    // 坐标分隔线
                                    show: true,
                                    lineStyle: {
                                        // 坐标分隔线颜色
                                        color: '#171B1D'
                                    }
                                }
                            },
                            yAxis: {
                                scale: true,
                                splitLine: {
                                    lineStyle: {
                                        // 坐标分隔线颜色
                                        color: '#171B1D'
                                    }
                                },
                            },
                            dataZoom: [
                                {
                                    type: 'inside',
                                    start: 50,
                                    end: 100,
                                },
                                {
                                    show: false,
                                    type: 'slider',
                                },
                            ],
                            series: [
                                {
                                    name: '当前价',
                                    type: 'line',
                                    data: price,
                                    smooth: true,
                                    symbol: "circle", //中时有小圆点 
                                    lineStyle: {
                                        opacity: 0.8,
                                        color: '#39afe6',
                                        width: 1
                                    },
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(0, 136, 212, 0.7)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(0, 136, 212, 0.02)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                {
                                    name: '均价',
                                    type: 'line',
                                    data: avgPrice,
                                    smooth: true,
                                    symbol: "none",
                                    lineStyle: { //标线的样式
                                        opacity: 0.8,
                                        color: '#da6ee8',
                                        width: 1
                                    }
                                },
                            ],
                        }
                    }
                }
                return {};
            });

            return {
                options,
            }
        }
    });
</script>