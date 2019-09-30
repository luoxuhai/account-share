import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import {
  AtFab,
  AtActionSheet,
  AtActionSheetItem,
  AtCard,
  AtButton,
  AtIcon
} from 'taro-ui';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: ''
  };

  state = {
    isOpened: false,
    cover: ''
  };
  componentWillMount() {
    const { title } = this.$router.params;
    Taro.setNavigationBarTitle({
      title
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
        {/* <Image></Image> */}
        <Text className='container__desc'>
          提供免费的文件保存和下载加速服务
        </Text>
        <AtCard
          className='container__card'
          title='特别提示'
          thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
        >
          这也是内容区 可以随意定义功能这也是内容区 可以随意定义功能这也是内容区
          可以随意定义功能这也是内容区 可以随意定义功能这也是内容区
          可以随意定义功能这也是内容区 可以随意定义功能
        </AtCard>
        <View className='way__container'>
          <View className='way__item'>
            <AtIcon value='mail' size='20' color='#f28e16'></AtIcon>
            <View className='way__item-text'>
              <Text>分享得积分</Text>
            </View>
            <AtButton
              className='way__item-button'
              size='small'
              type='secondary'
            >
              复制
            </AtButton>
          </View>
          <View className='way__item'>
            <AtIcon value='eye' size='25' color='#f28e16'></AtIcon>
            <View className='way__item-text'>
              <Text>分享得积分</Text>
            </View>
            <AtButton
              className='way__item-button'
              size='small'
              type='secondary'
            >
              复制
            </AtButton>
          </View>
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
