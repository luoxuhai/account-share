import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  AtFab,
  AtActionSheet,
  AtActionSheetItem,
  AtCard,
  AtButton,
  AtIcon,
  AtDivider,
  AtActivityIndicator
} from 'taro-ui';
import './index.scss';

@connect(({ common }) => ({
  ...common
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: ''
  };

  isShare = false;

  _id = '';

  state = {
    isOpened: false,
    cover: '',
    isLoading: false,
    password: '',
    detail: {
      account: '',
      desc: '',
      hint: ''
    }
  };

  componentWillMount() {
    const { title, cover, _id } = this.$router.params;
    Taro.showNavigationBarLoading();
    this._id = _id;
    Taro.setNavigationBarTitle({
      title
    });

    this.setState({
      cover
    });

    Taro.cloud
      .callFunction({
        name: 'getDetail',
        data: {
          _id
        }
      })
      .then(res => {
        const detail = res.result;
        this.setState(
          {
            detail
          },
          () => {
            Taro.hideNavigationBarLoading();
          }
        );
      });

    this.props.dispatch({
      type: 'common/login'
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

  handleGetPassClick = () => {
    const { integral } = this.props;
    if (integral <= 0)
      Taro.showModal({
        title: '提示',
        content: '积分不足, 请先领取积分',
        confirmColor: '#f28e16',
        success(res) {
          if (res.confirm) {
            Taro.switchTab({
              url: '/pages/user/index'
            });
          }
        }
      });
    else {
      this.setState({
        isLoading: true
      });
      Taro.cloud
        .callFunction({
          name: 'getPassword',
          data: {
            _id: this._id
          }
        })
        .then(res => {
          const { password } = res.result;
          this.setState({
            isLoading: false,
            password
          });
          this.props.dispatch({
            type: 'common/putIntegral',
            payload: integral - 1
          });
        });
    }
  };

  handleShareClick = () => {
    this.isShare = true;
  };

  handleClipboardClick = data => {
    if (data)
      Taro.setClipboardData({
        data
      });
  };

  render() {
    const { password, cover, detail, isOpened, isLoading } = this.state;
    return (
      <View className='container'>
        <Image className='container__cover' src={cover} />
        <AtDivider className='container__divider' lineColor='#f28e16'>
          <AtIcon value='sketch' />
        </AtDivider>
        <Text className='container__desc'>{detail.desc}</Text>
        <AtCard
          className='container__card'
          title='特别提示'
          thumb={require('../../assets/images/tip.svg')}
        >
          {detail.account ? (
            detail.hint
          ) : (
            <AtActivityIndicator
              mode='center'
              color='#f28e16'
            ></AtActivityIndicator>
          )}
        </AtCard>
        <View className='way__container'>
          <View className='way__account'>
            <AtIcon value='mail' size='20' color='#f28e16'></AtIcon>
            <View className='way__account-text'>
              <Text>{detail.account}</Text>
            </View>
            <AtButton
              className='way__account-button'
              size='small'
              type='primary'
              onClick={() => this.handleClipboardClick(detail.account)}
            >
              复制
            </AtButton>
          </View>
          <View className='way__pass'>
            <AtIcon value='help' size='20' color='#f28e16'></AtIcon>
            <View className='way__pass-text'>
              <Text>{password}</Text>
            </View>
            <Text className='way__pass-tip'>有效期为1天, 每天更新</Text>
          </View>
          {password ? (
            <AtButton
              className='way__get-button'
              type='primary'
              onClick={() => this.handleClipboardClick(password)}
            >
              复制密码
            </AtButton>
          ) : (
            <AtButton
              className='way__get-button'
              type='primary'
              loading={isLoading}
              onClick={this.handleGetPassClick}
            >
              获取密码
            </AtButton>
          )}
        </View>
        <View className='float-button'>
          <AtFab onClick={this.onButtonClick}>
            <Text className='at-fab__icon at-icon at-icon-menu'></Text>
          </AtFab>
        </View>
        <AtActionSheet isOpened={isOpened} title='分享得积分' cancelText='取消'>
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
