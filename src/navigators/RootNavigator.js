//Lybrary:
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {keyNavigation} from './items/KeyNavigator';

//Màn hình dành cho người dùng đã xác thực:
import MainNavigator from './MainNavigator';

//Màn hình dành cho người dùng chưa xác thực:
import AuthNavigator from './AuthNavigatior';

//Services:
import CurrentScreenServices from '../utils/services/CurrentScreenServices';
import {NavigationService} from '../utils/services/NavigationService';

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <>
      <NavigationContainer
        ref={NavigationService.navigationRef}
        onStateChange={(event) => {
          const currentScreen = NavigationService.navigationRef.current.getCurrentRoute()
            .name;
          CurrentScreenServices.set(currentScreen);
        }}>
        <RootStack.Navigator
          headerMode={'none'}
          initialRouteName={keyNavigation.main_navigator}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <RootStack.Screen
            name={keyNavigation.main_navigator}
            component={MainNavigator}
          />
          <RootStack.Screen
            name={keyNavigation.auth_navigator}
            component={AuthNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default RootNavigator;
