//Library:
import React, {useState, useContext} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
//Setup:
import {ContextContainer} from '../../contexts/AppContext';
import {AppContainer, AppImage} from '../../elements';
import {COLOR, SIZE} from '../../utils';
//Component:

import AuMailAndPass from './component/AuMailAndPass';
import AuFacebook from './component/AuFacebook';

export default function FirebaseAuth() {
  const {colorApp} = useContext(ContextContainer);
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemOnActive, setStateItemActive] = useState('');
  const listAuthentication = [
    {
      id: 1,
      name: 'EmailAndPassword',
      active: <AuMailAndPass></AuMailAndPass>,
      img: 'https://pbs.twimg.com/media/Ejo1wQoX0AADXUf.png',
    },
    {
      id: 2,
      name: 'LoginWithFacebook',
      active: <AuFacebook></AuFacebook>,
      img:
        'https://c.wallhere.com/photos/28/6f/1600x1000_px_facebook_facebook_3d_facebook_logo-808920.jpg!d',
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
        return <AuFacebook unShowModal={unShowModal}></AuFacebook>;
      default:
        return <AuMailAndPass unShowModal={unShowModal} />;
    }
  };

  //Danh sách kiểu xác thực:
  const listTypeAuthentication = () => {
    return listAuthentication.map((item) => {
      return (
        <TouchableOpacity
          onPress={showModal(item)}
          key={item.id}
          style={{
            minHeight: SIZE.height(15),
            width: SIZE.width(100),
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: COLOR.black,
            borderBottomWidth: SIZE.width(0.3),
          }}>
          <AppImage
            source={{
              uri: item.img,
            }}
            resizeMode={'stretch'}
            style={{
              height: SIZE.height(8),
              width: SIZE.width(30),
            }}></AppImage>
        </TouchableOpacity>
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
            minHeight: SIZE.height(50),
            width: SIZE.width(100),
          }}>
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
