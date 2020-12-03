//Library:
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {View, TouchableOpacity, Alert, ScrollView} from 'react-native';

//Setup:
import {AppText} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';

export default function AuFacebookSdk(props) {
  const [userLogin, setStateUserLogin] = useState(false);
  const [dataCredential, setStateDataCredential] = useState(null);
  const [dataAccessToken, setStateDataAccessToken] = useState({});

  const {unShowModal} = props;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log(user);
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
            color={COLOR.grey_300}
            size={45}></AntDesign>
        </TouchableOpacity>
      </View>
    );
  };

  //Đăng nhập bằng nút custome:
  const buttonLoginCustom = () => {
    if (userLogin) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={loginHasAccessTokenFireBase}
        style={{
          height: SIZE.height(7.5),
          width: SIZE.width(65),
          backgroundColor: 'blue',
          marginTop: SIZE.height(40),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppText style={{color: COLOR.white, fontWeight: 'bold'}}>
          Đăng nhập
        </AppText>
      </TouchableOpacity>
    );
  };

  //Đăng nhập sử dụng fireBase:
  const loginHasAccessTokenFireBase = async () => {
    try {
      // Mở popup xin quyền đăng nhập với Fb.
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'user_photos',
      ]);

      if (result.isCancelled) {
        throw 'Người dùng ấn huỷ bỏ';
      }
      // Lấy Token hiện tại của FB.
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      setStateDataAccessToken(data);
      // Lấy chứng chỉ đăng nhập và token:
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      setStateDataCredential(data);
      console.log('facebookCredential', facebookCredential);
      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log('Lỗi', error);
    }
  };

  //Đăng xuất và xóa cache:
  const logoutAccountAndResetCache = async () => {
    try {
      auth()
        .signOut()
        .then(() => Alert.alert('Đăng xuất thành công!'));
      setStateUserLogin(null);
    } catch (error) {}
  };

  //Nút đăng xuất tất cả tài khoản ra khỏi thiết bị và xóa cache:
  const buttonLogoutAndResetCacheAccountFB = () => {
    if (userLogin) {
      return (
        <TouchableOpacity
          onPress={logoutAccountAndResetCache}
          style={{
            marginTop: userLogin ? SIZE.height(5) : SIZE.width(2),
            height: SIZE.height(7.5),
            width: SIZE.width(65),
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText style={{color: COLOR.white, fontWeight: 'bold'}}>
            Đăng xuất
          </AppText>
        </TouchableOpacity>
      );
    }
    return null;
  };

  //Hiển thị thông tin Login:
  const renderInfoLogin = () => {
    if (dataAccessToken && userLogin) {
      return (
        <View
          style={{
            minHeight: 100,
            width: SIZE.width(100),
          }}>
          <AppText style={{color: COLOR.red}}>
            accessToken:
            <AppText style={{color: COLOR.black}}>
              {dataAccessToken.accessToken}
            </AppText>
          </AppText>
        </View>
      );
    }
    return null;
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
          onLayout={(event) => {
            console.log('eventScoll', event);
            let {x, y, width, height} = event.nativeEvent.layout;
            console.log('x, y, width, height', x, y, width, height);
          }}
          showsVerticalScrollIndicator={false}
          style={{marginTop: SIZE.height(1), marginBottom: SIZE.width(5)}}>
          <View style={{width: SIZE.width(100), alignItems: 'center'}}>
            {/* Thông tin đăng nhập */}
            {renderInfoLogin()}
            {/* Nút đăng nhập */}
            {buttonLoginCustom()}
            {/* Nút đăng xuất tất cả tài khoản và xóa cache ra khỏi thiết bị */}
            {buttonLogoutAndResetCacheAccountFB()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
