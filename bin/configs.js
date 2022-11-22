
export default (configsval) => {
  function doconfigs(name) {
    return configsval.middleware.indexOf(name) !== -1;
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