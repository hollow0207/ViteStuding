<script lang="ts" setup>
import { defineComponent } from 'vue';
import {goDetailed} from '../api/event_api'
const props = defineProps({
    id:Number,
    time:String,
    title:String,
    limit:Number,
    isAllEvent:Boolean,
    data:Object
})
// console.log(props.data);

</script>

<template>
    <view class="event" :class="{all_event: isAllEvent}" @click="goDetailed(props.data)">
        <view class="event_avatar">

        </view>
        <view class="event_content">
            <view class="event_content_title">
                {{title}}
            </view>
            <view class="event_content_msg">
                <p style="color:#808080;">{{time}}</p>
                <p style="width:10%"></p>
                <p style="color:#07C160">报名:1/{{limit}}</p>
            </view>
        </view>
        <!-- 右侧是否显示按钮 -->
        <view class="event_btn" v-show="isAllEvent">
            <view class="btn_normal btn_join">
                <image src="@/static/home_join.png"/>
            </view>
            <view class="btn_normal btn_share">
                <image src="@/static/home_share.png"/>
            </view>
        </view>
    </view>
</template>

<style lang="less" scoped> 
.event{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5rpx;
    display: flex;
    align-items: center;
    .event_avatar{
        width: 20%;
        height: 100%;
    }
    .event_content{
        width: 80%;
        height: 100%;
        box-sizing: border-box;
        padding: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .event_content_title{
            font-size: 26rpx;
            font-weight: bolder;
        }
        .event_content_msg{
            display: flex;
            font-size: 12rpx;
            font-weight: bolder;
        }
    }
}
.all_event{
    background: linear-gradient(270deg, #FFFFFF 29.13%, #EDEDED 111.79%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    .event_btn{
        width: 40%;
        height: 50%;
        box-sizing: border-box;
        margin-right: 20rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn_normal{
            width: 80rpx;
            height: 80rpx;
            background-color: #10AEFF;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #07C160;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 3px;
            image{
                width: 60rpx;
                height: 60rpx;
            }
        }
        .btn_join{
            background-color: #10AEFF;
        }
    }
}
</style>