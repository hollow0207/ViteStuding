<script lang="ts" setup>

</script>

<template>
    <view class="selection">
        <view class="selection_item">
            时间排序
        </view>
        <view class="selection_line"></view>
        <view class="selection_item">
            显示可参加
        </view>
        <view class="selection_line"></view>
        <view class="selection_item">
            其他选项
        </view>
    </view>
</template>
<style lang="less" scoped>
.selection{
    width: 70%;
    height: 80rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    background: linear-gradient(180deg, #4E52F4 -7.78%, rgba(153, 155, 255, 0.76) 157.78%);
    mix-blend-mode: normal;
    border-radius: 7rpx;
    margin: 30rpx auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .selection_item{
        color: #fff;
        font-weight: bold;
        font-size: 24rpx;
    }
    .selection_line{
        width: 4rpx;
        height: 50%;
        background-color: #fff;
    }
}
</style>