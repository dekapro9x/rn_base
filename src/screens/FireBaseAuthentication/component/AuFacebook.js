//Library:
import React, {useState, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

//Setup:
import {View, TouchableOpacity, Alert} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';

//API cung cấp thông tin người dùng: https://developers.facebook.com/docs/graph-api/reference/user/?locale=vi_VN
//Bộ công cụ Tets API FB: https://developers.facebook.com/tools/explorer/?method=GET&path=me%3Ffields%3Did%2Cfirst_name&version=v9.0
//Cách sử dụng graph-API: https://developers.facebook.com/docs/graph-api/using-graph-api/

export default function AuMailAndPass(props) {
  const [userLogin, setStateUserLogin] = useState(false);
  const [infoUserLogin, setStateInfoUserLogin] = useState({});
  const [
    getAllInfomationAccount,
    setStateGetAllInformationAccount,
  ] = useState();
  const {unShowModal} = props;

  useEffect(() => {}, []);

  //Lấy thông tin ảnh đại diện:
  const getInfoAccount = async () => {
    const token = infoUserLogin.accessToken;
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=picture,email,name,friends,albums&access_token=' +
        token,
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('%c json', 'color:green', json);
        let user = {};
        user.name = json.name;
        user.id = json.id;
        user.user_friends = json.friends;
        user.email = json.email;
        user.username = json.name;
        user.loading = false;
        user.loggedIn = true;
        user.avatar = json.id;
      })
      .catch((error) => {
        Alert.alert('Có lỗi sảy ra vui lòng thử lại!');
      });
    return <>{renderTextContent('userID', infoUserLogin.userID)}</>;
  };

  //Xin tất cả các quyền fb cho phép để lấy thông tin tài khoản.
  const activeAllPermissionAccountFB = () => {
    LoginManager.logInWithPermissions([
      'user_birthday',
      'user_hometown',
      'user_location',
      'user_likes',
      'user_events',
      'user_photos',
      'user_videos',
      'user_friends',
      'user_status',
      'user_tagged_places',
      'user_posts',
      'user_gender',
      'user_link',
      'user_age_range',
      'email',
      'user_managed_groups',
      'pages_show_list',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Hủy bỏ cấp quyền!');
        } else {
          console.log('%c Result:', 'color:red', result.grantedPermissions);
          Alert.alert('Cấp quyền thành công!');
        }
      },
      function (error) {
        Alert.alert('Không lấy được quyền vui lòng thử lại!');
      },
    );
  };

  //Nút đăng nhập:
  const renderButtonLoginWithFb = () => {
    return (
      <LoginButton
        publishPermissions={['publish_actions']}
        readPermissions={['public_profile']}
        style={{
          height: SIZE.height(7.5),
          width: SIZE.width(65),
          marginTop: userLogin ? SIZE.height(1) : SIZE.height(40),
        }}
        onLoginFinished={(error, result) => {
          if (error) {
            Alert.alert('Có lỗi đăng nhập sảy ra vui lòng thử lại sau!');
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              setStateInfoUserLogin(data);
              setStateUserLogin(true);
            });
          }
        }}
        onLogoutFinished={() => {
          setStateUserLogin(false);
          setStateInfoUserLogin({});
        }}
      />
    );
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

  //Hiển tên và nút sẽ thực hiện hành động nào:
  const renderButtonActiveAction = (title, typeActive) => {
    if (userLogin) {
      return (
        <TouchableOpacity
          onPress={() => checkTypeActiveAction(typeActive)}
          style={{
            height: SIZE.height(7.5),
            width: SIZE.width(65),
            marginTop: SIZE.height(2),
            backgroundColor: COLOR.blue_light_3,
            borderRadius: SIZE.width(1),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText
            style={{
              fontWeight: 'bold',
              fontSize: SIZE.H5 * 0.8,
              color: COLOR.white,
            }}>
            {title}
          </AppText>
        </TouchableOpacity>
      );
    }
    return null;
  };

  //Kiểm tra type hành động thực thi phương thức tương ứng:
  const checkTypeActiveAction = (typeActive) => {
    switch (typeActive) {
      case 'all_permission':
        activeAllPermissionAccountFB();
        break;
      case 'get_all_info_account':
        getInfoAccount();
        break;
      default:
        break;
    }
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
        {name}:{' '}
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

  //Hiển thị thông tin người đăng nhập:
  const renderInfoUser = () => {
    if (infoUserLogin && infoUserLogin.accessToken) {
      return (
        <View style={{marginBottom: SIZE.height(0.5), alignItems: 'center'}}>
          <AppImage
            source={{
              uri:
                'https://s.memehay.com/files/posts/20200812/f135e0fedad300cf07b43a47b0e72c95toan-bo-loi-ran-day-cua-huan-hoa-hong-huan-rose.png',
            }}
            resizeMode={'stretch'}
            style={{
              height: SIZE.width(20),
              width: SIZE.width(20),
              borderRadius: SIZE.width(10),
            }}></AppImage>
          {renderTextContent('accessToken', infoUserLogin.accessToken)}
          {renderTextContent('applicationID', infoUserLogin.applicationID)}
          {renderTextContent(
            'dataAccessExpirationTime',
            infoUserLogin.dataAccessExpirationTime,
          )}
          {renderTextContent('userID', infoUserLogin.userID)}
          {renderListPermission(
            'Danh sách quyền được truy cập:',
            infoUserLogin.permissions,
          )}
          {renderListPermissionWaitFbCensorship(infoUserLogin.permissions)}
        </View>
      );
    }
  };

  //Hiển thị danh sách các quyền tài khoản đã cấp:
  const renderListPermission = (title, listPermission) => {
    if (
      listPermission &&
      Array.isArray(listPermission) &&
      listPermission.length > 0
    ) {
      const listPermissionAccountActive = listPermission.map((item, index) => {
        if (index == listPermission.length - 1) {
          return (
            <AppText
              style={{
                fontSize: SIZE.H5 * 0.6,
                fontWeight: 'bold',
                color: COLOR.color_bottom_app1,
              }}>
              {index + 1}.{item}
            </AppText>
          );
        } else {
          return (
            <AppText
              style={{
                fontSize: SIZE.H5 * 0.6,
                fontWeight: 'bold',
                color: COLOR.color_bottom_app1,
              }}>
              {index + 1}.{item},
            </AppText>
          );
        }
      });
      return (
        <View
          style={{
            alignSelf: 'auto',
            width: SIZE.width(100),
            alignItems: 'center',
          }}>
          <AppText
            style={{
              fontSize: SIZE.H5 * 0.8,
              fontWeight: 'bold',
              color: '#FF99FF',
            }}>
            {title}
          </AppText>
          <View
            style={{
              width: SIZE.width(100),
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {listPermissionAccountActive}
          </View>
        </View>
      );
    }
    return null;
  };

  //Hiển thị danh sách quyền đang đợi FB duyệt:
  const renderListPermissionWaitFbCensorship = (listPermissionActive) => {
    const listAllPermission = [
      'user_birthday',
      'user_hometown',
      'user_location',
      'user_likes',
      'user_events',
      'user_photos',
      'user_videos',
      'user_friends',
      'user_status',
      'user_tagged_places',
      'user_posts',
      'user_gender',
      'user_link',
      'user_age_range',
      'email',
      'user_managed_groups',
      'pages_show_list',
    ];
    let arrPermissionFacebookNotCensorship = [];
    listAllPermission.map((item) => {
      if (!listPermissionActive.includes(item)) {
        arrPermissionFacebookNotCensorship.push(item);
      }
    });
    return (
      <>
        {renderListPermission(
          'Danh sách quyền đang đợi kiểm duyệt:',
          arrPermissionFacebookNotCensorship,
        )}
      </>
    );
  };

  return (
    <View>
      {headerButtonModal()}
      <View
        style={{
          minHeight: SIZE.height(85),
          width: SIZE.width(100),
          backgroundColor: COLOR.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ScrollView style={{marginTop: SIZE.height(1)}}>
          <View style={{width: SIZE.width(100), alignItems: 'center'}}>
            {/* Hiển thị thông tin người đăng nhập: */}
            {renderInfoUser()}
            {/* Nút đăng nhập Fb */}
            {renderButtonLoginWithFb()}
            {/* Lấy thông tin ảnh: */}
            {renderButtonActiveAction(
              'Cấp quyền truy cập thông tin cá nhân',
              'all_permission',
            )}
            {/* Lấy toàn bộ thông tin cá nhân: */}
            {renderButtonActiveAction(
              'Lấy toàn bộ thông tin',
              'get_all_info_account',
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
