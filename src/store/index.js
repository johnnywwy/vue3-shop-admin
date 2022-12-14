import { createStore } from "vuex";
import { login, getinfo } from "../api/manager";
import { setToken, removeToken } from "../composables/auth";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},

      // 侧边宽度
      asideWidth: '200px',

      // 菜单相关
      menus: [],

      // 菜单权限相关
      ruleNames: []
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 展开或缩小侧边栏
    toggleAsideWidth(state, asideWidth) {
      state.asideWidth = state.asideWidth === '200px' ? '64px' : '200px'
    },
    // 设置路由
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames
    }
  },
  actions: {
    // 登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 获取当前登录用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            commit("SET_MENUS", res.menus)
            commit("SET_RULENAMES", res.ruleNames)
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //退出登录
    logout({ commit }) {

      // 移除cookies
      removeToken()
      // 清除用户状态
      commit("SET_USERINFO", {});

    }
  },
});

export default store
