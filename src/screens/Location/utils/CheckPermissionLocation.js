import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {Alert} from 'react-native';
import {isIos} from '../../../utils/constants/System';
//IOS có 2 quyền location cần check riêng biệt:
//Luôn cho phép khi xử dụng App.
//Chỉ cho phép khi đang dùng App.

//Kiểm tra quyền vị trí:
const checkPermissionsLocation = async () => {
  let checkPermissionAlaysIOS = '';
  let checkPermissionInUseAppIOS = '';
  if (isIos) {
    checkPermissionAlaysIOS = await checkPermissionLocationAlwayIOS();
    checkPermissionInUseAppIOS = await checkPermissionLocationInUseAppIOS();
    if (
      checkPermissionAlaysIOS == 'granted' &&
      checkPermissionInUseAppIOS == 'granted'
    ) {
    } else {
      return requestPermissionLocationIOS();
    }
  } else {
  }
};

//Kiểm tra quyền vị trí luôn cho phép IOS.
const checkPermissionLocationAlwayIOS = async () => {
  let checkAlwayLocationIOS = '';
  await check(PERMISSIONS.IOS.LOCATION_ALWAYS)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          checkAlwayLocationIOS = 'unavailable';
          break;
        case RESULTS.DENIED:
          checkAlwayLocationIOS = 'denied';
          break;
        case RESULTS.GRANTED:
          checkAlwayLocationIOS = 'granted';
          break;
        case RESULTS.BLOCKED:
          checkAlwayLocationIOS = 'blocked';
          break;
      }
    })
    .catch((error) => {});
  return checkAlwayLocationIOS;
};

//Kiểm tra quyền vị trí khi đang dùng App IOS:
const checkPermissionLocationInUseAppIOS = async () => {
  let checkUseInAppLocationIOS = '';
  await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          checkUseInAppLocationIOS = 'unavailable';
          break;
        case RESULTS.DENIED:
          checkUseInAppLocationIOS = 'denied';
          break;
        case RESULTS.GRANTED:
          checkUseInAppLocationIOS = 'granted';
          break;
        case RESULTS.BLOCKED:
          checkUseInAppLocationIOS = 'blocked';
          break;
      }
    })
    .catch((error) => {});
  return checkUseInAppLocationIOS;
};

//Kiểm tra quyền vị trí khi đang dùng App Android:

//Thực hiện request hỏi quền truy cập vị trí ứng dụng:
const requestPermissionLocationIOS = async () => {
  let requestPermissionAlaysIOS = false;
  let requestPermissionInUseAppIOS = false;
  await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((event) => {
    if (event === 'granted') {
      requestPermissionAlaysIOS = true;
      if (event === 'blocked') {
        requestPermissionAlaysIOS = false;
      }
    }
  });
  await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((event) => {
    if (event == 'granted') {
      requestPermissionInUseAppIOS = true;
    } else {
      requestPermissionInUseAppIOS = false;
    }
  });
  if (!requestPermissionAlaysIOS && !requestPermissionInUseAppIOS) {
    alertPermissionsLocation();
  } else {
    return 'GRANTED';
  }
};

//Thông báo bật quyền vị trí trong Setting:
const alertPermissionsLocation = () => {
  Alert.alert(
    'Yêu cầu cấp quyền vị trí!',
    'Vui lòng cấp quyền vị trí để xử dụng tính năng này.',
    [
      {
        text: 'キャンセル',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => openSettings(),
      },
    ],
    {cancelable: false},
  );
};

export {checkPermissionsLocation};
