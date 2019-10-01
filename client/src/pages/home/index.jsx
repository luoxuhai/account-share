import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import moment from 'moment';
import './index.scss';

@connect(({ common }) => ({
  ...common
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '账号分享',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
    backgroundColor: '#f7f7f7'
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
    this.onLoad();
    this.props.dispatch({
      type: 'common/login'
    });
  }

  onPullDownRefresh() {
    this.onLoad();
  }

  onLoad = () => {
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
            Taro.stopPullDownRefresh();
          }
        );
      });
  };

  handleEnterClick = (id, title, cover) => {
    Taro.navigateTo({
      url: `/pages/detail/index?_id=${id}&title=${title}&cover=${cover}`
    });
  };

  render() {
    return (
      <View className='conatiner'>
        <AtList>
          {this.state.list.map((item, index) => (
            <AtListItem
              key={index}
              title={item.title}
              note={moment(item.updatedAt).format('YYYY年MM月DD日 HH:mm:ss')}
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
