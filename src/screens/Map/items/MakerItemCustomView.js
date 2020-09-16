import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {View, Text, Image} from 'react-native';
export default class MakerItemCustomView extends Component {
  customCallout(item, index) {
    return (
      <View key={`${item.id}${index}`} style={{alignItems: 'center'}}>
        <View>
          <View style={{backgroundColor: '#464646', borderRadius: 8}}>
            <Text
              style={{
                fontSize: 8,
                color: '#FFFFFF',
                padding: 3,
              }}>
              {item.title}
            </Text>
          </View>
        </View>
        <Image source={item.iconlocation} style={{height: 12, width: 12}} />
      </View>
    );
  }

  render() {
    const {item, index} = this.props;
    return (
      <MapView.Marker
        key={`${item.id}${index}`}
        ref={(marker) => {
          this.marker = marker;
        }}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        title={item.title}
        description={item.description}>
        {this.customCallout(item, index)}
        {/* <MapView.Callout key={`${index}`} tooltip={true}>
        <View
          key={`${item.id}${index}`}
          style={{
            minWidth: SIZE.width(15),
            minHeight: SIZE.width(10),
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            margin: 5,
          }}>
          <View
            key={`${item.id}${index}`}
            style={{
              minWidth: SIZE.width(13),
              minHeight: SIZE.width(9),
              borderRadius: 5,
              backgroundColor: '#F6F8FA',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowRadius: 5,
              shadowOpacity: 1.0,
            }}>
            <Image
              key={`${item.id}${index}`}
              source={{uri: 'https://i.ytimg.com/vi/vWeqpleG8F4/hqdefault.jpg'}}
              style={{
                height: SIZE.width(6),
                width: SIZE.width(12),
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#000000',
                marginLeft: 2,
                marginTop: 2,
              }}>{`${item.title}`}</Text>
            <Text
              style={{
                fontSize: 8,
                color: '#000000',
                marginLeft: 2,
                padding: 3,
              }}>{`${item.description}`}</Text>
          </View>
        </View>
      </MapView.Callout> */}
      </MapView.Marker>
    );
  }
}

export {MakerItemCustomView};
