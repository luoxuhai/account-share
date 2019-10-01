import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';

@connect(({ common }) => ({
  ...common
}))
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

  componentWillMount() {
    Taro.showNavigationBarLoading();
    this.props.dispatch({
      type: 'common/login'
    });

    Taro.cloud
      .callFunction({
        name: 'getList'
      })
      .then(res => {
        const { list } = res.result;
        this.setState(
          {
            list
          },
          () => {
            Taro.hideNavigationBarLoading();
          }
        );
      });
  }

  handleEnterClick = (id, title, cover) => {
    Taro.navigateTo({
      url: `/pages/detail/index?_id=${id}&title=${title}&cover=${cover}`
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
              onClick={() =>
                this.handleEnterClick(item._id, item.title, item.cover)
              }
            />
          ))}
        </AtList>
      </View>
    );
  }
}
