//Library:
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

//Setup:
import {checkPermissionsLocation} from './utils/CheckPermissionLocation';

//Component:
import {Loading} from '../../elements/Loading';
import {COLOR, SIZE} from '../../utils/resource';

export default function Location() {
  const [loading, setStateLoading] = useState(true);
  const [currentLocation, setStateCurrentLocation] = useState({});
  const onDidMount = async () => {
    let location = await checkPermissionsLocation();
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
              altitudeAccuracy: position.coords.altitudeAccuracy,
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
  useEffect(() => {
    onDidMount();
    return () => {};
  }, []);
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
    </View>
  );
}
