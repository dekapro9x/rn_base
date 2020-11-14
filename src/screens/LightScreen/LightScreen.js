import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import SystemSetting from 'react-native-system-setting';
import {AppText} from '../../elements';
import {SIZE} from '../../utils';

export default function LightScreen() {
  const [getLight, setStateGetLight] = useState(0);
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
    //get the current brightness
    SystemSetting.getBrightness().then((brightness) => {
      setStateGetLight(brightness);
    });
    return () => {};
  }, []);
  const activeBrightScreen = (item) => () => {
    //change the brightness & check permission
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
      }
    });
  };
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <AppText>Độ sáng màn hình hiện tại {getLight} </AppText>
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
    </View>
  );
}
