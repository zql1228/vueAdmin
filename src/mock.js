const Mock=require('mockjs')
const Random=Mock.Random  //用于生成各种随机数据
let result={
    code:200,
    msg:'操作成功',
    data:null
}
//Mock.mock()用于生成模拟数据
Mock.mock('/captcha','post',()=>{
    return {
        code: 200,
        msg: '操作成功',
        data: {
            token: Random.string(32),
            capImg: Random.dataImage('120x40', 'p7n5w')
        }
    }
})
Mock.mock('/login','post',(config)=>{
    return {
        code:400,
        msg:'验证码错误',
        data:null
    }
})