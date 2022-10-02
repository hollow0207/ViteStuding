<script lang="ts" setup>
import Search from '@/components/Search.vue';
import Tag from '@/components/Tag.vue';
import { onLoad } from '@dcloudio/uni-app';
import Selection from '../../components/Selection.vue';
import {getAllEventList, getUserEventList} from '../../api/home_api'
import {ref, reactive, defineComponent} from 'vue'
import Event from '../../components/Event.vue';

let userEventList:any = ref({})
let allEventList:any = ref({})
onLoad(()=>{
    getUserEventList().then((res:any)=>{
        userEventList.value = res.data.data
    })

    getAllEventList().then((res:any)=>{
        allEventList.value = res.data.data
    })
    console.log(userEventList);
    console.log(allEventList);
    
})
</script>
<template>
    <view class="home">
        <!-- 搜索组件 -->
        <Search></Search>
        <!-- 我的活动 -->
        <Tag title="我的活动"></Tag>
        <view class="home_mine">
            <!-- 我的活动列表 -->
            <scroll-view 
                class="home_mine_list" 
                scroll-y="true"   
                show-scrollbar="false"             
            >
                <view class="home_mine_item" v-for="(item,i) in userEventList" :key="i">
                    <Event
                        :time="item.time"
                        :title="item.title"
                        :limit="item.limit"
                    ></Event>
                </view>
            </scroll-view>
            <!-- 创建我的活动 -->
            <view class="home_mine_create">
                <view class="home_mine_create_add">
                    <image src="@/static/createAction.png"/>
                </view>
                <view class="home_mine_create_text">
                    创建我的活动
                </view>
            </view>
        </view>
        <!-- 筛选器 -->
        <Selection></Selection>
        <scroll-view 
            class="home_allEvent_list"
            scroll-y="true"   
            show-scrollbar="false"    
        >
            <view class="home_allEvent_item" v-for="(item,i) in allEventList" :key="i">
                <Event
                    :data="item"
                    isAllEvent
                    :title="item.title"
                    :time="item.time"
                    :limit="item.limit"
                ></Event>
            </view>
        </scroll-view>
    </view>
</template>
<style lang="less" scoped>
.home{
    padding: 20rpx;
    .home_mine{
        width: 100%;
        height: 300rpx;
        background: linear-gradient(103.75deg, rgba(12, 17, 210, 0.4) 44.62%, #6467F0 74.42%);
        box-shadow: 0rpx 4rpx 4rpx rgba(0, 0, 0, 0.25);
        border-radius: 5rpx;
        box-sizing: border-box;
        padding: 20rpx;
        display: flex;
        .home_mine_list{
            height: 100%;
            width: 70%;
            // background-color: aqua;
            box-sizing: border-box;
            margin-right: 20rpx;
            .home_mine_item{
                height: 100rpx;
                box-sizing: border-box;
                margin-bottom: 20rpx;
            }
        }
        .home_mine_create{
            height: 100%;
            width: 30%;
            display: flex;
            flex-direction: column;
            .home_mine_create_add{
                flex: 1;
                width: 100%;
                height: 60%;
                background-color: rgba(209, 209, 251);
                border-radius: 10rpx;
                margin-bottom: 20rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                image{
                    width: 50rpx;
                    height: 50rpx;
                }
            }
            .home_mine_create_text{
                font-weight: 700;
                font-size: 30rpx;
                color:rgba(209, 209, 251);
                margin: 0 auto;
                text-align: center;
            }
        }
    }
    .home_allEvent_list{
        .home_allEvent_item{
            box-sizing: border-box;
            width: 100%;
            height: 150rpx;
            margin-bottom: 20rpx;
        }
    }
}
</style>