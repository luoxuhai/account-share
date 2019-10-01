import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '账号分享',
    navigationBarTextStyle: 'black'
  };

  state = {
    list: [
      {
        title: '百度云VIP',
        updatedAt: '更新时间: 2019-09-30 07:44:10',
        cover:
          'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
      },
      {
        title: '百度云VIP',
        updatedAt: '更新时间: 2019-09-30 07:44:10',
        cover:
          'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
      },
      {
        title: '百度云VIP',
        updatedAt: '更新时间: 2019-09-30 07:44:10',
        cover:
          'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
      }
    ]
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleEnterClick = (id, title, cover) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&title=${title}&cover=${cover}`
    });
    Taro.showNavigationBarLoading();
  };

  render() {
    return (
      <View className='index'>
        <AtList>
          {this.state.list.map((item, index) => (
            <AtListItem
              key={index}
              title={item.title}
              note={item.updatedAt}
              arrow='right'
              thumb={item.cover}
              onClick={() => this.handleEnterClick(item._id, item.title, item.cover)}
            />
          ))}
        </AtList>
      </View>
    );
  }
}
