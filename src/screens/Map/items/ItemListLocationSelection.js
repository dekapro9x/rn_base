import React, {Component} from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR, SIZE} from '../../../utils';

export default class ItemListLocationSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChoose: true,
    };
  }
  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  pressItemMenuSelection = (item, index) => () => {
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
    switch (item && index) {
      case 0:
        renderListSupperMarket();
        break;
      case 1:
        renderListSchool();
        break;
      case 2:
        renderListPark();
        break;
      case 3:
        renderListCompany();
        break;
      case 4:
        renderListFootballPitches();
        break;
      case 5:
        renderListMuseum();
        break;
      case 6:
        renderListBuilding();
        break;
      case 7:
        renderListBridge();
        break;
      default:
      // code block
    }
    this.setState({isChoose: !this.state.isChoose});
  };

  render() {
    const {isChoose} = this.state;
    const {item, index} = this.props;
    return (
      <TouchableOpacity onPress={this.pressItemMenuSelection(item, index)}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          colors={isChoose ? ['#fe8c00', '#f83600'] : ['#ece9e6', '#ffffff']}
          style={{
            // height: SIZE.height(6),
            minWidth: SIZE.height(24),
            borderRadius: 12,
            marginVertical: SIZE.padding / 2,
            backgroundColor: 'red',
            paddingVertical: SIZE.padding / 2,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: isChoose ? 0 : 1,
            borderColor: isChoose ? null : '#464646',
          }}>
          <Image
            source={item.icon}
            style={{height: 10, width: 10, marginLeft: 3}}
          />
          <Text
            style={{
              fontSize: 12,
              color: isChoose ? COLOR.white : COLOR.black,
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
