import Taro from '@tarojs/taro';

export default {
  namespace: 'global',
  state: {
    access_token: Taro.getStorageSync('access_token'),
    nickname: Taro.getStorageSync('user_info')
      ? Taro.getStorageSync('user_info').nickname
      : ''
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
