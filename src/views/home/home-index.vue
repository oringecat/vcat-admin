<template>
    <div class="home-index">
        <el-row :gutter="20">
            <el-col>
                <cat-echart-kline class="chart" :series-data="klineList" :last-price="lastPrice" style="background-color:#000;"></cat-echart-kline>
            </el-col>
            <el-col>
                <cat-echart-time class="chart" :series-data="timeList" style="background-color:#000;"></cat-echart-time>
            </el-col>
            <el-col :xs="24" :sm="15" :md="15">
                <cat-chart class="chart" @load="lineChart"></cat-chart>
            </el-col>
            <el-col :xs="24" :sm="9" :md="9">
                <cat-chart class="chart" @load="barChart"></cat-chart>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { ECharts } from "echarts";
    import lineOption from "@/mock/echarts/line"
    import barOption from "@/mock/echarts/bar"
    import klineData from "@/mock/echarts/kline"
    import timeData from "@/mock/echarts/time"
    import { CatEchartKline, CatEchartTime } from "@/components/chart"

    export default defineComponent({
        name: "HomeIndex",
        components: {
            CatEchartKline,
            CatEchartTime
        },
        setup() {
            const lineChart = (chart: ECharts) => {
                chart.setOption(lineOption);
            }

            const barChart = (chart: ECharts) => {
                chart.setOption(barOption);
            }

            const lastPrice = ref(0);
            const klineList = ref<(number | string)[][]>([]);
            const timeList = ref<(number | string)[][]>([]);

            setTimeout(() => {
                timeList.value = timeData;
                klineList.value = klineData;
                lastPrice.value = 2200;

                setInterval(() => {
                    lastPrice.value ++;
                }, 1000)
            }, 1000);

            return {
                lineChart,
                barChart,
                lastPrice,
                klineList,
                timeList,
            }
        },
    });
</script>

<style lang="less">
    @import "./home.less";
</style>