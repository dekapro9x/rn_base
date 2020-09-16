//Danh sách các địa điểm đánh dấu bán kính
import React, {Component, Fragment} from 'react';
import MapView from 'react-native-maps';
import {Text, StyleSheet} from 'react-native';
import {DATA_AROUND_LOCATION} from '../utils/DataAroundLocation';
export default class MakerMapOnMapViewCricle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMakerOnCricle: DATA_AROUND_LOCATION.listMakerOnMapViewCricle,
    };
  }
  renderItemMaker = (item, index) => {
    return (
      <MapView.Marker
        key={`${index}`}
        ref={(marker) => {
          this.marker = marker;
        }}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        title={item.title}
        description={item.description}>
        <Text style={styles.text}>{item.textradius}</Text>
      </MapView.Marker>
    );
  };
  showListMaker = () => {
    const {listMakerOnCricle} = this.state;
    if (Array.isArray(listMakerOnCricle) && listMakerOnCricle.length > 0) {
      return listMakerOnCricle.map((item, index) => {
        return this.renderItemMaker(item, index);
      });
    }
    return null;
  };
  render() {
    return <Fragment>{this.showListMaker()}</Fragment>;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 8,
    color: '#FF0000',
  },
});
