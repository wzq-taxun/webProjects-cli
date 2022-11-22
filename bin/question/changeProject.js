export default () => {
  return {
    type: "list",
    name: 'nameProject',
    message: '请选择创建项目类型',
    choices: [{
      name: '小程序'
    }, {
      name: 'node服务'
    }]
  }
}