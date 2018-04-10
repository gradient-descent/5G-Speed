// 引入mockjs
const Mock = require('mockjs');

Mock.mock('/speed/now', 'get', {'speedValue|80-100.1-10': 1});
