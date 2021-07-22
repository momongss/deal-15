module.exports =
  (asyncMiddlewareFunction) =>
  (...args) =>
    asyncMiddlewareFunction(...args).catch(args[2]);
