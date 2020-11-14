//Lybrary:
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {KEY_NAVIGATION} from '../utils/keys/KeyNavigation';

//Màn hình dành cho người dùng đã xác thực:
import MainNavigator from './MainNavigator';

//Màn hình dành cho người dùng chưa xác thực:
import AuthNavigator from './AuthNavigatior';

//Các màn hình không cần xác thực dùng cho toàn App:
import AppIntro from '../screens/AppIntro/AppIntro';
import Webview from '../screens/Webview/Webview';
import Location from '../screens/Location/Location';
import Map from '../screens/Map/Map';
import Notification from '../screens/Notification/Notification';
import QR from '../screens/QR/QR';
import Video from '../screens/Video/Video';
import NotificationDetail from '../screens/NotificationDetail/NotificationDetail';
import DirectionMap from '../screens/DirectionMap/DirectionMap';
import Animation from '../screens/Animations/Animation';
import YoutobeAds from '../screens/YoutobeAds/YoutobeAds';
import DownLoadImg from '../screens/DownLoadImage/DownLoadImg';
import LightScreen from '../screens/LightScreen/LightScreen';

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
          initialRouteName={KEY_NAVIGATION.app_intro}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <RootStack.Screen
            name={KEY_NAVIGATION.app_intro}
            component={AppIntro}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.main_navigator}
            component={MainNavigator}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.auth_navigator}
            component={AuthNavigator}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.location}
            component={Location}
          />
          <RootStack.Screen name={KEY_NAVIGATION.map} component={Map} />
          <RootStack.Screen
            name={KEY_NAVIGATION.notification}
            component={Notification}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.notification_detail}
            component={NotificationDetail}
          />
          <RootStack.Screen name={KEY_NAVIGATION.qr} component={QR} />
          <RootStack.Screen name={KEY_NAVIGATION.video} component={Video} />
          <RootStack.Screen name={KEY_NAVIGATION.webview} component={Webview} />
          <RootStack.Screen
            name={KEY_NAVIGATION.direction_map}
            component={DirectionMap}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.animation}
            component={Animation}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.youtube_ads}
            component={YoutobeAds}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.download_img}
            component={DownLoadImg}
          />
          <RootStack.Screen
            name={KEY_NAVIGATION.light_screen}
            component={LightScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default RootNavigator;
