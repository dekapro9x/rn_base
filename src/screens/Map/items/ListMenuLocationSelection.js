import React, {PureComponent} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {DATA_MENU_LOCATION} from '../utils/DataListMenuLocationSelect';
import ItemListLocationSelection from './ItemListLocationSelection';
import {SIZE} from '../../../utils';
import {VisibleActionService} from '../../../utils/services/VisibleActionService';

export default class ListMenuLocationSelection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {visible: VisibleActionService.get()};
  }
  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
    VisibleActionService.onChange('change-visible-filter-map', (visible) => {
      this.setState({visible});
    });
  }

  componentWillUnmount() {
    VisibleActionService.deleteKey('change-visible-filter-map');
  }

  keyExtractor = (item, index) => `${index}`;

  renderItem = ({item, index}) => {
    const {
      renderListSupperMarket,
      renderListSchool,
      renderListPark,
      renderListCompany,
      renderListFootballPitches,
      renderListMuseum,
      renderListBuilding,
      renderListBridge,
    } = this.props;

    return (
      <ItemListLocationSelection
        renderListSupperMarket={renderListSupperMarket}
        renderListSchool={renderListSchool}
        renderListPark={renderListPark}
        renderListCompany={renderListCompany}
        renderListFootballPitches={renderListFootballPitches}
        renderListMuseum={renderListMuseum}
        renderListBuilding={renderListBuilding}
        renderListBridge={renderListBridge}
        key={`${index}`}
        item={item}
        index={index}
      />
    );
  };

  render() {
    const {visible} = this.state;
    if (visible) {
      return (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={DATA_MENU_LOCATION}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    top: SIZE.width(10),
    height: SIZE.height(32),
    width: SIZE.height(25),
    left: SIZE.width(6),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
