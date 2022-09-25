// import Mock from 'mockjs'  
const Mock = require('mockjs')
Mock.setup({
    timeout:'200-600'
})

let configArray = []

const file = require.context('.', true, /\.js$/)
file.keys().forEach(key=>{
	if(key === './index.js') return 
	configArray = configArray.contact(file(key).default)
})

configArray.forEach(item =>{
	for(const [path, target] of Object.entries()item){
		const protocol = path.split('|')
		Mock.mock(new RegExp('^' + protocal[1]), target)
	}
})