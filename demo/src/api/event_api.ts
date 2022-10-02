export function goDetailed(data:any){
    uni.navigateTo({url:'../../subpages/detailed/detailed?eventData='+JSON.stringify(data)})
    console.log(data.id);
}
