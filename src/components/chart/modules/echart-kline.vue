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

    // 处理数据
    const splitData = (rawData: (number | string)[][]) => {
        const _rawData = JSON.parse(JSON.stringify(rawData)),
            datas = [],
            times = [];

        for (var i = 0; i < _rawData.length; i++) {
            datas.push(_rawData[i]);
            times.push(_rawData[i].splice(0, 1)[0]);
        }

        return {
            datas,
            times,
        };
    };

    // 计算平均线
    const calculateMA = (count: number, datas: number[][], times: string[]) => {
        const result = [];
        for (let i = 0, len = times.length; i < len; i++) {
            if (i < count) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (var j = 0; j < count; j++) {
                sum += datas[i - j][1];
            }
            result.push((sum / count).toFixed(2));
        }
        return result;
    }

    export default defineComponent({
        name: 'CatChartKline',
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
            // 颜色配置
            colors: Array as PropType<string[]>,
        },
        setup(props) {
            let optionFlag = false;

            const options = computed(() => {
                // 判断图表数据是否为空
                if (props.seriesData.length) {
                    const { datas, times } = splitData(props.seriesData);
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
                                    data: datas,
                                    markLine: {
                                        data: [
                                            {
                                                // 标线样式
                                                lineStyle: {
                                                    type: 'dashed',
                                                    color: '#33393D',
                                                },
                                                // 最新价
                                                yAxis: props.lastPrice,
                                            },
                                        ],
                                    },
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
            <div><span style="display: inline-block; width: 40px">开盘价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[1]}</span></div>
            <div><span style="display: inline-block; width: 40px">昨收价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[2]}</span></div>
            <div><span style="display: inline-block; width: 40px">最低价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[3]}</span></div>
            <div><span style="display: inline-block; width: 40px">最高价：</span><span style="display: inline-block; width: 100px; text-align: right">${data[4]}</span></div>`;
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
                                axisLabel: {
                                    // Y轴左侧标签颜色
                                    // eslint-disable-next-line
                                    color: (value: any) => {
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
                                    name: 'K线',
                                    type: 'candlestick',
                                    // Y轴数据
                                    data: datas,
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
                                                // 最新价
                                                yAxis: props.lastPrice,
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: 'MA5',
                                    type: 'line',
                                    data: calculateMA(5, datas, times),
                                    smooth: true,
                                    symbol: "none",
                                    lineStyle: {
                                        width: 1,
                                        opacity: 0.8,
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