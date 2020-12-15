//Library:
import React, {useState, useContext} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

//Setup:
import {ContextContainer} from '../../contexts/AppContext';
import {AppContainer, AppImage, AppText} from '../../elements';
import {COLOR, SIZE} from '../../utils';
//Component:

import AuMailAndPass from './component/AuMailAndPass';
import AuFacebookSdk from './component/AuFacebookSdk';
import AuFacebookFirebase from './component/AuFacebookFirebase';

export default function FirebaseAuth() {
  const {colorApp} = useContext(ContextContainer);
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemOnActive, setStateItemActive] = useState('');
  const listAuthentication = [
    {
      id: 1,
      name: 'Sign in with Gmail FireBase',
      active: <AuMailAndPass></AuMailAndPass>,
      img: 'https://pbs.twimg.com/media/Ejo1wQoX0AADXUf.png',
    },
    {
      id: 2,
      name: 'Sign in with FaceBook SDK',
      active: <AuFacebookSdk></AuFacebookSdk>,
      img:
        'https://c.wallhere.com/photos/28/6f/1600x1000_px_facebook_facebook_3d_facebook_logo-808920.jpg!d',
    },
    {
      id: 3,
      name: 'Sign in with FB FireBase',
      active: <AuFacebookFirebase></AuFacebookFirebase>,
      img: 'https://i.ytimg.com/vi/YO6Xx5glLPE/maxresdefault.jpg',
    },
  ];

  //Hiển thị modal:
  const showModal = (item) => () => {
    setModalVisible(true);
    setStateItemActive(item.id);
  };

  //Tắt modal:
  const unShowModal = () => {
    setModalVisible(false);
  };
  const renderChildComponentItemActive = () => {
    switch (itemOnActive) {
      case 1:
        return <AuMailAndPass unShowModal={unShowModal} />;
      case 2:
        return <AuFacebookSdk unShowModal={unShowModal}></AuFacebookSdk>;
      case 3:
        return (
          <AuFacebookFirebase unShowModal={unShowModal}></AuFacebookFirebase>
        );
      default:
        return <AuMailAndPass unShowModal={unShowModal} />;
    }
  };

  //Danh sách kiểu xác thực:
  const listTypeAuthentication = () => {
    return listAuthentication.map((item) => {
      return (
        <View
          key={item.id}
          style={{
            minHeight: SIZE.height(15),
            width: SIZE.width(100),
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: COLOR.white,
            borderBottomWidth: SIZE.width(0.3),
          }}>
          <TouchableOpacity
            onPress={showModal(item)}
            style={{
              height: SIZE.height(6),
              width: SIZE.width(65),
              backgroundColor: '#59ADEC',
              alignItems: 'center',
              borderRadius: SIZE.width(2),
              flexDirection: 'row',
            }}>
            <AppImage
              source={{
                uri: item.img,
              }}
              resizeMode={'stretch'}
              style={{
                height: SIZE.height(6),
                width: SIZE.width(15),
                borderTopLeftRadius: SIZE.width(2),
                borderBottomLeftRadius: SIZE.width(2),
              }}></AppImage>
            <AppText
              style={{
                fontSize: SIZE.H5 * 1.02,
                fontWeight: 'bold',
                color: COLOR.white,
                marginLeft: SIZE.width(1),
              }}>
              {item.name}
            </AppText>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseAuth'}
      goBackScreen
      style={{backgroundColor: colorApp.backgroundColor}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            minHeight: SIZE.height(60),
            width: SIZE.width(100),
            backgroundColor: '#203047',
          }}>
          <AppImage
            source={{
              uri:
                'https://cafedev.vn/wp-content/uploads/2019/11/cafedev_authen_fibase.png',
            }}
            style={{
              height: SIZE.height(30),
              width: SIZE.width(100),
            }}></AppImage>
          {listTypeAuthentication()}
        </View>
        <Modal
          deviceWidth={SIZE.width(100)}
          isVisible={isModalVisible}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {renderChildComponentItemActive()}
        </Modal>
      </ScrollView>
    </AppContainer>
  );
}
