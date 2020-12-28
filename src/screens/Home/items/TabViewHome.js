//Library:
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TabView, TabBar, ScrollPager} from 'react-native-tab-view';

//Setup:
import {AppText, AppImage} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';

//Component:
import MenuHome from './MenuHome';
import MenuFireBase from './MenuFireBase';
import Menu30DayExample from './Menu30DayExample';
import ServicesActiveTabViewBottomMenu from '../../../utils/services/ServicesActiveTabViewBottomMenu';

function TabViewHome(props) {
  //Index: Vị trí tabview đầu tiên được active:
  const [index, setIndex] = useState(0);
  const {dataMenuHome, dataMenuFireBase, dataMenu30DayExample} = props;
  useEffect(() => {
    ServicesActiveTabViewBottomMenu.onChange('TabviewHome', (event) => {
      if (event && event.key == 'ACTIVE_TAB_VIEW') {
        setIndex(event.setIndex);
      }
    });
    return () => {};
  }, []);
  //Routes số lượng tabview:
  const [routes] = useState([
    {
      key: 'menu',
      title: 'Menu',
      img: 'https://i.dlpng.com/static/png/6470996_preview.png',
    },
    {
      key: 'firebase',
      title: 'FireBase',
      img:
        'https://www.gstatic.com/devrel-devsite/prod/v36e9b4a2fdc696650f09851e8c880b958655492821ded3455f80aaef87b6b52b/firebase/images/touchicon-180.png',
    },
    {
      key: 'native',
      title: 'Native',
      img:
        'https://www.mindinventory.com/blog/wp-content/uploads/2018/11/ios-android-development-using-react-native.png',
    },
    {
      key: 'example',
      title: '30 Day',
      img:
        'https://d2uusema5elisf.cloudfront.net/n/20191101192125417_twitter.jpg',
    },
  ]);

  //Chuyển tabView :
  const onChangeTabView = (index) => {
    setIndex(index);
  };

  //Các Component:
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'menu':
        return <MenuHome dataMenuHome={dataMenuHome}></MenuHome>;
      case 'firebase':
        return (
          <MenuFireBase dataMenuFireBase={dataMenuFireBase}></MenuFireBase>
        );
      case 'native':
        return <View></View>;
      case 'example':
        return (
          <Menu30DayExample
            dataMenu30DayExample={dataMenu30DayExample}></Menu30DayExample>
        );
      default:
        return <View></View>;
    }
  };

  //Hiển thị Tabbar:
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{width: SIZE.width(100), height: SIZE.height(15)}}
      style={{
        backgroundColor: COLOR.white,
        shadowOffset: {height: 0, width: 0},
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
      }}
      renderLabel={({route, focused}) => (
        <View
          style={{
            backgroundColor: focused ? COLOR.white : COLOR.white,
            borderBottomColor: focused ? COLOR.red : COLOR.TRANSPARENT,
            borderBottomWidth: SIZE.width(0.8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppImage
            source={{
              uri: route.img,
            }}
            style={{
              height: SIZE.width(15),
              width: SIZE.width(15),
            }}></AppImage>
          <AppText
            style={{
              fontWeight: 'bold',
              fontSize: SIZE.H5,
              color: focused ? COLOR.red : COLOR.black,
            }}>
            {route.title}
          </AppText>
        </View>
      )}
      renderIndicator={() => null}
      activeColor={COLOR.white}
      inactiveColor={COLOR.red}
      tabStyle={{padding: 0}}
    />
  );

  return (
    <View style={{flex: 1, marginTop: SIZE.height(0)}}>
      <TabView
        lazy
        swipeEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={onChangeTabView}
        initialLayout={SIZE.width(100)}
        style={{width: SIZE.width(100)}}
        tabBarPosition={'top'}
        // renderPager={(props) => <ScrollPager {...props}></ScrollPager>}
      />
    </View>
  );
}
export default React.memo(TabViewHome);
