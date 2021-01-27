import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Button = ({onPress, param}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {param == 'LIBRARY' ? (
        <AntDesign name="pluscircleo" size={20} color="#66CCFC" />
      ) : (
        <AntDesign name="camerao" size={25} color="#66CCFC" />
      )}
    </TouchableOpacity>
  );
};

export default function UploadImageItem({item, handleImagePicker, param}) {
  return (
    <View style={styles.uploadImageItem}>
      {item !== undefined ? (
        <Image style={styles.image} source={{uri: item.uri}} />
      ) : (
        <Button onPress={handleImagePicker} param={param} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadImageItem: {
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 120,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
