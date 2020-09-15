import React, {Fragment, useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

//Setup:
import {COLOR, KEY_NAVIGATION} from '../utils';

//Screen:

import Home from '../screens/Home/Home';
import BottomMenu from './BottomMenu';

//Services:
import {BottomService} from '../utils/services/BottomService';

const MainStack = createStackNavigator();

function MainNavigator() {
  const [bottom, setStateBottom] = useState(true);
  useEffect(() => {
    BottomService.onChange('set-bottom-main-navigator', (value) => {
      setStateBottom(value);
    });
    return () => {};
  }, []);
  return (
    <Fragment>
      <SafeAreaView style={{backgroundColor: COLOR.white}} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: COLOR.TRANSPARENT,
        }}>
        <MainStack.Navigator
          headerMode={'none'}
          initialRouteName={KEY_NAVIGATION.home}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <MainStack.Screen name={KEY_NAVIGATION.home} component={Home} />
        </MainStack.Navigator>
        {bottom && <BottomMenu />}
      </View>
      <SafeAreaView style={{backgroundColor: COLOR.dark}} />
    </Fragment>
  );
}

export default MainNavigator;
