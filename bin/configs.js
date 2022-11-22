
export default (configsval) => {
  function doconfigs(name) {
    return  configsval.middleware && configsval.middleware.indexOf(name) !== -1;
  };
  return {
    packageName: configsval.packageName,
    port: configsval.port,
    middleware: {
      router: doconfigs('koaRouter'),
      static: doconfigs('koaStatic'),
      body: false,
      views: false,
    }
  }
}


export const codeType = {
  nd: 'node服务',
  mini: '小程序'
}