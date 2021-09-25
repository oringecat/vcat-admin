<template>
    <div class="cat-chart" :style="{ width: width, height: height }">
        <div ref="chartElement" class="cat-chart__container"></div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-09-25
     */

    import { defineComponent, ref, onMounted, PropType, watch } from "vue";
    import { EChartsOption } from 'echarts'
    import { useEchart } from "../hooks/use-echart";

    export default defineComponent({
        name: 'CatChartBase',
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            },
            options: {
                type: Object as PropType<EChartsOption>,
                required: true,
            },
        },
        setup(props) {
            const chartElement = ref<HTMLElement>();

            onMounted(() => {
                const { setOptions } = useEchart(chartElement.value!);

                watch(() => props.options, (option) => {
                    setOptions(option);
                })
            })

            return {
                chartElement,
            }
        }
    });
</script>

<style lang="less">
.cat-chart {
    position: relative;
    overflow: hidden;

    &__container {
        width: 100%;
        height: 100%;
    }
}
</style>