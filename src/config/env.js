/**
 * 配置编译环境和线上环境之间的切换
 *
 * routerMode: 路由模式
 *
 */
let baseUrl;

if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://47.95.255.230:8080';
} else {
  baseUrl = 'http://47.95.255.230:8080';
}

export {
  baseUrl,
}
