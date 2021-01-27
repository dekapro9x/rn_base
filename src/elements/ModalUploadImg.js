import React, {useImperativeHandle, useState, useRef} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {SIZE, COLOR} from '@src/utils';
import {AppText} from './AppText';

const ModalUploadImage = (props, ref) => {
  const [show, setShow] = useState(false);
  const imgSelected = useRef('');
  const listButton = [
    {
      id: 1,
      name: 'Chụp ảnh',
      active: 'CAMERA',
    },
    {
      id: 2,
      name: 'Chọn ảnh',
      active: 'LIBRARY',
    },
    {
      id: 3,
      name: 'Hủy ',
      active: '',
    },
  ];
  useImperativeHandle(ref, () => ({openModal, closeModal, getImgSelected}), []);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const getImgSelected = () => {
    return imgSelected.current;
  };

  const chooseCamera = () => {
    launchCamera({mediaType: 'photo'}, (respone) => {
      imgSelected.current = respone.uri;
    });
  };

  const chooseLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, (respone) => {
      imgSelected.current = respone.uri;
    });
  };

  const takeUploadImgPicker = (active) => () => {
    switch (active) {
      case 'CAMERA':
        chooseCamera();
        closeModal();
        break;
      case 'LIBRARY':
        chooseLibrary();
        closeModal();
        break;
      default:
        closeModal();
        break;
    }
  };

  const renderListButton = () => {
    return listButton.map((item, index) => {
      return (
        <TouchableOpacity
          key={`${index}`}
          onPress={takeUploadImgPicker(item.active)}
          style={{
            height: SIZE.height(12),
            width: SIZE.width(60),
            backgroundColor: 'green',
            borderRadius: SIZE.width(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText style={{color: COLOR.white, fontSize: 23}}>
            {item.name}
          </AppText>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal
      backdropOpacity={0.2}
      hideModalContentWhileAnimating={true}
      animationOut="fadeOut"
      animationInTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      isVisible={show}
      deviceHeight={SIZE.device_height}
      deviceWidth={SIZE.device_width}
      style={{
        margin: 0,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLOR.transparent,
          justifyContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {renderListButton()}
      </SafeAreaView>
    </Modal>
  );
};

export default React.forwardRef(ModalUploadImage);
