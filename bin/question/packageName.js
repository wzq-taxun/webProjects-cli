export default () => {
  return {
    type: "input",
    name: 'packageName',
    message: '请输入创建包名称',
    validate(val) {
      if (val) return true;
      return '不能为空'
    }
  };
}