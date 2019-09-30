import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtAvatar, AtButton } from 'taro-ui';
import share from '../../assets/images/share.svg';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#f28e16',
    navigationBarTextStyle: 'white'
  };

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    });
  }
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onShareAppMessage() {
    return {
      title: 'VIP账号分享',
      path: '/page/home/index',
      imageUrl: ''
    };
  }

  render() {
    return (
      <View className='container'>
        <View className='user__container'>
          <AtAvatar
            circle
            text='头像'
            size='large'
            openData={{ type: 'userAvatarUrl' }}
          ></AtAvatar>
          <View className='user__container-desc'>
            <View className='user__container-name'>
              <open-data type='userNickName' />
            </View>
            <View className='user__container-integration'>
              积分: <View className='integration-text'>15</View>
            </View>
          </View>
        </View>
        <View className='way__container'>
          <View className='way__item'>
            <Image className='way__item-icon' src={share} mode='aspectFill' />
            <View className='way__item-text'>
              <Text>分享得积分</Text>
            </View>
            <AtButton
              className='way__item-button'
              openType='share'
              size='small'
              type='secondary'
            >
              分享
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
