import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import dva from './utils/dva';
import models from './models';
import Home from './pages/home/index';
import './app.scss';
 
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: ['pages/home/index', 'pages/user/index', 'pages/detail/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#707070',
      selectedColor: '#f28e16',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: 'assets/tabs/home.png',
          selectedIconPath: 'assets/tabs/home-active.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: 'assets/tabs/user.png',
          selectedIconPath: 'assets/tabs/user-active.png'
        }
      ]
    },
    cloud: true,
    style: 'v2'
  };

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
