<script lang="ts" setup>
import UserMsg from '../../components/UserMsg.vue';
</script>
<template>
    <view class="user">
        <UserMsg></UserMsg>
    </view>
</template>
<style lang="scss">
.user{
    width: 100%;
    height: 100vh;
    background: radial-gradient(168.54% 168.54% at 50% 168.54%, #D9DAFF 0%, #FFFFFF 82.89%, #DDDEFD 100%);
    box-sizing: border-box;
    padding: 60rpx 20rpx;
}
</style>