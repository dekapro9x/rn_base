import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {AppContainer, AppText} from '../../elements';
import {COLOR, SIZE} from '../../utils';
export default function PushLocalScheduled() {
  const [secondsPush, setStateSecondPush] = useState(10);
  const [titlePush, setStateTitlePush] = useState('');
  const [messPush, setStateMessPush] = useState('');

  useEffect(() => {
    PushNotification.localNotification({
      title: 'Chào mừng bạn đến với đặt lịch!',
      message: 'Bạn sẽ nhận được thông báo :))',
    });
    return () => {
      PushNotification.cancelAllLocalNotifications();
    };
  }, []);

  //Thay đổi tiêu đề thông báo:
  const onChangeTitle = (title) => {
    setStateTitlePush(title);
  };

  //Thay đổi tin nhắn thông báo:
  const onChangeMessPush = (mess) => {
    setStateMessPush(mess);
  };

  //Thời gian hẹn lịch:
  const onChangeSecond = (number) => {
    setStateSecondPush(number);
  };

  // Đặt lịch hẹn:

  const pressSchedulerPush = () => {
    PushNotification.localNotificationSchedule({
      title: titlePush ? titlePush : 'Well Come!',
      message: messPush ? messPush : 'Scheduled PushNotification :V',
      date: new Date(Date.now() + secondsPush * 1000),
      allowWhileIdle: false,
    });
    setStateSecondPush(0);
    setStateTitlePush('');
    setStateMessPush('');
    Alert.alert('Đặt lịch thành công');
  };

  //Ấn vào nút đặt lịch:
  const pressActiveScheduledPush = () => {
    Alert.alert(
      'Bạn có muốn đặt lịch hẹn？',
      '',
      [
        {
          text: 'Ấn nhầm :))',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'cancel',
          onPress: () => {
            pressSchedulerPush();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <AppContainer
      haveTitle
      goBackScreen
      nameScreen={name}
      style={{backgroundColor: COLOR.milk}}>
      <ScrollView>
        <View
          style={{
            height: SIZE.height(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Tiêu đề */}
          <AppText style={{fontSize: SIZE.H4, fontWeight: 'bold'}}>
            Tiêu đề thông báo:
          </AppText>
          <TextInput
            onChangeText={onChangeTitle}
            style={{
              textAlign: 'center',
              height: SIZE.height(7),
              width: SIZE.width(80),
              borderWidth: 2,
              borderRadius: 3,
            }}>
            {titlePush ? titlePush : ''}
          </TextInput>
          {/* Tin nhắn */}
          <AppText
            style={{
              fontSize: SIZE.H4,
              fontWeight: 'bold',
              marginTop: SIZE.width(5),
            }}>
            Tin nhắn thông báo:
          </AppText>
          <TextInput
            onChangeText={onChangeMessPush}
            style={{
              textAlign: 'center',
              height: SIZE.height(7),
              width: SIZE.width(80),
              borderWidth: 2,
              borderRadius: 3,
            }}>
            {messPush ? messPush : ''}
          </TextInput>
          {/* Thời gian đặt lịch */}
          <AppText
            style={{
              fontSize: SIZE.H4,
              fontWeight: 'bold',
              marginTop: SIZE.width(5),
            }}>
            Thời gian đặt lịch (giây):
          </AppText>
          <TextInput
            keyboardType={'numeric'}
            maxLength={2}
            onChangeText={onChangeSecond}
            style={{
              textAlign: 'center',
              height: SIZE.height(7),
              width: SIZE.width(50),
              borderWidth: 2,
              borderRadius: 3,
            }}>
            {secondsPush ? secondsPush : ''}
          </TextInput>
          <TouchableOpacity
            onPress={pressActiveScheduledPush}
            style={{
              height: SIZE.height(7.5),
              width: SIZE.width(78),
              marginTop: SIZE.height(5),
              marginBottom: SIZE.height(10),
              borderRadius: SIZE.width(4),
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppText
              style={{
                fontSize: SIZE.H5,
                fontWeight: 'bold',
                color: COLOR.white,
              }}>
              Đặt lịch
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
