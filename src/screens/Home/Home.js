import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  RefreshControl,
  Image,
} from 'react-native';

//Setup:
import {COLOR, SIZE} from '../../utils';
import ConfigPushnotification from '../../utils/services/ConfigPushnotification';

//Component:
import HeaderHome from './items/HeaderHome';
import SliderHome from './items/SliderHome';
import TabViewHome from './items/TabViewHome';

//Data:
import DATA_SLIDER_HOME from './data/DataSlider';
import DATA_MENU_HOME from './data/DataMenu';
import DATA_MENU_FIREBASE from './data/DataMenuFireBase';
import DATA_MENU_30_DAY_EXAMPLE from './data/DataMenu30DayExample';

//Services:
import {BottomService} from '../../utils/services/BottomService';

export default function Home({navigation}) {
  const [isRefresh, setStateIsRefresh] = useState(false);
  const onRefreshHome = () => {
    ConfigPushnotification();
    setStateIsRefresh(true);
    setTimeout(() => {
      setStateIsRefresh(false);
      BottomService.setDisplay(false);
    }, 3000);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefresh} onRefresh={onRefreshHome} />
      }
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor: COLOR.white}} />
      <HeaderHome></HeaderHome>
      <View>
        <Image
          source={{
            uri: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G',
          }}
          style={{
            height: SIZE.height(25),
            width: SIZE.width(100),
            position: 'absolute',
            top: 0,
            right: 0,
          }}></Image>
        <View
          style={{
            height: SIZE.height(25),
            marginTop: SIZE.height(20),
            marginHorizontal: SIZE.width(5),
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <SliderHome dataSlider={DATA_SLIDER_HOME}></SliderHome>
        </View>
        <ImageBackground
          source={{uri: 'https://sackim.com/wp-content/uploads/2020/01/14.jpg'}}
          style={{
            width: SIZE.width(100),
          }}>
          <TabViewHome
            dataMenuHome={DATA_MENU_HOME}
            dataMenuFireBase={DATA_MENU_FIREBASE}
            dataMenu30DayExample={DATA_MENU_30_DAY_EXAMPLE}></TabViewHome>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
