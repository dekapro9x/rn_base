//Lybrary:
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Policy from '../screens/Policy/Policy';
import Entry from '../screens/Entry/Entry';

//Setup:
import {KEY_NAVIGATION} from '../utils';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <AuthStack.Navigator
        headerMode={'none'}
        initialRouteName={KEY_NAVIGATION.login}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <AuthStack.Screen name={KEY_NAVIGATION.policy} component={Policy} />
        <AuthStack.Screen name={KEY_NAVIGATION.entry} component={Entry} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthNavigator;
