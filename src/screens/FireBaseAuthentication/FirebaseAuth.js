//Library:
import React, {useState, useContext} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
//Setup:
import {ContextContainer} from '../../contexts/AppContext';
import {AppContainer, AppImage} from '../../elements';
import {COLOR, SIZE} from '../../utils';
//Component:

import AuMailAndPass from './items/AuMailAndPass';
import AuFacebook from './items/AuFacebook';

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
    {
      id: 3,
      name: 'LoginWithTwitter',
      active: null,
      img: 'https://pbs.twimg.com/media/Ejo1wQoX0AADXUf.png',
    },
    {
      id: 4,
      name: 'LoginWithGoogle',
      active: null,
      img: 'https://pbs.twimg.com/media/Ejo1wQoX0AADXUf.png',
    },
    {
      id: 5,
      name: 'LoginWithNumberPhone ',
      active: null,
      img: 'https://pbs.twimg.com/media/Ejo1wQoX0AADXUf.png',
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
        break;
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
            minHeight: SIZE.height(5),
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
              height: SIZE.height(15),
              width: SIZE.width(100),
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
