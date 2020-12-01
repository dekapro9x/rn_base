import React, {useState, useEffect, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  ShareDialog,
} from 'react-native-fbsdk';
const FBSDK = require('react-native-fbsdk');
const {ShareApi} = FBSDK;
import {View, TouchableOpacity, TextInput, Alert} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';
import {ScrollView} from 'react-native-gesture-handler';

export default function AuMailAndPass(props) {
  const [userLogin, setUserLogin] = useState(false);
  const {unShowModal} = props;
  const shareLinkContent = {
    contentType: 'link',
    contentUrl: 'https://facebook.com',
    contentDescription: 'Wow, check out this great site!',
  };

  useEffect(() => {
    showDialogLoginFb();
    shareLinkWithShareDialog();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Xử lý chứng chỉ người dùng:
  const onAuthStateChanged = (user) => {
    console.log('user', user);
    if (user) {
      setUserLogin(user);
    }
  };
  //Tự động xin quyền cấp thông tin tài khoản:
  const showDialogLoginFb = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled', result);
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const shareLinkWithShareDialog = () => {
    ShareDialog.canShow(shareLinkContent)
      .then(function (canShow) {
        console.log('canShow', canShow);
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then(
        function (result) {
          console.log('result', result);
          if (result.isCancelled) {
            console.log('Share cancelled');
          } else {
            console.log('Share success with postId: ' + result.postId);
          }
        },
        function (error) {
          console.log('Share fail with error: ' + error);
        },
      );
  };

  //Nút tắt modal và nút tự động get tài khoản:
  const headerButtonModalAndGetAccount = () => {
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

  return (
    <View>
      {headerButtonModalAndGetAccount()}
      <View
        style={{
          minHeight: SIZE.height(60),
          width: SIZE.width(100),
          backgroundColor: COLOR.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log('Data', data);
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('Đăng xuất tài khoản.')}
        /> */}
      </View>
    </View>
  );
}
