import React, {useImperativeHandle, useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {SIZE, COLOR} from '@src/utils';
import {AppText} from './AppText';

const PopupRef = (props, ref) => {
  const [show, setShow] = useState(false);
  useImperativeHandle(ref, () => ({openModal, closeModal}), []);
  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
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
          backgroundColor: COLOR.red,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            height: SIZE.height(32),
            width: SIZE.width(60),
            backgroundColor: 'green',
            borderRadius: SIZE.width(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText style={{color: COLOR.white, fontSize: 23}}>
            Ấn vào tắt modal:
          </AppText>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default React.forwardRef(PopupRef);
