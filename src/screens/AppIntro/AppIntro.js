//Library:
import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-community/async-storage';

//Setup :
import {getInfoDevices} from '../../utils/constants/System';
import {COLOR, KEY_ASYNC_STORE, KEY_NAVIGATION} from '../../utils';

//Component:
// import SliderSwiper from './items/SliderSwiper';
// import SliderHandler from './items/SliderHandler';
import SliderTouch from './items/SliderTouch';

//Data:
import DATA_SLIDER_INTRO from './items/Data';
import {FetchApi} from '../../utils/modules/FetchAPI';

function AppIntroScreen({navigation, route}) {
  const renderSliderIntro = useRef(true);
  useEffect(() => {
    getInfoDevicesSystem();
    RNBootSplash.hide({duration: 2000});
    onDidMount();
    return () => {};
  }, []);
  const onDidMount = async () => {
    RegistrationDeviceID();
    if (!renderSliderIntro.current) {
      navigation.replace(KEY_NAVIGATION.auth_navigator, {
        screen: KEY_NAVIGATION.entry,
        params: {},
      });
    }
  };

  //API đăng kí ID của thiết bị:
  const RegistrationDeviceID = async () => {
    const registration = await AsyncStorage.getItem(
      KEY_ASYNC_STORE.registration_device_ID,
    );
    if (registration == null) {
      const response = await FetchApi.registrationDeviceId();
      if (response && response.success) {
        await AsyncStorage.setItem(
          KEY_ASYNC_STORE.registration_device_ID,
          'DEVICE_ID_SUCCESS',
        );
      }
    }
  };

  const getInfoDevicesSystem = async () => {
    const getAPIPlatform = await getInfoDevices.getInfoDevicesApiLevelPlatform;
  };

  const renderContent = () => {
    if (renderSliderIntro.current) {
      return (
        //   <SliderSwiper
        //     dataSlider={DATA_SLIDER_INTRO}
        //     alwayShowSlider={true}></SliderSwiper>
        // <SliderHandler
        //     dataSlider={DATA_SLIDER_INTRO}
        //     alwayShowSlider={true}></SliderHandler>
        <SliderTouch
          dataSlider={DATA_SLIDER_INTRO}
          alwayShowSlider={true}></SliderTouch>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{backgroundColor: COLOR.TRANSPARENT, flex: 1}}>
      {renderContent()}
    </SafeAreaView>
  );
}

export default AppIntroScreen;
