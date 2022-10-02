<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref } from 'vue';
// 地理位置数据
let locationData = [
    {
        value:0,
        text:"大操场"
    },
    {
        value:1,
        text:"看台旁小场"
    },
    {
        value:2,
        text:"篮球场旁小场"
    },
    {
        value:3,
        text:"其它"
    }
]
// 活动类型数据
let typeData = [
    {
        value:0,
        text:"五人制"
    },
    {
        value:1,
        text:"七人制"
    },
    {
        value:2,
        text:"十一人制"
    },
    {
        value:3,
        text:"其他"
    }
]
// 表单数据
let formData = {
    time:"",
    location:"",
    type:"",
    title:"",
    limit:"",
    charge:"",
    tags:[],
    description:"",
    isSecret:false,
    isAudit:false,
    author:{
        wx_id:"",
        name:'',
        phone:'',
        avatar:''
    }
}
// 表单校验规则
const rules = {
    time:{
        rules:[{required:true,errorMessage:'请选择日期'}]
    },
    location:{
        rules:[{required:true,errorMessage:'请选择地理位置'}]
    },
    type:{
        rules:[{required:true,errorMessage:'请选择活动类型'}]
    },
    title:{
        rules:[{required:true,errorMessage:'活动名称不能为空'}]
    },
    limit:{
        rules:[{required:true,errorMessage:'报名人数不能为空'}]
    },
    charge:{
        rules:[{required:true,errorMessage:'活动场地收费不能为空'}]
    }
}
 
const form = ref()
// 提交表单
const submitForm = ()=>{
    console.log(formData);
    form.value.validate().then((res:any) =>{
        console.log(res);
    }).catch((err:any)=>{
        console.log(err);
    })
    
}
onReady(()=>{
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    // form.value.setRules(formData)
    console.log(form.value);
    
})
</script>
<template>
    <view class="create">
        <uni-forms 
            :modelValue="formData"
            :rules="rules"
            ref="form"
        >
            <!-- 下拉选择 -->
            <view class="create_box">
                <uni-forms-item name="time">
                    <image src="@/static/create_calendar.png"/>
                    <p>活动时间</p>
                    <uni-datetime-picker
                        placeholder="请选择日期"
                        v-model="formData.time"
                    ></uni-datetime-picker>
                </uni-forms-item>
                <uni-forms-item name="location">
                    <image src="@/static/create_football.png"/>
                    <p>活动地点</p>
                    <uni-data-select
                        placeholder="请填写地理位置"
                        :localdata="locationData"
                        v-model="formData.location"
                    ></uni-data-select>
                </uni-forms-item>
                <uni-forms-item name="type">
                    <image src="@/static/create_application.png"/>
                    <p>活动类型</p>
                    <uni-data-select
                        placeholder="请选择活动类型"
                        :localdata="typeData"
                        v-model="formData.type"
                    ></uni-data-select>
                </uni-forms-item>
            </view>
            <!-- 输入 -->
            <view class="create_box">
                <uni-forms-item name="title" required>
                    <image src="@/static/create_people.png"/>
                    <p>活动名称</p>
                    <uni-easyinput
                        placeholder="请输入活动名称"  
                        v-model="formData.title"                  
                    >
                    </uni-easyinput>
                </uni-forms-item>
                <uni-forms-item name="limit">
                    <image src="@/static/create_people.png"/>
                    <p>报名人数</p>
                    <uni-easyinput
                        placeholder="请填写报名人数" 
                        v-model="formData.limit"                   
                    >
                    </uni-easyinput>
                </uni-forms-item> 
                <uni-forms-item name="charge">
                    <image src="@/static/create_coin.png"/>
                    <p>收费标准</p>
                    <uni-easyinput
                        placeholder="自定义本次活动场地收费" 
                        v-model="formData.charge"                                           
                    >
                    </uni-easyinput>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_application.png"/>
                    <p>活动标签</p>
                    <uni-easyinput
                        placeholder="请定义活动标签"  
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
                <uni-forms-item name="description">
                    <uni-easyinput
                        type="textarea"
                        placeholder="请输入本次活动的相关公告"
                        v-model="formData.description"
                        autoHeight
                    ></uni-easyinput>
                </uni-forms-item>
            </view>
            <!-- 设置按钮 -->
            <view class="create_box">
                <uni-forms-item>
                    <image src="@/static/create_lock.png"/>
                    <p>私密活动</p>
                    <switch 
                        color="#6467F0" 
                        style="transform:scale(0.6);position: absolute;right: 0rpx;"
                        @change="formData.isSecret = !formData.isSecret"
                    ></switch>
                </uni-forms-item>
                <uni-forms-item>
                    <image src="@/static/create_stamp.png"/>
                    <p>审批活动</p>
                    <switch 
                        color="#6467F0" 
                        style="transform:scale(0.6);position: absolute;right: 0rpx;"
                        @change="formData.isAudit = !formData.isAudit"
                    ></switch>
                </uni-forms-item>
            </view>
            <!-- 按钮+模板 -->
            <view class="create_submitBox">
                <checkbox color="#6467F0">是否保存为模板</checkbox>
                <view class="create_submitBox_btn">
                    <button class="btn_loading">载入模板</button>
                    <button class="btn_createAction" @click="submitForm">创建活动</button>
                </view>
            </view>
        </uni-forms>
    </view>
</template>

<style lang="less" scoped>
.create{
    width: 100%;
    background: radial-gradient(168.54% 168.54% at 50% 168.54%, #D9DAFF 0%, #FFFFFF 82.89%, #DDDEFD 100%);
    box-sizing: border-box;
    padding: 60rpx 20rpx;
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
            margin-bottom: 24rpx;
        }
        /deep/ .uni-forms-item__content{
            display:flex;
            align-items: center;
            width: 90%;
            position: relative;
            // border-bottom: 1px solid #efefef;
        }
        /deep/ .uniui-calendar{
            display: none;
        }
        /deep/ .uni-date{
            padding: 0 10rpx;
        }
        /deep/ .uni-date__x-input{
            padding: 0rpx;
            text-align: left;
            font-size: 20rpx;
        }
        /deep/ .uni-date__icon-clear{
            padding: 0rpx;
        }
        /deep/ .uni-select__input-text{
            text-align: right;
            font-size: 20rpx;
        }
        /deep/ .uni-date-editor--x{
            border: 0rpx;
        }
        /deep/ .uni-date-single{
            padding: 0rpx;
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
            box-sizing: border-box;
            padding: 0 10rpx;
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
        // 表单校验
        /deep/ .msg--active{
            text-align: right;
            padding: 0rpx 10rpx;
            position: absolute;
            right: 0rpx;
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