import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ListMenuLocationSelection from './component/ListMenuLocationSelection';
import {DATA_AROUND_LOCATION} from './DataAroundLocation';
import CricleMapView from './component/CricleMapView';
import MakerMapOnMapViewCricle from './component/MakerOnMapViewCricle';
import ListMaker from './component/ListMaker';
import {SIZE} from '../../utils';

export default class Project extends PureComponent {
  constructor(props) {
    super(props);
    const myLatitude = DATA_AROUND_LOCATION.myLocation.latitude;
    const myLongitude = DATA_AROUND_LOCATION.myLocation.longitude;
    this.state = {
      initialMapView: false,
      listMakerOnCricle: DATA_AROUND_LOCATION.listMakerOnMapViewCricle,
      region: {
        latitude: myLatitude,
        longitude: myLongitude,
        longitudeDelta: 0.0111,
        latitudeDelta: 0.052,
      },
      showListSupperMarket: true,
      showListSchool: true,
      showListPark: true,
      showListCompany: true,
      showListFootballPitches: true,
      showListMuseum: true,
      showListBuilding: true,
      showListBridge: true,
    };
  }
  componentDidMount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(
      () => this.setState({initialMapView: true}),
      1000,
    );
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  //Danh sách menu bên trái hiển thị các địa điểm cần tìm
  listMenuLocationSelection = () => {
    return (
      <ListMenuLocationSelection
        renderListSupperMarket={this.renderListSupperMarket}
        renderListSchool={this.renderListSchool}
        renderListPark={this.renderListPark}
        renderListCompany={this.renderListCompany}
        renderListFootballPitches={this.renderListFootballPitches}
        renderListMuseum={this.renderListMuseum}
        renderListBuilding={this.renderListBuilding}
        renderListBridge={this.renderListBridge}
        onRef={(ref) => {
          this.ListLocationSelection = ref;
        }}
      />
    );
  };

  //Bật tắt các Maker theo nhóm danh sách.
  renderListSupperMarket = () => {
    this.setState({showListSupperMarket: !this.state.showListSupperMarket});
  };
  renderListSchool = () => {
    this.setState({showListSchool: !this.state.showListSchool});
  };
  renderListPark = () => {
    this.setState({showListPark: !this.state.showListPark});
  };
  renderListCompany = () => {
    this.setState({showListCompany: !this.state.showListCompany});
  };
  renderListFootballPitches = () => {
    this.setState({
      showListFootballPitches: !this.state.showListFootballPitches,
    });
  };
  renderListMuseum = () => {
    this.setState({showListMuseum: !this.state.showListMuseum});
  };
  renderListBuilding = () => {
    this.setState({showListBuilding: !this.state.showListBuilding});
  };
  renderListBridge = () => {
    this.setState({showListBridge: !this.state.showListBridge});
  };

  //Maker hiển thị địa chỉ được ưu tiên
  myMakerLocation = () => {
    const {
      latitude,
      longitude,
      title,
      description,
    } = DATA_AROUND_LOCATION.myLocation;
    return (
      <MapView.Marker
        // resizeMode="contain"
        // style={{width: 12, height: 12}}
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title={title}
        description={description}
      />
    );
  };

  renderMapView = () => {
    const {
      region,
      showListSupperMarket,
      showListSchool,
      showListPark,
      showListCompany,
      showListFootballPitches,
      showListMuseum,
      showListBuilding,
      showListBridge,
      initialMapView,
    } = this.state;
    const {currentTab, navigation} = this.props;
    if (initialMapView) {
      return (
        <MapView
          showsTraffic={true}
          // onRegionChangeComplete={locationInMap => {
          //   this.setState({region: {...locationInMap}});
          // }}
          // onPress={e => console.log(e)}
          showsIndoorLevelPicker={false}
          zoomTapEnabled={true}
          zoomEnabled={true}
          pitchEnabled={false}
          showsUserLocation={false}
          followsUserLocation={false}
          showsCompass={false}
          showsBuildings={false}
          loadingEnabled={true}
          showsIndoors={false}
          provider={PROVIDER_GOOGLE} // thêm dòng này là dùng map của google.
          style={styles.map}
          initialRegion={region}>
          {/* Địa chỉ mặc định hiển thị Maker */}
          {this.myMakerLocation()}
          {/* Danh sách các vòng bao bán kính gần nhất */}
          <CricleMapView
            onRef={(ref) => {
              this.CricleMapView = ref;
            }}
          />
          {/* Danh sách các Maker đại diện cho bán kính gần nhất */}
          <MakerMapOnMapViewCricle
            onRef={(ref) => {
              this.MakerMapOnMapViewCricle = ref;
            }}
          />
          {/* Danh sách siêu thị */}
          {showListSupperMarket ? (
            <ListMaker data={DATA_AROUND_LOCATION.listSupermarket} />
          ) : null}
          {/* Danh sách trường học */}
          {showListSchool ? (
            <ListMaker data={DATA_AROUND_LOCATION.listSchool} />
          ) : null}
          {/* Danh sách công viên */}
          {showListPark ? (
            <ListMaker data={DATA_AROUND_LOCATION.listPark} />
          ) : null}
          {/* Danh sách cơ quan*/}
          {showListCompany ? (
            <ListMaker data={DATA_AROUND_LOCATION.listCompany} />
          ) : null}
          {/* Danh sách sân bóng*/}
          {showListFootballPitches ? (
            <ListMaker data={DATA_AROUND_LOCATION.listFootballPitches} />
          ) : null}
          {/* Danh sách bảo tàng */}
          {showListMuseum ? (
            <ListMaker data={DATA_AROUND_LOCATION.listMuseum} />
          ) : null}
          {/* Danh sách các tòa nhà */}
          {showListBuilding ? (
            <ListMaker data={DATA_AROUND_LOCATION.listBuilding} />
          ) : null}
          {/* Danh sách cầu */}
          {showListBridge ? (
            <ListMaker data={DATA_AROUND_LOCATION.listBridge} />
          ) : null}
        </MapView>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderMapView()}
        {/* Danh sách 2 menu lựa chọn  */}
        {this.listMenuLocationSelection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: SIZE.device_width,
  },
});
