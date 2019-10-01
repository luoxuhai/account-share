import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    openid: Taro.getStorageSync('openid') || '',
    integral: 0
  },

  effects: {
    *login(_, { put }) {
      const { openid, integral } = (yield Taro.cloud.callFunction({
        name: 'login'
      })).result.user;

      if (openid) {
        yield put({
          type: 'saveOpenid',
          payload: openid
        });
        yield put({
          type: 'saveIntegral',
          payload: integral
        });
      }
    },

    *putIntegral({ payload: integral }, { put }) {
      yield Taro.cloud.callFunction({
        name: 'putIntegral',
        data: {
          integral
        }
      });

      yield put({
        type: 'saveIntegral',
        payload: integral
      });
    }
  },

  reducers: {
    saveIntegral(state, { payload }) {
      return { ...state, integral: payload };
    },

    saveOpenid(state, { payload }) {
      Taro.setStorageSync('openid', payload);
      return { ...state, openid: payload };
    }
  }
};
