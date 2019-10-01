import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image, Text } from '@tarojs/components';
import { AtAvatar, AtButton } from 'taro-ui';
import './index.scss';

@connect(({ common }) => ({
  ...common
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#f28e16',
    navigationBarTextStyle: 'white'
  };

  isShare = false;

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    });
  }

  componentDidShow() {
    if (this.isShare) {
      this.props.dispatch({
        type: 'common/putIntegral',
        payload: this.props.integral + 1
      });
      this.isShare = false;
    }
  }

  onShareAppMessage() {
    return {
      title: 'VIP账号分享',
      path: '/page/home/index',
      imageUrl: ''
    };
  }

  handleShareClick = () => {
    this.isShare = true;
  };

  render() {
    const { integral } = this.props;
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
              积分：<View className='integration-text'>{integral}</View>
            </View>
          </View>
        </View>
        <View className='way__container'>
          <View className='way__item'>
            <Image
              className='way__item-icon'
              src={require('../../assets/images/share.svg')}
              mode='aspectFill'
            />
            <View className='way__item-text'>
              <Text>分享得积分</Text>
              <Text>每次分享可获得1积分</Text>
            </View>
            <AtButton
              className='way__item-button'
              openType='share'
              size='small'
              type='secondary'
              onClick={this.handleShareClick}
            >
              分享
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
