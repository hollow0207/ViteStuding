<script lang="ts" setup>
import Tag from '../../components/Tag.vue';
import MemberList from '../../components/MemberList.vue';
import { onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance, onMounted, ref } from 'vue';

let eventData = ref({})
onLoad((options:any)=>{
    eventData = JSON.parse(options.eventData)
    console.log(eventData.id);
      
})

</script>
<template>
    <view class="detailed">
        <Tag title="比赛详情"></Tag>
        <!-- 表单内容展现 -->
        <view class="detailed_table">
            <uni-forms>
                <uni-forms-item>
                    <image src="@/static/create_calendar.png"/>
                    <p>2022年9月15日 16:30-18:00</p>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_football.png"/>
                    <p>学校操场</p>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_people.png"/>
                    <p>报名：7/10</p>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_application.png"/>
                    <p>十人制足球赛</p>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_coin.png"/>
                    <p>场地费：待定</p>
                </uni-forms-item>
                <!-- 用户 -->
                <uni-forms-item>

                </uni-forms-item>
            </uni-forms>
        </view>
        <Tag title="参与成员"></Tag>
        <!-- 参与成员列表 -->
        <MemberList></MemberList>
        <!-- 信息切换tabs -->

        <!-- 按钮 -->
        <view class="detailed_btn">
            <button class="btn_join">申请加入</button>
            <button class="btn_share">分享给他人</button>
        </view>
    </view>
</template>

<style lang="less" scoped>
.detailed{
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: radial-gradient(168.54% 168.54% at 50% 168.54%, #D9DAFF 0%, #FFFFFF 82.89%, #DDDEFD 100%);
    box-sizing: border-box;
    padding: 40rpx 10rpx;
    .detailed_table{
        width: 100%;
        background-color: #fff;
        box-shadow: 0rpx 4rpx 4rpx rgba(0, 0, 0, 0.25);
        border-radius: 10rpx;
        box-sizing: border-box;
        padding: 10rpx 20rpx;
        margin-bottom: 20rpx;
        /deep/ .is-direction-left{
            margin-bottom: 20rpx;
        }
        /deep/ .uni-forms-item__content{
            display: flex;
            align-items: center;
        }
        
        image{
            width: 40rpx;
            height: 40rpx;
            margin-right: 20rpx;
        }
    }
    .detailed_btn{
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 10rpx;
        position: fixed;
        bottom: 0rpx;
        left: 0rpx;
        /deep/ button::after{
            border: 0rpx;
        }
        .btn_join{
            width: 50%;
            box-sizing: border-box;
            margin-right: 20rpx;
            font-size: 30rpx;
            font-weight: bolder;
            border:5rpx solid #6467F0;
            color: #6467F0;
            background-color: #D9DAFF;
        }
        .btn_share{
            width: 50%;
            box-sizing: border-box;
            margin-left: 20rpx;
            font-size: 30rpx;
            font-weight: bolder;
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #FE6700;
            color: #ff6700;
            border: 5rpx solid #ff6700;
        }
    }
}
</style>