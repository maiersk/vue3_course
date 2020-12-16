import {createStore} from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      isLoginOpen: false,
      authUser: {},
    }
  },
  mutations: {
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setAuthUser(state, payload) {
      state.authUser = payload;
    },
    setLoginModal(state, payload) {
      state.isLoginOpen = payload;
    }
  },
  actions: {
    setAuthUser({commit}, payload) {
      commit("setAuthUser", payload)
    }
  },
  // 模块都拥有自己的state，mutaion，action，getter甚至是嵌套子模块
  modules: {
    modulaA: {
      state() {
        return {
          count: 1,
        }
      },
      mutations: {
        increment(state) {
          // 这里是state是模块的局部状态
          state.count++;
        },
      },
      getters: {
        doubleCount(state) {
          return state.count * 2;
        },
        sumWithRootCount (state, getters, rootState) {
          // 对于模块内部的getter，根结点状态会作为第三个参数暴露出来
          return state.count + rootState.count
        }
      },
      actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
          // actions的根结点state使用rootstate
          if ((state.count + rootState.count) % 2 === 1) {
            commit('increment');
          }
        }
      }
    },
  },
})

export default store;