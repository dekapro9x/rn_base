import React from 'react';
import {View, Text} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR} from '../../utils';

export default function FirebaseRealTimeDataBase() {
  return (
    <AppContainer
      haveTitle
      nameScreen={'FirebaseRealTimeDataBase'}
      goBackScreen
      style={{backgroundColor: COLOR.backgroundColor}}>
      <Text>FirebaseRealTimeDataBase</Text>
    </AppContainer>
  );
}
