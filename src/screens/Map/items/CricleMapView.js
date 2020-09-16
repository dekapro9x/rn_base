import React, {useRef, Fragment} from 'react';
import MapView from 'react-native-maps';
import {DATA_AROUND_LOCATION} from '../utils/DataAroundLocation';
export default function CricleMapView() {
  const listCricleMapView = useRef(DATA_AROUND_LOCATION.listMapViewCricle);
  const myLocation = useRef(DATA_AROUND_LOCATION.myLocation);

  const itemCricleMap = (item, index) => {
    return (
      <MapView.Circle
        key={`${index}`}
        lineDashPhase={5}
        lineCap={'square'}
        center={{
          latitude: myLocation.current.latitude,
          longitude: myLocation.current.longitude,
        }}
        radius={item.radius}
        strokeWidth={item.strokeWidth}
      />
    );
  };

  //Vòng tròn bao quanh khu vực dân cư với các bán kính tìm kiếm địa điểm.
  const showListCricleMap = () => {
    if (
      Array.isArray(listCricleMapView.current) &&
      listCricleMapView.current.length > 0
    ) {
      return listCricleMapView.current.map((item, index) => {
        return itemCricleMap(item, index);
      });
    }
    return null;
  };
  return <Fragment>{showListCricleMap()}</Fragment>;
}
