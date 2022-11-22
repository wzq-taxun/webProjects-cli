export default () => {
  return {
    type: "input",
    name: 'port',
    message: '请输入端口号',
    default: () => {
      return 8080;
    }
  };
}