<template>
    <echart-base :options="options"></echart-base>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-09-25
     */

    import { defineComponent, computed, PropType} from "vue";
    import EchartBase from './echart-base.vue'

    const splitData = (rawData: (number | string)[][]) => {
        const dates = [];
        const values = [];
        for (var i = 0; i < rawData.length; i++) {
            dates.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
        }
        return {
            dates,
            values
        };
    };

    export default defineComponent({
        name: 'CatChartBar',
        components: {
            EchartBase
        },
        props: {
            // 图表数据
            seriesData: {
                type: Array as PropType<(number | string)[][]>,
                required: true,
            },
            // 最新价
            lastPrice: {
                type: Number,
                required: true,
            },
        },
        setup(props) {
            const options = computed(() => {
                const { dates, values } = splitData(props.seriesData);
                return {
                    // 图表背景颜色
                    backgroundColor: 'transparent',
                    //坐标指示器全局公用设置
                    axisPointer: {
                        label: {
                            color: '#fff',
                        }
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
            <div><span style="display: inline-block; width: 40px">开盘价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[1]}</span></div>
            <div><span style="display: inline-block; width: 40px">昨收价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[2]}</span></div>
            <div><span style="display: inline-block; width: 40px">最低价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[3]}</span></div>
            <div><span style="display: inline-block; width: 40px">最高价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[4]}</span></div>`;
                            return result;
                        },
                    },
                    grid: {
                        top: '8%',
                        left: '8%',
                        right: '8%',
                        bottom: '8%',
                    },
                    xAxis: {
                        type: 'category',
                        // X轴数据
                        data: dates,
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
                        axisLabel: {
                            // Y轴左侧标签颜色
                            color: (value: string) => {
                                if (Number(value) > props.lastPrice) return '#FF2B2B';
                                if (Number(value) < props.lastPrice) return '#1FF195';
                                return '#3C454B';
                            },
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
                            type: 'candlestick',
                            // Y轴数据
                            data: values,
                            markLine: {
                                // 标线两端图标
                                symbol: 'none',
                                // 标线标签样式
                                label: {
                                    color: '#3C454B',
                                    fontWeight: 'bold',
                                    position: 'end',
                                },
                                data: [
                                    {
                                        // 标线样式
                                        lineStyle: {
                                            type: 'dashed',
                                            color: '#33393D',
                                        },
                                        // 标线数据
                                        yAxis: props.lastPrice,
                                    },
                                ],
                            },
                        },
                    ],
                }
            });

            return {
                options,
            }
        }
    });
</script>