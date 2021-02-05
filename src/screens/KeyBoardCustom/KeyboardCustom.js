import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {
  CustomTextInput,
  register,
  insertText,
  backSpace,
  hideKeyboard,
} from 'react-native-custom-keyboard-kit';
import {SIZE} from '../../utils';
import Feather from 'react-native-vector-icons/Feather';

register('price', () => MyKeyboard);

let listText = '';

function MyKeyboard(props) {
  const onPress1 = () => {
    insertText(props.tag, '1');
  };

  const onPress2 = () => {
    insertText(props.tag, '2');
  };

  const onPress3 = () => {
    insertText(props.tag, '3');
  };

  const onPress4 = () => {
    insertText(props.tag, '4');
  };

  const onPress5 = () => {
    insertText(props.tag, '5');
  };

  const onPress6 = () => {
    insertText(props.tag, '6');
  };
  const removeOneText = () => {
    backSpace(props.tag);
  };

  const onPress7 = () => {
    insertText(props.tag, '7');
  };

  const onPress8 = () => {
    insertText(props.tag, '8');
  };

  const onPress9 = () => {
    insertText(props.tag, '9');
  };

  const onPressBackSpace = () => {
    backSpace(props.tag);
  };

  const removeAll = () => {
    for (let index = 0; index < listText.length; index++) {
      backSpace(props.tag);
    }
  };

  const onPress0 = () => {
    insertText(props.tag, '0');
  };

  const onPressHideKeyboard = () => {
    hideKeyboard(props.tag);
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.buttonSmall}>
          <TouchableOpacity
            style={styles.touchableNumberSmall}
            onPress={onPress1}>
            <Text style={styles.buttonLabel}>1</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSmall}>
          <TouchableOpacity
            style={styles.touchableNumberSmall}
            onPress={onPress2}>
            <Text style={styles.buttonLabel}>2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSmall}>
          <TouchableOpacity
            style={styles.touchableNumberSmall}
            onPress={onPress3}>
            <Text style={styles.buttonLabel}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtonRemove}>
          <TouchableOpacity
            style={styles.touchableButtonRemove}
            onPress={removeAll}>
            <Text style={styles.textButtonRemove}>Xóa nhanh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.buttonSmall}>
          <TouchableOpacity
            style={styles.touchableNumberSmall}
            onPress={onPress4}>
            <Text style={styles.buttonLabel}>4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSmall}>
          <TouchableOpacity
            style={styles.touchableNumberSmall}
            onPress={onPress5}>
            <Text style={styles.buttonLabel}>5</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSmall}>
          <TouchableOpacity
            style={styles.touchableNumberSmall}
            onPress={onPress6}>
            <Text style={styles.buttonLabel}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtonRemove}>
          <TouchableOpacity
            style={styles.touchableButtonRemove}
            onPress={removeOneText}>
            <Feather name={'delete'} size={32} color={'black'}></Feather>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerButtonBig}>
              <TouchableOpacity style={styles.touchableBig} onPress={onPress7}>
                <Text style={styles.buttonLabel}>7</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerButtonBig}>
              <TouchableOpacity style={styles.touchableBig} onPress={onPress8}>
                <Text style={styles.buttonLabel}>8</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerButtonBig}>
              <TouchableOpacity style={styles.touchableBig} onPress={onPress9}>
                <Text style={styles.buttonLabel}>9</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerButtonBig}>
              <TouchableOpacity
                style={styles.touchableBig}
                onPress={onPressBackSpace}>
                <Text style={styles.buttonLabel}>&larr;</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerButtonBig}>
              <TouchableOpacity style={styles.touchableBig} onPress={onPress0}>
                <Text style={styles.buttonLabel}>0</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerButtonBig}>
              <TouchableOpacity
                style={styles.touchableBig}
                onPress={onPressHideKeyboard}>
                <Text style={styles.buttonLabel}>&crarr;</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.containerSearch}>
          <View style={styles.touchableSearch}>
            <Feather name={'search'} size={45} color={'white'}></Feather>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function KeyboardCustom(props) {
  const [value, setStateValue] = useState('');
  const onChangeText = (text) => {
    setStateValue(text);
    listText = text;
  };
  return (
    <View style={styles.container}>
      <CustomTextInput
        customKeyboardType="price"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: '#D1D3D9',
    borderWidth: 1,
    borderColor: 'grey',
    width: SIZE.height(45),
    fontSize: 19,
  },
  touchableNumberSmall: {
    height: SIZE.height(6),
    width: SIZE.width(23),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: SIZE.width(1),
  },
  touchableNumberBig: {
    height: SIZE.height(6),
    width: SIZE.width(23),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: SIZE.width(1),
  },
  buttonLabel: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 13,
    paddingBottom: 8,
    fontSize: SIZE.H4 * 1.2,
    color: 'black',
  },
  buttonSmall: {
    backgroundColor: '#A8B0BB',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButtonBig: {
    width: '33.33%',
    backgroundColor: '#A8B0BB',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE.height(7.5),
  },
  touchableBig: {
    width: SIZE.width(23),
    height: SIZE.height(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: SIZE.width(1),
  },
  containerButtonRemove: {
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#A8B0BB',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableButtonRemove: {
    height: SIZE.height(6.6),
    width: SIZE.width(23),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE.width(1),
    backgroundColor: '#A8B0BB',
    margin: 2,
  },
  containerSearch: {
    borderColor: '#A8B0BB',
    borderWidth: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE.height(15),
    width: SIZE.width(25),
    borderBottomColor: '#FFFFFF',
  },
  touchableSearch: {
    height: SIZE.height(13.4),
    width: SIZE.width(23.5),
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE.width(3),
  },
  textButtonRemove: {
    fontSize: SIZE.H5 * 0.9,
    color: 'black',
    fontWeight: 'bold',
  },
});
