// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import VueAxios from "vue-axios";
import 'babel-polyfill';

// import 'element-ui/lib/theme-chalk/index.css';

import "./assets/css/element-variables.scss"
import "./assets/css/font-awesome.min.css";
import "./assets/css/el-custom.css"
import "./assets/js/util.js";
import "./assets/js/api.js";

let md5 = require("crypto-js/md5");
// require('echarts/extension/bmap/bmap');

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(router);

axios.defaults.withCredentials = true;
Vue.config.productionTip = true;

axios.get("serverconfig.json").then((result) => {
  localStorage.setItem("deviceUrl", result.data.deviceUrl);
  localStorage.setItem("userUrl", result.data.userUrl);
  localStorage.setItem("bookUrl", result.data.bookUrl);
  sessionStorage.setItem("user", JSON.stringify(result.data.user));

  Vue.prototype.$userUrl = result.data.userUrl;
  axios.defaults.baseURL = result.data.deviceUrl;
  Vue.prototype.bookUrl = result.data.bookUrl;
}).catch((error) => {
  window.console.log(error)
});
Vue.prototype.bookUrl = localStorage.getItem("bookUrl");
axios.defaults.baseURL = localStorage.getItem("deviceUrl");
Vue.prototype.$userUrl = localStorage.getItem("userUrl");

Vue.prototype.bookUrl = "https://www.yaojia.com/educate-book-web/";

axios.defaults.baseURL = "https://www.yaojia.com/educate-device-web/";

Vue.prototype.$userUrl = "https://www.yaojia.com/educate-ucenter-web/";

Vue.prototype.$post = function (baseType, path, param, successMsg, failMsg, isLogin) {
  let config;
  // if (sessionStorage.getItem("user")) {
  //   let userId = JSON.parse(sessionStorage.getItem("user")).userId;
  //   if (userId) {
  //     if (!param) {
  //       param = {}
  //     }
  //     let stringify = JSON.stringify(param);
  //     let token = md5(stringify + userId + "key-hz-20180123").toString();
  //     config = {headers: {token: token, tokenId: userId}};
  //   }
  // }

  if (baseType === 1) {//用户中心url --0：代表设备url
    path = Vue.prototype.$userUrl + path;
  } else if (baseType === 2) {//绘本url
    path = Vue.prototype.bookUrl + path;
  }

  return axios.post(path, param, config).then((res) => {
    let data = res.data;
    if ("000000" === data.code) {
      if (successMsg !== undefined) {
        this.$message({message: successMsg, type: 'success'});
      }
      if (data === undefined) {
        data = {};
      }
      return data;
    } else {
      if (isLogin !== undefined) {
        return data;
      }
    }
    if (failMsg !== undefined) {
      return Promise.reject(failMsg);
    }

    return Promise.reject(data.msg);
  }).catch((err) => {
    if (err == "Error: Network Error") {
      vue.$message.error("服务器开小差了，请重试");
    } else if (err == "Check Code incorret.") {
      vue.$message.error("验证码错误");
    } else {
      vue.$message.error(err);
    }
  });
};

Vue.use(VueAxios, axios);

router.beforeEach((to, from, next) => {
  // let user = JSON.parse(sessionStorage.getItem('user'));
  // if (to.path === '/login' && from !== '/login' && user) {//登录后不能返回到登录页
  //   return;
  // }
  // if (!user && to.path !== '/login') {
  //   next({path: '/login'})
  // } else {
  next();
  // }
  if (to.path === '/jingle') {
    next()
  }
});
/* eslint-disable no-new */
new Vue({el: '#app', router, components: {App}, template: '<App/>'});
