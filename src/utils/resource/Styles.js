import {StyleSheet} from 'react-native';
import {SIZE} from './Sizes';
import {COLOR} from './Colors';

const STYLE = {
  //App style
  padding: 16,
  border_radius: 4,
  margin: 4,
  //Shadow style
  shadow: {
    shadowColor: '#272C33',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  //Text style
  defaultText: {
    color: COLOR.dark,
    fontWeight: '500',
    fontSize: SIZE.H6,
  },

  descriptionText: {
    color: COLOR.inactive_color,
    fontWeight: '500',
    fontSize: SIZE.H6,
  },
  border: {
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR.grey_0,
  },
  //Center content
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceWidth: {
    width: SIZE.device_width,
  },
  tylo_size: {height: 31, width: 41.29},
  //Position absolute
  position_absolute: StyleSheet.absoluteFill,
};

export {STYLE};
