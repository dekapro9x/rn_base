//Library:
import React, {useState} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

//Setup:
import {SIZE, COLOR, KEY_NAVIGATION} from '../../utils';

//Component:
import {AppText} from '../../elements/AppText';
import {AppImage} from '../../elements';

const Entry = ({navigation}) => {
  const [lockButton, setStateLockButton] = useState(false);

  const onStartApp = () => {
    navigation.reset({
      index: 0,
      routes: [{name: KEY_NAVIGATION.main_navigator}],
    });
    setStateLockButton(true);
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://i.pinimg.com/564x/b3/60/c4/b360c49f48c2a03bf4d1c2f89fd2ca18.jpg',
      }}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: COLOR.BG_TRANSPARENT_30,
        }}>
        <AppImage
          source={require('../../images/splash.jpg')}
          style={{
            marginTop: SIZE.width(55),
            height: SIZE.width(50),
            width: SIZE.width(50),
            borderRadius: SIZE.width(25),
          }}
        />
        <Animatable.View
          useNativeDriver={true}
          animation={'fadeInUp'}
          delay={100}
          duration={600}>
          <TouchableOpacity
            disabled={lockButton ? true : false}
            style={{
              marginTop: SIZE.height(3),
              paddingVertical: SIZE.width(4),
              width: SIZE.width(70),
              backgroundColor: COLOR.COLOR_YELLOW,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onStartApp}
            hitSlop={{top: SIZE.width(3)}}>
            <AppText
              style={{
                color: COLOR.COLOR_BLACK,
                fontSize: SIZE.H4 * 1.1,
                fontWeight: 'bold',
              }}>
              はじめる
            </AppText>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default Entry;
