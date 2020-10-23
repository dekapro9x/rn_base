import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {AppContainer, AppImage} from '../../elements';
import {COLOR, isIos, SIZE} from '../../utils';

function DownLoadImg() {
  const [linkImage, setStateLinkImg] = useState('');
  const [heightImg, setStateHeightImg] = useState(0);
  const [renderButtonDownLoadImg, setStateButtonDownLoadImg] = useState(false);
  const [error, setStateError] = useState(false);

  //Lấy đường link ảnh:
  const onChangeTextinkImg = (link) => {
    setStateLinkImg(link);
  };

  useEffect(() => {
    checkPermisssionPhotoSave();
    return () => {};
  }, []);

  //Kiểm tra quyền truy cập vào tệp và thư viện:
  const checkPermisssionPhotoSave = async () => {
    if (isIos) {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch((error) => {
          // …
        });
    }

    //Android:
    else {
    }
  };

  // Kiểm tra quyền ghi ảnh IOS:
  // checkPermissionIosSavePhotoIOS = () => {
  //   Permissions.request('photo').then((response) => {
  //     if (response === 'authorized') {
  //       this.alertSaveImages();
  //     } else {
  //       this.alertOpenSettingPermissionAnbumImagesIOS();
  //       this.setState({showButtonDownLoad: false});
  //     }
  //   });
  // };

  //Lấy size ảnh:
  const getSizeImg = () => {
    if (linkImage) {
      Image.getSize(
        linkImage,
        (width, height) => {
          console.log('width, height', width, height);
          const heightImg = (height / width) * SIZE.width(100);
          setStateHeightImg(heightImg);
          setStateButtonDownLoadImg(true);
          setStateError(false);
        },
        (error) => {
          setStateError(true);
          setStateButtonDownLoadImg(false);
        },
      );
    } else {
      setStateError(false);
    }
  };

  //Hiển thị ảnh:
  const renderImage = () => {
    if (linkImage) {
      return (
        <AppImage
          style={{
            width: SIZE.width(100),
            height: heightImg,
            marginTop: SIZE.height(3),
          }}
          source={{uri: linkImage}}
          resizeMode={'stretch'}></AppImage>
      );
    }
    return null;
  };

  //Nhập link ảnh:
  const inputLinkImg = () => {
    return (
      <View>
        <Text
          style={{
            padding: SIZE.width(2),
            fontSize: SIZE.H4,
            fontWeight: 'bold',
            color: COLOR.COLOR_GREEN,
            textAlign: 'center',
          }}>
          Pase link ảnh vào đây:
        </Text>
        <TextInput
          onBlur={getSizeImg}
          onChangeText={onChangeTextinkImg}
          style={{
            height: SIZE.height(5),
            borderWidth: 2,
            borderColor: COLOR.grey,
            borderRadius: 5,
            paddingHorizontal: SIZE.width(3),
            marginHorizontal: SIZE.width(3),
          }}></TextInput>
        {error ? (
          <Text
            style={{
              color: COLOR.red,
              fontSize: SIZE.H3 * 0.7,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Không xác định được link ảnh
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <AppContainer
      haveTitle
      nameScreen={'DownLoad Image'}
      goBackScreen
      style={{backgroundColor: COLOR.white}}>
      <ScrollView>
        {inputLinkImg()}
        {renderImage()}
        {renderButtonDownLoadImg ? (
          <TouchableOpacity
            // onPress ={}
            style={{
              height: SIZE.height(7.5),
              width: SIZE.width(65),
              marginTop: SIZE.width(4),
              borderWidth: 1,
              borderRadius: SIZE.width(2),
              alignItems: 'center',
              marginLeft: SIZE.width(17.5),
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: SIZE.H2, color: COLOR.COLOR_VIOLET}}>
              DownLoad Image
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </AppContainer>
  );
}

export default DownLoadImg;
