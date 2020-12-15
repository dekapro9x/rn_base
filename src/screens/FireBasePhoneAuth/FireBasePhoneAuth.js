import React from 'react';
import {View, Text} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR} from '../../utils';

export default function FireBasePhoneAuth() {
  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseAuth'}
      goBackScreen
      style={{backgroundColor: COLOR.backgroundColor}}>
      <Text>FireBasePhoneAuth</Text>
    </AppContainer>
  );
}
