<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';

</script>
<template>
    <view class="create">
        <uni-forms>
            <!-- 下拉选择 -->
            <view class="create_box">
                <uni-forms-item>
                    <image src="@/static/create_calendar.png"/>
                    <p>活动时间</p>
                    <uni-data-select
                        placeholder="请选择活动进行时间"
                    ></uni-data-select>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_football.png"/>
                    <p>活动地点</p>
                    <uni-data-select
                        placeholder="请填写地理位置"
                    ></uni-data-select>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_application.png"/>
                    <p>活动类型</p>
                    <uni-data-select
                        placeholder="请选择活动类型"
                    ></uni-data-select>
                </uni-forms-item>
            </view>
            <!-- 输入 -->
            <view class="create_box">
                <uni-forms-item>
                    <image src="@/static/create_people.png"/>
                    <p>报名人数</p>
                    <uni-easyinput
                        placeholder="请填写报名人数"                    
                    >
                    </uni-easyinput>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_coin.png"/>
                    <p>收费标准</p>
                    <uni-easyinput
                        placeholder="自定义本次活动场地收费"                    
                    >
                    </uni-easyinput>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_application.png"/>
                    <p>活动标签</p>
                    <uni-easyinput
                        placeholder="请填写报名人数"  
                        disabled:true                  
                    >
                    </uni-easyinput>
                </uni-forms-item>
                <view class="tagList">
                    <!-- 遍历标签列表 -->
                    <uni-tag text="+"></uni-tag>
                    <uni-tag text="新标签"></uni-tag>
                </view>
            </view>
            <!-- 多行文本 -->
            <view class="create_box">
                <uni-forms-item>
                    <image src="@/static/create_text.png"/>
                    <p>活动公告</p>
                </uni-forms-item>
                <uni-forms-item>
                    <uni-easyinput
                        type="textarea"
                        placeholder="请输入本次活动的相关公告"
                        autoHeight
                    ></uni-easyinput>
                </uni-forms-item>
            </view>
            <!-- 设置按钮 -->
            <view class="create_box">
                <uni-forms-item>
                    <image src="@/static/create_lock.png"/>
                    <p>私密活动</p>
                    <switch color="#6467F0" style="transform:scale(0.6);position: absolute;right: 0rpx;"></switch>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_stamp.png"/>
                    <p>审批活动</p>
                    <switch color="#6467F0" style="transform:scale(0.6);position: absolute;right: 0rpx;"></switch>
                </uni-forms-item>
            </view>
            <!-- 按钮+模板 -->
            <view class="create_submitBox">
                <checkbox color="#6467F0">是否保存为模板</checkbox>
                <view class="create_submitBox_btn">
                    <button class="btn_loading">载入模板</button>
                    <button class="btn_createAction">创建活动</button>
                </view>
            </view>
        </uni-forms>
    </view>
</template>

<style lang="less" scoped>
.create{
    width: 100%;
    height: 100vh;
    background: radial-gradient(168.54% 168.54% at 50% 168.54%, #D9DAFF 0%, #FFFFFF 82.89%, #DDDEFD 100%);
    box-sizing: border-box;
    padding: 60rpx 10rpx;
    .create_box{
        width: 100%;
        // height: 300rpx;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
        margin-bottom: 60rpx;
        box-sizing: border-box;
        padding: 10rpx 20rpx;
        /deep/ .uni-forms-item{
            margin-bottom: 20rpx;
        }
        /deep/ .uni-forms-item__content{
            display:flex;
            align-items: center;
            width: 90%;
            position: relative;
            // border-bottom: 1px solid #efefef;
        }
        /deep/ .uni-select{
            border: 0px;
        }
        /deep/ .uni-stat-box{
            display: flex;
            align-items: center;
            height: 40rpx;
            // background-color: #D9DAFF;
        }
        /deep/ .uni-select__input-box{
            
            height: 60rpx;
        }
        image{
            width: 40rpx;
            height: 40rpx;
        }
        p{
            font-size:24rpx;
            padding-left:20rpx;
            font-weight:bolder;
        }
        // 强化输入框
        /deep/ .uni-easyinput__content{
            background-color:#D9DAFF;
            border: 0px;
        }
        /deep/ .uni-input-placeholder{
            text-align: right;
        }
        /deep/ .uni-input-input{
            text-align: right;
        }
        .tagList{
            box-sizing: border-box;
            margin-bottom: 20rpx;
        }
        // tag标签
        /deep/ .uni-tag{
            background-color: #efefef;
            border: 0px;
            color: #808080;
            font-weight: bolder;
            margin-right: 20rpx;
        }
    }
    .create_submitBox{
        /deep/ .uni-checkbox-wrapper{
            font-size: 30rpx;
            margin-bottom: 20rpx;
        }
        /deep/ .uni-checkbox-input{
            border-radius: 50%;
            opacity: 0.8;
            border: 2rpx solid #6467F0;
            margin-right: 20rpx;
        }
        .create_submitBox_btn{
            display: flex;
            .btn_loading{
                width: 50%;
                box-sizing: border-box;
                margin-right: 10rpx;
                font-weight: bolder;
                color: #6467F0;
                background-color: #D9DAFF;
            }
            .btn_createAction{
                width: 50%;
                box-sizing: border-box;
                margin-left: 10rpx;
                font-weight: bolder;
                color: #fff;
                background-color: #6467F0;
            }
        }
    }
    
}
</style>