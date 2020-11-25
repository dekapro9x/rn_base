import React, {useState, useEffect, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {View, TouchableOpacity, TextInput, Alert} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';
import {ScrollView} from 'react-native-gesture-handler';

export default function AuMailAndPass(props) {
  const [userLogin, setUserLogin] = useState(false);
  const [userNameDemo, setStateUserNameDemo] = useState('');
  const [passWordDemo, setStatePassWordDemo] = useState('');

  const {unShowModal} = props;

  const useName = useRef('');
  const passWord = useRef('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('subscriber', subscriber);
    return subscriber;
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      setUserLogin(user);
      console.log('user', user);
    }
  };

  const onChangeUserName = (text) => {
    useName.current = text;
  };

  const onChangePassWord = (pass) => {
    passWord.current = pass;
  };

  //Tự động điền tài khoản demo:
  const pressActiveAccountDemo = () => {
    if (userLogin) {
      pressLogout();
    } else {
      setStateUserNameDemo('bglovebg9x@gmail.com');
      setStatePassWordDemo('minhtam22');
      useName.current = 'bglovebg9x@gmail.com';
      passWord.current = 'minhtam22';
    }
  };

  //Đăng nhập:
  const pressLogin = () => {
    if (!useName.current || !passWord.current) {
      Alert.alert('Nhập thông tin tài khoản!');
    } else {
      auth()
        .signInWithEmailAndPassword(useName.current, passWord.current)
        .then(function (result) {
          console.log('result', result);
          if (result) {
            Alert.alert('Login thành công!');
            setStateUserNameDemo('');
            setStatePassWordDemo('');
            useName.current = '';
            passWord.current = '';
          }
        })
        .catch(function (error) {
          console.log('error', error);
        });
    }
  };

  //Đăng xuất:
  const pressLogout = () => {
    auth()
      .signOut()
      .then((account) => {
        setUserLogin(false);
        Alert.alert('Đăng xuất thành công!');
        console.log('User signed out!', account);
      })
      .catch((error) => {
        Alert.alert('Bạn chưa đăng nhập!');
        setStateUserNameDemo('');
        setStatePassWordDemo('');
        useName.current = '';
        passWord.current = '';
      });
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
        <TouchableOpacity
          onPress={pressActiveAccountDemo}
          style={{
            height: SIZE.width(15),
            width: SIZE.width(15),
            marginLeft: SIZE.width(70),
          }}>
          <AntDesign
            name={'login'}
            color={COLOR.grey_300}
            size={45}></AntDesign>
        </TouchableOpacity>
      </View>
    );
  };

  //Hiển thị thông số API:
  const renderTextContent = (name, analystic) => {
    return (
      <AppText
        style={{
          color: COLOR.red,
          fontSize: SIZE.H5 * 0.74,
          fontWeight: 'bold',
        }}>
        {name}:
        <AppText
          style={{
            color: COLOR.blue_light_3,
            fontSize: SIZE.H5 * 0.74,
            fontWeight: 'bold',
          }}>
          {`${analystic}\n`}
        </AppText>
      </AppText>
    );
  };

  //Hiển thị FornLogin:
  const renderFormLogin = () => {
    if (!userLogin) {
      return (
        <>
          <AppText
            style={{
              fontSize: SIZE.H4,
              fontWeight: 'bold',
              marginTop: SIZE.height(2),
            }}>
            Xác thực thông qua email và mật khẩu:
          </AppText>
          <AppText
            style={{
              fontSize: SIZE.H5,
              fontWeight: 'bold',
              marginTop: SIZE.height(2),
            }}>
            Tài khoản demo:
          </AppText>
          <AppText
            style={{
              fontSize: SIZE.H5,
              fontWeight: 'bold',
              marginTop: SIZE.height(1),
            }}>
            Mail: bglovebg9x@gmail.com
          </AppText>
          <AppText
            style={{
              fontSize: SIZE.H5,
              fontWeight: 'bold',
              marginTop: SIZE.height(1),
            }}>
            Pass: minhtam22
          </AppText>
          <View style={{width: SIZE.width(100), marginTop: SIZE.height(3)}}>
            <AppText
              style={{
                fontSize: SIZE.H5,
                fontWeight: 'bold',
                marginLeft: SIZE.width(3),
              }}>
              Mời bạn nhập email:
            </AppText>
            <TextInput
              onChangeText={onChangeUserName}
              autoCapitalize="none"
              style={{
                height: SIZE.height(8),
                width: SIZE.width(96),
                borderWidth: 1,
                marginLeft: SIZE.width(2),
                borderRadius: 8,
                marginTop: SIZE.height(2),
              }}>
              {userNameDemo}
            </TextInput>
            <AppText
              style={{
                fontSize: SIZE.H5,
                fontWeight: 'bold',
                marginTop: SIZE.height(2),
                marginLeft: SIZE.width(3),
              }}>
              Mời bạn nhập password:
            </AppText>
            <TextInput
              onChangeText={onChangePassWord}
              autoCapitalize="none"
              style={{
                height: SIZE.height(8),
                width: SIZE.width(96),
                borderWidth: 1,
                marginLeft: SIZE.width(2),
                borderRadius: 8,
                marginTop: SIZE.height(2),
              }}>
              {passWordDemo}
            </TextInput>
            <TouchableOpacity
              onPress={pressLogin}
              style={{
                height: SIZE.height(8),
                width: SIZE.width(60),
                backgroundColor: COLOR.blue_light_3,
                marginTop: SIZE.width(3),
                borderRadius: SIZE.width(4),
                marginLeft: SIZE.width(20),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                style={{
                  fontSize: SIZE.H4 * 1.25,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Login
              </AppText>
            
            </TouchableOpacity>
            <TouchableOpacity
                onPress={pressLogin}
                style={{
                  height: SIZE.height(8),
                  width: SIZE.width(60),
                  backgroundColor: COLOR.blue_light_3,
                  marginTop: SIZE.width(3),
                  borderRadius: SIZE.width(4),
                  marginLeft: SIZE.width(20),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText
                  style={{
                    fontSize: SIZE.H4 * 1.25,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Login With Facebook
                </AppText>
              </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={{
              minHeight: SIZE.height(30),
              width: SIZE.width(100),
              alignItems: 'center',
            }}>
            <AppText
              style={{
                fontSize: SIZE.H4,
                fontWeight: 'bold',
                marginTop: SIZE.height(2),
              }}>
              Tài khoản đã đăng nhập:
            </AppText>
            <AppImage
              source={{
                uri:
                  'https://s.memehay.com/files/posts/20200812/f135e0fedad300cf07b43a47b0e72c95toan-bo-loi-ran-day-cua-huan-hoa-hong-huan-rose.png',
              }}
              resizeMode={'cover'}
              style={{
                height: SIZE.width(55),
                width: SIZE.width(40),
              }}></AppImage>
            <AppText
              style={{
                fontSize: SIZE.H5 * 0.74,
                fontWeight: 'bold',
                marginTop: SIZE.height(2),
              }}>
              {`Thông số tài khoản đăng nhập:\n`}
              {`Options:\n`}
              {renderTextContent(
                'androidClientID',
                userLogin._auth._app._options.androidClientID,
              )}
              {renderTextContent(
                'apiKey',
                userLogin._auth._app._options.apiKey,
              )}
              {renderTextContent(
                'clientId',
                userLogin._auth._app._options.clientId,
              )}
              {renderTextContent(
                'databaseURL',
                userLogin._auth._app._options.databaseURL,
              )}
              {renderTextContent(
                'messagingSenderId',
                userLogin._auth._app._options.messagingSenderId,
              )}
              {renderTextContent(
                'projectId',
                userLogin._auth._app._options.projectId,
              )}
              {renderTextContent(
                'storageBucket',
                userLogin._auth._app._options.storageBucket,
              )}
              {`User:\n`}
              {renderTextContent('email', userLogin._user.email)}
              {renderTextContent(
                'creationTime',
                userLogin._user.metadata.creationTime,
              )}
              {renderTextContent(
                'lastSignInTime',
                userLogin._user.metadata.lastSignInTime,
              )}
              {renderTextContent('refreshToken', userLogin._user.refreshToken)}
              {renderTextContent('uid', userLogin._user.uid)}
            </AppText>
          </View>
        </ScrollView>
      );
    }
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
        }}>
        {renderFormLogin()}
        <TouchableOpacity
          onPress={pressLogout}
          style={{
            height: SIZE.height(8),
            width: SIZE.width(60),
            backgroundColor: COLOR.blue_light_3,
            marginTop: SIZE.width(3),
            borderRadius: SIZE.width(4),
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: SIZE.height(1),
          }}>
          <AppText
            style={{
              fontSize: SIZE.H4 * 1.25,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Logout
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
