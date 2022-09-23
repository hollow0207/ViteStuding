<script lang="ts" setup>

</script>
<template>
    <view class="search">
        <!-- 输入框 -->
        <input 
            class="search_input"
            type="text"
            placeholder="请输入您想找的活动"
        />
        <!-- 按钮 -->
        <button
            class="search_button mini-btn"
        >搜索
        </button>
    </view>
</template>
<style lang="less" scoped>
.search{
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .search_input{
        width: 70%;
        height: 50rpx;
        box-sizing: border-box;
        border: 1px solid #EFEFEF;
        border-radius: 10rpx;
        background-color: #fff;
        padding-left: 20rpx;
        flex: 1;
    }
    .search_button{
        height:50rpx;
        width: 15%;
        background-color: #6467F0;
        color: #FFF;
        font-size: 16rpx;
        line-height: 50rpx;
        margin-left: 40rpx;
        box-sizing: border-box;
    }
}
</style>