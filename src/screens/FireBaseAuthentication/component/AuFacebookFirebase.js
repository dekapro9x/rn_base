//Library:
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {View, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';

//Setup:
import {AppImage, AppText} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';
import DetailInfoAccountFaceBook from '../items/DetailInfoAccountFaceBook';

//API cung cấp thông tin người dùng: https://developers.facebook.com/docs/graph-api/reference/user/?locale=vi_VN
//Bộ công cụ Tets API FB: https://developers.facebook.com/tools/explorer/?method=GET&path=me%3Ffields%3Did%2Cfirst_name&version=v9.0
//Cách sử dụng graph-API: https://developers.facebook.com/docs/graph-api/using-graph-api/

export default function AuFacebookSdk(props) {
  const [userLogin, setStateUserLogin] = useState(false);
  const [infoUserLogin, setStateInfoUserLogin] = useState({});
  const [getAllInfomationAccount, setStateGetAllInformationAccount] = useState(
    false,
  );
  const [dataDetailInfoAccount, setStateDataDetailInfoAccount] = useState({});
  const navigation = useNavigation();
  const {unShowModal} = props;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      console.log('User', user);
      setStateUserLogin(user);
    }
  };

  //Nút tắt modal và nút tự động get tài khoản:
  const headerButtonModal = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={unShowModal}
          style={{
            height: SIZE.width(15),
            width: SIZE.width(15),
          }}>
          <AntDesign
            name={'closesquare'}
            a
            color={COLOR.grey_300}
            size={45}></AntDesign>
        </TouchableOpacity>
      </View>
    );
  };

  //Đăng nhập bằng nút custome:
  const buttonLoginCustom = () => {
    return (
      <TouchableOpacity
        onPress={loginHasAccessTokenFireBase}
        style={{
          height: SIZE.height(7.5),
          width: SIZE.width(65),
          backgroundColor: 'blue',
        }}>
        <AppText>Login button custom</AppText>
      </TouchableOpacity>
    );
  };

  //Đăng nhập sử dụng fireBase:
  const loginHasAccessTokenFireBase = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log('Lỗi', error);
    }
  };

  //Đăng xuất và xóa cache:
  const logoutAccountAndResetCache = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  //Nút đăng xuất tất cả tài khoản ra khỏi thiết bị và xóa cache:
  const buttonLogoutAndResetCacheAccountFB = () => {
    return (
      <TouchableOpacity
        onPress={logoutAccountAndResetCache}
        style={{
          height: SIZE.height(7.5),
          width: SIZE.width(60),
          backgroundColor: 'red',
        }}>
        <AppText>Đăng xuất</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {headerButtonModal()}
      <View
        style={{
          height: SIZE.height(85),
          width: SIZE.width(100),
          backgroundColor: COLOR.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: SIZE.height(1), marginBottom: SIZE.width(5)}}>
          <View style={{width: SIZE.width(100), alignItems: 'center'}}>
            {buttonLoginCustom()}
            {/* Nút đăng xuất tất cả tài khoản và xóa cache ra khỏi thiết bị */}
            {buttonLogoutAndResetCacheAccountFB()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
