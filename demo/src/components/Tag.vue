<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps<{
    // 传入标签的值
    title : string
}>()
// 此处必须用toRefs，不然会失去响应
const {title} = toRefs(props)
</script>
<template>
    <view class="tag">
        <!-- 左边竖杠 -->
        <view class="tag_left"></view>
        <!-- 右边文本 -->
        <view class="tag_title">
            {{title}}
        </view>
        
    </view>
</template>
<style lang="less" scoped>
.tag{
    width: 100%;
    height: 100rpx;
    line-height: 80rpx;
    box-sizing: border-box;
    padding: 10rpx 0;
    display: flex;
    align-items: center;
    .tag_left{
        width: 10rpx;
        height: 60rpx;
        background-color: #6467F0;

    }
    .tag_title{
        font-size: 30rpx;
        margin-left: 30rpx;
    }
}
</style>