<template>
    <div class="home-index">
        <el-row :gutter="20">
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
    import { defineComponent } from "vue";
    import { ECharts } from "echarts";
    import lineOption from "@/mock/echarts/line"
    import barOption from "@/mock/echarts/bar"

    export default defineComponent({
        name: "HomeIndex",
        setup() {
            const lineChart = (chart: ECharts) => {
                chart.setOption(lineOption);
            }

            const barChart = (chart: ECharts) => {
                chart.setOption(barOption);
            }

            return {
                lineChart,
                barChart,
            }
        },
    });
</script>

<style lang="less">
    @import "./home.less";
</style>