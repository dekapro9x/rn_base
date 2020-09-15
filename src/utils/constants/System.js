import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Dev:
const APP_ID = '1586770031749';
const URL_DOMAIN = 'https://dev.app-cms-yoneyama.com';
const COMPANY_ID = '1586770024080';

//Kiểm tra nền tảng và các cấu hình khác:
const TYPE_USER = 'MOBILE_USER';
const TYPE_PLAFORM = isIos ? 'IOS' : 'ANDROID';
const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const versionApp = isIos ? '1.0.0' : '1.0.0';
const PRIVATE_KEY_DEVICE_ID = 'device_id_yoneyama';
const API_KEY_YOUTUBE = 'AIzaSyDklvH4yPikP9l1m9KgF9S4CJtCtVttf8o';
const DEVICE_ID = DeviceInfo.getUniqueId();
const VERSION_PLAFORM = DeviceInfo.getSystemVersion();
const {width, height} = Dimensions.get('window');
const isIphoneX = isIos && height / width > 1.888;
const DEVICE_WIDTH = width <= height ? width : height;
const DEVICE_HEIGHT = width <= height ? height : width;
console.log('APP_ID', APP_ID);
console.log('DEVICE_ID', DEVICE_ID);
console.log('Version Plaform:', VERSION_PLAFORM);

//Kiểm tra LevelPlatform:
const checkApiLevelPlatform = () => {
  let response = new Promise((resolve, reject) => {
    resolve(DeviceInfo.getApiLevel());
  });
  return response;
};

const getInfoDevices = {
  getInfoDevicesApiLevelPlatform: checkApiLevelPlatform(),
};

export {
  isIos,
  isIphoneX,
  isAndroid,
  versionApp,
  getInfoDevices,
  APP_ID,
  TYPE_USER,
  DEVICE_ID,
  URL_DOMAIN,
  COMPANY_ID,
  DEVICE_WIDTH,
  TYPE_PLAFORM,
  DEVICE_HEIGHT,
  VERSION_PLAFORM,
  API_KEY_YOUTUBE,
  PRIVATE_KEY_DEVICE_ID,
};
