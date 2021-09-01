<template>
    <div class="cat-tabbar">
        <div class="cat-tabbar__arrow" @click="scrollTabbar('prev')" v-if="showArrow">
            <el-icon>
                <arrow-left />
            </el-icon>
        </div>
        <div ref="containerElement" class="cat-tabbar__container">
            <ul ref="tabbarElement" class="cat-tabbar__list">
                <template v-for="(item, index) in historyPages" :key="index">
                    <li :class="['cat-tabbar__item', activeName === item.name && 'is-active']" @click="changeTab(index)">
                        <span class="tab-text">{{item.title}}</span>
                        <el-icon class="tab-close" title="关闭页面" v-if="historyPages.length > 1">
                            <circle-close-filled @click.stop="removeTab(index)" />
                        </el-icon>
                    </li>
                </template>
            </ul>
        </div>
        <div class="cat-tabbar__arrow" @click="scrollTabbar('next')" v-if="showArrow">
            <el-icon>
                <arrow-right />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent, computed, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { store } from "@/store";

    export default defineComponent({
        name: "CatTabbar",
        setup() {
            const route = useRoute(),
                router = useRouter(),
                containerElement = ref(),
                tabbarElement = ref(),
                showArrow = ref(false),
                historyPages = computed(() => store.state.router.historyPages),
                activeName = ref(route.name);

            // 选择标签
            const changeTab = (index: number) => {
                const item = historyPages.value[index];
                activeName.value = item.name;
                router.replace(item.fullPath);
            }

            // 移除标签
            const removeTab = (index: number) => {
                const item = historyPages.value[index];
                store.dispatch("router/removeHistory", item.name);
                // 判断移除的是否当前页面
                if (item.fullPath === route.fullPath) {
                    const lastItem = historyPages.value[historyPages.value.length - 1];
                    router.replace(lastItem.fullPath);
                } else {
                    scrollTab();
                }
            }

            // 滚动标签
            const scrollTab = () => {
                setTimeout(() => {
                    const el = {
                        container: containerElement.value,
                        tabbar: tabbarElement.value,
                        activeTab: containerElement.value.querySelector("li.is-active"),
                        lastTab: containerElement.value.querySelector("li:last-child")
                    }

                    if (el.tabbar.scrollWidth > el.container.clientWidth) {
                        showArrow.value = true;
                        // 等待箭头元素出现后再计算，不然可能出现计算误差
                        setTimeout(() => {
                            const rect = {
                                container: el.container.getBoundingClientRect(), // 外层容器
                                tabbar: el.tabbar.getBoundingClientRect(), // 标签栏
                                activeTab: el.activeTab?.getBoundingClientRect(), // 标签栏中被选中的标签
                                lastTab: el.lastTab?.getBoundingClientRect() // 标签栏中最后一个标签
                            }

                            if (rect.activeTab && rect.lastTab) {
                                let tabbarOffset = rect.container.left - rect.tabbar.left, // 计算标签栏偏移容器距离
                                    activeTabOffsetLeft = rect.container.left - rect.activeTab.left, // 计算标签偏移容器左边的距离
                                    activeTabOffsetRight = rect.activeTab.right - rect.container.right; // 计算标签偏移容器右边的距离

                                // 计算最后一个标签和容器最右边之间的距离
                                const lastOffset = rect.container.right - rect.lastTab.right;
                                if (activeTabOffsetLeft < lastOffset) {
                                    activeTabOffsetLeft += lastOffset - activeTabOffsetLeft;
                                }

                                // 判断标签是否超出父元素左边界
                                if (activeTabOffsetLeft > 0) {
                                    const scrollX = tabbarOffset - activeTabOffsetLeft;
                                    el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
                                }

                                // 判断标签是否超出父元素右边界
                                if (activeTabOffsetRight > 0) {
                                    const scrollX = tabbarOffset + activeTabOffsetRight;
                                    el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
                                }
                            }
                        }, 0)
                    } else {
                        showArrow.value = false;
                        el.tabbar.style.transform = "translate3d(0,0,0)";
                    }
                }, 0)
            }

            // 滚动标签栏
            const scrollTabbar = (direction: "prev" | "next") => {
                const el = {
                    container: containerElement.value,
                    tabbar: tabbarElement.value,
                    lastTab: containerElement.value.querySelector("li:last-child")
                }

                const rect = {
                    container: el.container.getBoundingClientRect(), // 外层容器
                    tabbar: el.tabbar.getBoundingClientRect(), // 标签栏
                    lastTab: el.lastTab?.getBoundingClientRect() // 标签栏中最后一个标签
                }

                if (rect.lastTab) {
                    const barOffsetLeft = rect.container.left - rect.tabbar.left, // 计算标签栏偏移容器距离
                        barOffsetRight = rect.lastTab.right - rect.container.right; // 计算标签偏移容器右边的距离

                    // 判断标签栏是否超出父元素左边界(前进)
                    if (direction === "prev" && barOffsetLeft > 0) {
                        let scrollX = 0;
                        // 每次滚动的最长距离为容器宽度
                        if (barOffsetLeft > el.container.clientWidth) {
                            scrollX = barOffsetLeft - el.container.clientWidth;
                        }
                        el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
                    }

                    // 判断标签栏是否超出父元素右边界(后退)
                    if (direction === "next" && barOffsetRight > 0) {
                        let scrollX = barOffsetLeft + barOffsetRight;
                        // 每次滚动的最长距离为容器宽度
                        if (barOffsetRight > el.container.clientWidth) {
                            scrollX = barOffsetLeft + el.container.clientWidth;
                        }
                        el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
                    }
                }
            }

            watch(() => route.name, (name) => {
                activeName.value = name;
                scrollTab();
            })

            return {
                containerElement,
                tabbarElement,
                showArrow,
                historyPages,
                activeName,
                changeTab,
                removeTab,
                scrollTabbar
            };
        },
    });
</script>

<style lang="less">
    @import "./index.less";
</style>
