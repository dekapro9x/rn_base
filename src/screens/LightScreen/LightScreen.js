import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import SystemSetting from 'react-native-system-setting';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {AppText} from '../../elements';
import {COLOR, isIos, SIZE} from '../../utils';

export default function LightScreen() {
  const [getLight, setStateGetLight] = useState(0);
  const saveLight = useRef(false);

  const getLightDefault = useRef(0);
  const getLightCurrent = useRef(0);
  const arrayBright = [
    {
      id: 1,
      active: 0.1,
    },
    {
      id: 2,
      active: 0.3,
    },
    {
      id: 3,
      active: 0.5,
    },
    {
      id: 4,
      active: 0.6,
    },
    {
      id: 5,
      active: 0.8,
    },
    {
      id: 6,
      active: 0.9,
    },
    {
      id: 7,
      active: 1.0,
    },
  ];
  useEffect(() => {
    if (isIos) {
      //get the current brightness
      SystemSetting.getBrightness(getLight).then((brightness) => {
        setStateGetLight(brightness);
        getLightDefault.current = brightness;
      });
    } else {
      checkPermissionSystemSettingAndroid();
    }

    return () => {
      if (saveLight.current) {
        SystemSetting.setBrightnessForce(
          getLightCurrent.current,
        ).then((success) => {});
      } else {
        SystemSetting.setBrightnessForce(getLightDefault.current);
      }
    };
  }, []);
  const activeBrightScreen = (item) => () => {
    //change the brightness & check permission IOS:
    if (isIos) {
      SystemSetting.setBrightnessForce(item.active).then((success) => {
        if (!success) {
          Alert.alert(
            'Permission Deny',
            'You have no permission changing settings',
            [
              {text: 'Ok', style: 'cancel'},
              {
                text: 'Open Setting',
                onPress: () => SystemSetting.grantWriteSettingPermission(),
              },
            ],
          );
        } else {
          setStateGetLight(item.active);
          getLightCurrent.current = item.active;
        }
      });
    } else {
      // const checkSystem = await checkPermissionSystemSettingAndroid();
      console.log('checkSystem');
      setStateGetLight(item.active);
      getLightCurrent.current = item.active;
    }
  };

  //Quyền sửa đổi system android:
  const checkPermissionSystemSettingAndroid = async () => {
    let checkPermissionSystem = '';
    await check(PERMISSIONS.ANDROID.WRITE_SETTINGS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            checkPermissionSystem = 'unavailable';
            break;
          case RESULTS.DENIED:
            checkPermissionSystem = 'denied';
            break;
          case RESULTS.GRANTED:
            checkPermissionSystem = 'granted';
            break;
          case RESULTS.BLOCKED:
            checkPermissionSystem = 'blocked';
            break;
        }
      })
      .catch((error) => {
        console.log('errorerror', error);
      });
    console.log('checkPermissionSystem', checkPermissionSystem);
    return checkPermissionSystem;
  };
  const saveBrightScreen = () => {
    saveLight.current = true;
    Alert.alert('Lưu thành công!');
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <AppText
        style={{
          fontSize: SIZE.H4 * 1.3,
          color: COLOR.black,
          fontWeight: 'bold',
        }}>
        Độ sáng màn hình hiện tại:{' '}
        <AppText
          style={{
            color: COLOR.COLOR_GREEN,
            fontSize: SIZE.H4 * 1.5,
            fontWeight: 'bold',
          }}>
          {getLight}
        </AppText>
      </AppText>
      <View
        style={{
          width: SIZE.width(100),
          height: SIZE.height(60),
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {arrayBright &&
          arrayBright.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={activeBrightScreen(item)}
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: 'red',
                  padding: SIZE.width(2),
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: SIZE.width(1),
                }}>
                <AppText style={{fontSize: SIZE.H3, color: 'green'}}>
                  {item.active}
                </AppText>
              </TouchableOpacity>
            );
          })}
      </View>
      <TouchableOpacity
        onPress={saveBrightScreen}
        style={{
          height: 40,
          width: 150,
          backgroundColor: 'blue',
          padding: SIZE.width(2),
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: SIZE.width(1),
        }}>
        <AppText style={{fontSize: SIZE.H4, color: COLOR.white}}>
          SAVE BRIGHT
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
