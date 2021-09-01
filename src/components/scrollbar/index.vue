<template>
    <div ref="scrollElement" class="cat-scrollbar" :style="{ height: height }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, onActivated, onDeactivated, ref, watch } from "vue";

    export default defineComponent({
        name: "CatScrollbar",
        props: {
            //滚动元素名称(适合同页面多组件切换)
            scrollName: {
                type: String,
                default: "default",
            },
            height: {
                type: String,
                default: "100%",
            }
        },
        setup(props) {
            let timer = 0;
            const scrollElement = ref(); //滚动元素
            const scrollTargets: { name: string; top: number }[] = []; //滚动元素列表

            //监听滚动元素名称
            watch(() => props.scrollName, (value) => {
                const target = scrollTargets.find((t) => t.name === value);
                const el = scrollElement.value;

                if (target != null) {
                    el.scrollTop = target.top;
                }
            });

            //获取当前滚动元素
            const getScrollTarget = (defaultValue = 0) => {
                const target = scrollTargets.find((t) => t.name === props.scrollName);
                if (target == null) {
                    scrollTargets.push({
                        name: props.scrollName,
                        top: defaultValue,
                    });
                    return scrollTargets[scrollTargets.length - 1];
                }
                return target;
            };

            //监听滚动条位置
            const onScrollPosition = (e: Event) => {
                clearTimeout(timer);
                timer = window.setTimeout(() => {
                    const scrollTop = (e.target as HTMLDivElement).scrollTop;
                    const target = getScrollTarget(scrollTop);
                    target.top = scrollTop;
                }, 50);
            };

            onActivated(() => {
                const el = scrollElement.value;
                el.scrollTop = getScrollTarget().top;
                //添加监听事件
                el.addEventListener("scroll", onScrollPosition);
            });

            onDeactivated(() => {
                const el = scrollElement.value;
                //移除监听事件
                el && el.removeEventListener("scroll", onScrollPosition);
            });

            return {
                scrollElement,
            };
        },
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
