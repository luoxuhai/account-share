import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import {
  AtFab,
  AtActionSheet,
  AtActionSheetItem,
  AtCard,
  AtButton,
  AtIcon,
  AtDivider
} from 'taro-ui';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: ''
  };

  state = {
    isOpened: false,
    cover: '',
    detail: {
      desc: '提供免费的文件保存和下载加速服务',
      hint:
        '提供免费的文件保存和下载加速服务提供免费的文件保存和下载加速服务提供免费的文件保存和下载加速服务提供免费的文件保存和下载加速服务提供免费的文件保存和下载加速服务',
      
    }
  };
  componentWillMount() {
    const { title, cover } = this.$router.params;
    Taro.setNavigationBarTitle({
      title
    });
    this.setState({
      cover
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onButtonClick = () => {
    this.setState({
      isOpened: true
    });
  };

  handleToHomeClick = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    });
  };

  handleShareClick = () => {};

  render() {
    return (
      <View className='container'>
        <Image className='container__cover' src={this.state.cover} />
        <AtDivider className='container__divider' lineColor='#f28e16'>
          <AtIcon value='sketch' />
        </AtDivider>
        <Text className='container__desc'>
        {this.state.detail.desc}
        </Text>
        <AtCard
          className='container__card'
          title='特别提示'
          thumb={require('../../assets/images/tip.svg')}
        >
          {this.state.detail.hint}
        </AtCard>
        <View className='way__container'>
          <View className='way__account'>
            <AtIcon value='mail' size='20' color='#f28e16'></AtIcon>
            <View className='way__account-text'>
              <Text>分享得积分</Text>
            </View>
            <AtButton
              className='way__account-button'
              size='small'
              type='primary'
            >
              复制
            </AtButton>
          </View>
          <View className='way__pass'>
            <AtIcon value='help' size='20' color='#f28e16'></AtIcon>
            <View className='way__pass-text'>
              <Text>分享得积分</Text>
            </View>
            <Text className='way__pass-tip'>有效期为1天, 每天更新</Text>
          </View>
          <AtButton className='way__get-button' type='primary'>
            获取密码
          </AtButton>
        </View>
        <View className='float-button'>
          <AtFab onClick={this.onButtonClick}>
            <Text className='at-fab__icon at-icon at-icon-menu'></Text>
          </AtFab>
        </View>
        <AtActionSheet isOpened={this.state.isOpened} title='分享得积分'>
          <AtActionSheetItem onClick={this.handleToHomeClick}>
            首页
          </AtActionSheetItem>
          <AtActionSheetItem
            className='sheet__item'
            onClick={this.handleShareClick}
          >
            <Button className='share' openType='share' />
            分享
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
