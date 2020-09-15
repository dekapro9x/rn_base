import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  RefreshControl,
  Image,
} from 'react-native';
import {COLOR, SIZE} from '../../utils';

//Component:
import HeaderHome from './items/HeaderHome';
import SliderHome from './items/SliderHome';
import TabViewHome from './items/TabViewHome';

//Data:
import DATA_SLIDER_HOME from './data/DataSlider';
import {DATA_MENU_HOME} from './data/DataMenu';

//Services:
import {BottomService} from '../../utils/services/BottomService';

export default function Home({navigation}) {
  const [isRefresh, setStateIsRefresh] = useState(false);
  const onRefreshHome = () => {
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
            uri:
              'https://znews-photo.zadn.vn/w660/Uploaded/mdf_eioxrd/2019_10_09/1.jpg',
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
            marginTop: SIZE.height(18),
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
          <TabViewHome dataMenuHome={DATA_MENU_HOME}></TabViewHome>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
