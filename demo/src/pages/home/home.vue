<script lang="ts">
import Search from '@/components/Search.vue';
import Tag from '@/components/Tag.vue';
import { onLoad } from '@dcloudio/uni-app';
import Selection from '../../components/Selection.vue';
import {getUserEventList} from '../../api/home_api'
import {ref, reactive, defineComponent} from 'vue'

export default defineComponent({
    name:'home',
    components:{
        Search,
        Tag,
        Selection,
    },
    setup(){
        let obj:any = ref({})
        onLoad(()=>{
            getUserEventList().then((res:any)=>{
                // obj.value = {...res.data.data}
                obj.value = res.data.data
            })
            console.log(obj);
        })

        return {
            obj
        }
    }
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
            <view class="home_mine_list">
                <view v-for="(item,i) in obj" :key="i">
                    {{item.id}}
                </view>
            </view>
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
}
</style>