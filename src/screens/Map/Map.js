import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {View, StyleSheet} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR} from '../../utils';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export default () => (
  <AppContainer
    haveTitle
    nameScreen={'Map'}
    goBackScreen
    style={{backgroundColor: COLOR.milk}}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}></MapView>
  </AppContainer>
);
