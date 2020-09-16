import {AccountService} from '../services/AccountService';
import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE, COLOR} from '../resource';
import {AlertService, NavigationService} from '../services';
import {AppText} from '../../elements/AppText';
import {KEY_NAVIGATION} from '../keys';

const renderAlert = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(248,248,248)',
        width: SIZE.width(60),
        alignSelf: 'center',
        borderRadius: SIZE.border_radius,
        overflow: 'hidden',
      }}>
      <AppText
        style={{
          marginVertical: 30,
          fontSize: SIZE.H5,
          marginHorizontal: 20,
        }}>
        アプリ会員ログイン後、利用可能な機能です。未会員の方は新規会員登録、既に会員の方はログイン後、ご利用になれます。
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            borderTopWidth: 1,
            borderColor: '#E8E9E8',
            padding: 16,
            width: '50%',
          }}
          onPress={() => {
            AlertService.hideModal();

            NavigationService.navigate(keyNavigation.GUIDE);
          }}>
          <AppText
            style={{
              textAlign: 'center',
              fontSize: SIZE.H5,
              color: COLOR.blue_light_3,
            }}>
            次へ
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderColor: '#E8E9E8',
            padding: 16,
            width: '50%',
          }}
          onPress={() => {
            AlertService.hideModal();
          }}>
          <AppText
            style={{
              textAlign: 'center',
              fontSize: SIZE.H5,
              color: COLOR.red,
            }}>
            キャンセル
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Kiểm tra tất cả màn hình chứa các Key nào phải kiểm tra đăng nhập:
const checkUserLogin = (screen) => {
  const account = AccountService.getAccount();
  if (
    screen === KEY_NAVIGATION.CERTIFICATE_MEMBER ||
    screen === KEY_NAVIGATION.MY_PAGE ||
    screen === KEY_NAVIGATION.COUPON ||
    screen === 'STORE_BOOKMARKED' ||
    screen === KEY_NAVIGATION.SECURE ||
    screen === KEY_NAVIGATION.BOOKMARK_STORE ||
    screen === KEY_NAVIGATION.QR
  ) {
    if (account) {
      return true;
    }
    AlertService.showModal(renderAlert);
    return false;
  }
  return true;
};

export {checkUserLogin};
