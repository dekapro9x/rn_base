//Library:
import React, {useEffect, useState, useContext, useRef} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Alert} from 'react-native';

//Component:
import {AppContainer} from '../../elements';
import QRCodeScanner from './items/QRCodeScanner';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/constants/System';
import {STRING} from '../../utils/constants/String';
import {COLOR} from '../../utils';

function QrCode({route}) {
  const [name, setStateNameScreen] = useState('');
  const [showCamera, setStateShowCamera] = useState(true);
  const timeCount = useRef(0);
  const navigation = useNavigation();

  useEffect(() => {
    getNameScreen();
    return () => {
      clearTimeout(timeCount.current);
    };
  }, []);

  const getNameScreen = () => {
    setStateNameScreen('QR');
  };

  const goBackAndMessage = (message) => {
    setStateShowCamera(false);
    navigation.goBack();
    Alert.alert(message);
  };

  const checkQrCodeAPI = async (link) => {
    console.log('SUCCESS_LINK', link);
    Alert.alert(link);
  };

  const onSuccess = async (event) => {
    console.log('Event', event);
    try {
      if (event.data.includes('qrCode/checkQrCode?')) {
        checkQrCodeAPI(event.data);
        return;
      } else {
        goBackAndMessage(
          `Link:${event.data}\nRawData:${event.rawData}\nTarget:${event.target}\nType:${event.type}`,
        );
      }
    } catch (error) {
      console.log('error', error);
      goBackAndMessage(STRING.error_check_qr_code);
    }
  };

  return (
    <AppContainer
      haveTitle
      goBackScreen
      nameScreen={name}
      style={{backgroundColor: COLOR.milk}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {showCamera && (
          <QRCodeScanner
            cameraStyle={{height: DEVICE_HEIGHT, width: DEVICE_WIDTH}}
            checkAndroid6Permissions
            style={{backgroundColor: 'white', height: DEVICE_HEIGHT}}
            onRead={(e) => onSuccess(e)}
            onDenyPermission={() => navigation.goBack()}
          />
        )}
        <View
          style={{margin: 16, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Quét mã QR code</Text>
        </View>
      </View>
    </AppContainer>
  );
}

export default QrCode;
