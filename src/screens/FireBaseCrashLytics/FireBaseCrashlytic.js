import React from 'react';
import {Text} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR} from '../../utils';

export default function FireBaseCrashlytic() {
  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseCrashlytic'}
      goBackScreen
      style={{backgroundColor: COLOR.backgroundColor}}>
      <Text>FireBaseCrashlytic</Text>
    </AppContainer>
  );
}
