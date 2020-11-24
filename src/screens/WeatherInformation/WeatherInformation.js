import React, {useRef, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {fetchApiMethodGet} from './utils/FetchAPI';
import {API_KEY_WEATHER} from '../../utils/constants/System';
import {COLOR} from '../../utils/resource/Colors';

export default function WeatherInformation() {
  useEffect(() => {
    getDataWeatherHaNoi();
    return () => {};
  }, []);

  const getDataWeatherHaNoi = async () => {
    // const link = `http://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=${API_KEY_WEATHER}`;
    const link = `http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${API_KEY_WEATHER}`;
    let response = await fetchApiMethodGet(link);
    console.log('response', response);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.orange,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>ahaha</Text>
    </View>
  );
}
