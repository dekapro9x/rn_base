import {DATA_SUPPER_MARKET} from './DataSuperMarKet';
import {DATA_MAKER_PRIORITY} from './DataMakerPriority';
import {DATA_SCHOOL} from './DataSchool';
import {DATA_PARK} from './DataPark';
import {DATA_COMPANY} from './DataCopany';
import {DATA_FOOTBALL_PITCHES} from './DataFootballPitches';
import {DATA_MUSEUM} from './DataMuseum';
import {DATA_BUILDING} from './DataBuilding';
import {DATA_BRIDGE} from './DataBridge';
const DATA_AROUND_LOCATION = {
  myLocation: {
    latitude: 21.089193,
    longitude: 105.795295,
    title: 'Chung Cư Tây Hồ Riverview',
    description:
      'Số 425 An Dương Vương, Phú Thượng, Tây Hồ, Hà Nội 10000, Việt Nam',
  },
  listMakerOnMapViewCricle: [
    {
      latitude: 21.080350652560774,
      longitude: 105.79538740217686,
      longitudeDelta: 0.00044927000999450684,
      latitudeDelta: 0.00023588017040765408,
      title: 'Bán kính 1km',
      description: 'Cách 1km',
      textradius: 'Bán kính 1km',
    },
    {
      latitude: 21.062429562064512,
      longitude: 105.79461961984634,
      longitudeDelta: 0.00046335160732269287,
      latitudeDelta: 0.0002427918735392609,
      title: 'Bán kính 3km',
      description: 'Cách 3km',
      textradius: 'Bán kính 3km',
    },
    {
      latitude: 21.044448110614596,
      longitude: 105.79432625323534,
      longitudeDelta: 0.00045128166675567627,
      latitudeDelta: 0.0002365629275580261,
      title: 'Bán kính 5km',
      description: 'Cách 5km',
      textradius: 'Bán kính 5km',
    },
  ],
  listMapViewCricle: [
    {radius: 1000, strokeWidth: 1},
    {radius: 3000, strokeWidth: 1},
    {radius: 5000, strokeWidth: 1},
  ],
  listSupermarket: [...DATA_SUPPER_MARKET],
  listSchool: [...DATA_SCHOOL],
  listPark: [...DATA_PARK],
  listCompany: [...DATA_COMPANY],
  listFootballPitches: [...DATA_FOOTBALL_PITCHES],
  listMuseum: [...DATA_MUSEUM],
  listBuilding: [...DATA_BUILDING],
  listBridge: [...DATA_BRIDGE],
  listMakerPriority: [...DATA_MAKER_PRIORITY],
};
export {DATA_AROUND_LOCATION};
