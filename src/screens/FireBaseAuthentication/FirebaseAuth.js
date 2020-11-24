//Library:
import React, {useEffect, useRef, useState, useContext} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
//Setup:
import {ContextContainer} from '../../contexts/AppContext';
import {AppContainer, AppImage, AppText} from '../../elements';
import {COLOR, SIZE} from '../../utils';
//Component:

import AuMailAndPass from './items/AuMailAndPass';

export default function FirebaseAuth() {
  const [isModalVisible, setModalVisible] = useState(false);
  const {colorApp} = useContext(ContextContainer);
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
      active: <AuMailAndPass></AuMailAndPass>,
      img: 'https://pbs.twimg.com/media/Ejo1wQoX0AADXUf.png',
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
  const showModal = () => {
    setModalVisible(true);
  };
  //Tắt modal:
  const unShowModal = () => {
    setModalVisible(false);
  };
  //Danh sách kiểu xác thực:
  const listTypeAuthentication = () => {
    return listAuthentication.map((item) => {
      return (
        <TouchableOpacity
          onPress={showModal}
          key={item.id}
          style={{
            height: 100,
            width: SIZE.width(100),
            alignItems: 'center',
            borderBottomColor: COLOR.black,
            borderBottomWidth: SIZE.width(0.3),
          }}>
          <AppImage
            source={{
              uri: item.img,
            }}
            style={{
              height: SIZE.height(12),
              width: SIZE.width(40),
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
          <AuMailAndPass unShowModal={unShowModal}></AuMailAndPass>
        </Modal>
      </ScrollView>
    </AppContainer>
  );
}
