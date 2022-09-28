const dataList = {
    userEventList:[
        // {
        //     id:'001',
        //     time:'2022.9.14',
        //     place:'',
        //     type:'',
        //     title:'',
        //     limit:20,
        //     charge:'',
        //     tags:[

        //     ],
        //     description:'',
        //     isSecret:false,
        //     isAudit:true,
        //     author:{

        //     },
        //     memberlist:[
        //         {
        //             wx_id:"",
        //             name:'',
        //             phone:'',
        //             avatar:''
        //         }
        //     ]
        // },
        {
            id:'001',
            time:'2022.9.26',
            title:'本周一十人场',
            limit:20,
            author:{
                wx_id:"0001",
                name:'csj',
                phone:'18050002369',
                avatar:''
            }
        },
        {
            id:'002',
            time:'2022.9.26',
            title:'本周一十人场',
            limit:20,
            author:{
                wx_id:"0001",
                name:'csj',
                phone:'18050002369',
                avatar:''
            }
        },
        {
            id:'003',
            time:'2022.9.26',
            title:'本周一十人场',
            limit:20,
            author:{
                wx_id:"0001",
                name:'csj',
                phone:'18050002369',
                avatar:''
            }
        },
    ]
}

export default [
    // getUserEventList
    {
        url:'/mock/home/userEventList',
        type:'get',
        response:()=>{
            return {
                code:200,
                message:"请求成功",
                data:dataList.userEventList
            }
        }
    },
]