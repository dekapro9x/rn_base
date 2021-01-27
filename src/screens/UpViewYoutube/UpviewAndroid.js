import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import YouTube from 'react-native-youtube';
import {useNavigation} from '@react-navigation/core';
import {API_KEY_YOUTUBE, SIZE, COLOR} from '../../utils';
import {getIDWithLinkYouTube} from '../Video/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';

function VideoFullScreenAndroid({route}) {
  const videoAndroid = useRef(null);
  const {itemVideoAndroid} = route.params;
  const {url} = itemVideoAndroid;
  const navigation = useNavigation();
  const [isPlaying, setStatePlaying] = useState(false);
  const [fullScreen, setStateFullScreen] = useState(false);
  const timeCountVideo = useRef(0);

  useEffect(() => {
    timeCountVideo.current = setTimeout(() => {
      setStatePlaying(true);
    }, 1200);

    return () => {
      clearTimeout(timeCountVideo.current);
    };
  }, []);

  const goBackScreen = () => {
    setStatePlaying(false);
    navigation.goBack();
  };
  return (
    <View style={{backgroundColor: COLOR.black, height: SIZE.height(100)}}>
      <TouchableOpacity
        onPress={goBackScreen}
        style={{
          height: SIZE.width(12),
          width: SIZE.width(12),
          backgroundColor: COLOR.grey_900,
          borderRadius: SIZE.width(3),
          marginLeft: SIZE.width(2),
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZE.width(2),
        }}>
        <AntDesign name={'close'} color={COLOR.white} size={30} />
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {isPlaying && (
          <YouTube
            ref={videoAndroid}
            apiKey={API_KEY_YOUTUBE}
            videoId={getIDWithLinkYouTube(url)}
            play={isPlaying}
            loop={true}
            fullscreen={fullScreen}
            controls={1}
            style={{
              alignSelf: 'stretch',
              height: (SIZE.width(100) / 16) * 9,
            }}
            onError={(mess) => {
              if (
                mess.error === 'UNAUTHORIZED_OVERLAY' &&
                mess.target === 39497
              ) {
                setStatePlaying(false);
              }
            }}
            // onReady={(read) => {}}
            // onChangeState={(sea) => {}}
            // onChangeQuality={(e) => this.setState({quality: e.quality})}
            onChangeFullscreen={(e) => {
              setStateFullScreen(e.isFullscreen);
            }}
            onProgress={(e) => {}}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

export default VideoFullScreenAndroid;
