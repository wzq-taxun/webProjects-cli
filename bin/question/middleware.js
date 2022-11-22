export default () => {
  return {
    type: "checkbox",
    name: 'middleware',
    message: '请选择要安装的依赖包',
    choices: [{
      name: 'koaStatic'
    }, {
      name: 'koaRouter'
    }]
  }
}