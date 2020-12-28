//Library:
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

//Setup:
import {checkPermissionsLocationPlatform} from './utils/CheckPermissionLocationPlatform';

//Component:
import {Loading} from '../../elements/Loading';
import {COLOR, SIZE} from '../../utils/resource';
import {isIos} from '../../utils/constants/System';

export default function Location() {
  const [loading, setStateLoading] = useState(true);
  const [currentLocation, setStateCurrentLocation] = useState({});

  useEffect(() => {
    let timeCount = setTimeout(() => {
      onDidMount();
    }, 500);
    return () => {
      clearTimeout(timeCount);
    };
  }, []);

  const onDidMount = async () => {
    let location = await checkPermissionsLocationPlatform();
    console.log('location', location);
    if (location == 'GRANTED') {
      //Lấy vị trí hiện tại người dùng:
      Geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(position);
            setStateLoading(false);
            setStateCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              altitudeAccuracy: isIos
                ? position.coords.altitudeAccuracy
                : position.coords.accuracy,
              heading: position.coords.heading,
              speed: position.coords.speed,
              timestamp: position.timestamp,
              mocked: position.mocked,
            });
          }
        },
        (error) => {
          setStateLoading(false);
          setStateCurrentLocation({
            latitude: '',
            longitude: '',
          });
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: COLOR.gray_light,
        }}>
        <Loading></Loading>
      </View>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: SIZE.H2, fontWeight: 'bold'}}>
        Vị trí hiện tại của bạn:
      </Text>
      <Text>Latitude: {currentLocation.latitude}</Text>
      <Text>Longitude: {currentLocation.longitude}</Text>
      <Text>Accuracy: {currentLocation.accuracy}</Text>
      <Text>AltitudeAccuracy: {currentLocation.altitudeAccuracy}</Text>
      <Text>timestamp: {currentLocation.timestamp}</Text>
      <Text>speed: {currentLocation.speed}</Text>
      <Text>heading: {currentLocation.heading}</Text>
      <Text>mocked:{`${currentLocation.mocked}`}</Text>
    </View>
  );
}
