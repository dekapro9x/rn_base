import React, {useEffect, useRef, useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {ContextContainer} from '../../contexts/AppContext';
import {AppContainer} from '../../elements';

export default function FirebaseAuth() {
  const {colorApp} = useContext(ContextContainer);
  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseAuth'}
      goBackScreen
      style={{backgroundColor: colorApp.backgroundColor}}></AppContainer>
  );
}
