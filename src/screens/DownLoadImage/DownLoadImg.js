import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {AppContainer, AppImage, AppText} from '../../elements';
import {COLOR, isIos, SIZE} from '../../utils';

function DownLoadImg() {
  const [linkImage, setStateLinkImg] = useState('');
  const setLinkImgDownLoad = useRef('');
  const [heightImg, setStateHeightImg] = useState(0);
  const [renderButtonDownLoadImg, setStateButtonDownLoadImg] = useState(false);
  const [error, setStateError] = useState(false);

  //Lấy đường link ảnh:
  const onChangeTextinkImg = (link) => {
    setStateLinkImg(link);
    setLinkImgDownLoad.current = link;
  };

  useEffect(() => {
    checkPermissionAlbumPlatform();
    return () => {};
  }, []);

  //Kiểm tra quyền truy cập vào tệp và thư viện:
  const checkPermissionAlbumPlatform = async () => {
    if (isIos) {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              break;
            case RESULTS.DENIED:
              break;
            case RESULTS.GRANTED:
              break;
            case RESULTS.BLOCKED:
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

  //Thông báo muốn lưu ảnh không?
  const alertSaveImages = () => {
    return Alert.alert(
      'Bạn có muốn tải ảnh này vào anbum ảnh ko？',
      '',
      [
        {
          text: 'Hủy bỏ',
          onPress: () => {},
        },
        {text: 'OK', onPress: downLoadImage, style: 'destructive'},
      ],
      {cancelable: false},
    );
  };

  //Thực hiện tải ảnh:
  const downLoadImage = async () => {
    try {
      var date = new Date();
      let image_URL = encodeURI(setLinkImgDownLoad.current); //Chuyển đổi các kí tự đặc biệt sang kí tự hợp lệ:
      console.log('image_URL', image_URL);
      var ext = getExtention(image_URL);
      ext = '.' + ext[0];
      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      const response = await config(options).fetch('GET', image_URL);
      if (response && response.respInfo && response.respInfo.status == 200) {
        const tag = response.respInfo.redirects;
        let urlImg = tag[0];
        if (tag && Array.isArray(tag)) {
          await CameraRoll.save(`${urlImg}`, 'photo');
          Alert.alert('Lưu ảnh thành công!');
        }
      }
    } catch (error) {
      Alert.alert('Có lỗi trong quá trình tải ảnh!');
    } finally {
    }
  };

  //So sánh chuỗi được lưu
  const getExtention = (filename) => {
    console.log(/[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined);
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  // Kiểm tra quyền ghi ảnh IOS:
  const savePhoto = () => {
    if (isIos) {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result === 'granted') {
          alertSaveImages();
        } else {
          setStateButtonDownLoadImg(false);
        }
      });
    } else {
      alertSaveImages();
    }
  };

  //Lấy size ảnh:
  const getSizeImg = () => {
    if (setLinkImgDownLoad.current) {
      try {
        Image.getSize(
          setLinkImgDownLoad.current,
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
      } catch (error) {
        setStateError(true);
        setStateButtonDownLoadImg(false);
      }
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
  //Lấy link ảnh mặc định:
  const getLinkDefault = () => {
    setLinkImgDownLoad.current =
      'https://kenh14cdn.com/2018/5/29/306041951895727784346372303616811700060160n-1527605319565851621152.jpg';
    setTimeout(() => {
      getSizeImg();
    }, 1000);
    setStateLinkImg(
      'https://kenh14cdn.com/2018/5/29/306041951895727784346372303616811700060160n-1527605319565851621152.jpg',
    );
  };

  //Nhập link ảnh:
  const inputLinkImg = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: SIZE.width(100),
            justifyContent: 'center',
            padding: SIZE.width(3),
          }}>
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
          <TouchableOpacity
            onPress={getLinkDefault}
            style={{
              justifyContent: 'center',
              backgroundColor: 'red',
              borderRadius: SIZE.width(2),
            }}>
            <AppText
              style={{
                paddingHorizontal: SIZE.width(4),
                fontWeight: 'bold',
                fontSize: SIZE.H4,
                color: COLOR.white,
              }}>
              Get Link
            </AppText>
          </TouchableOpacity>
        </View>
        <TextInput
          onBlur={getSizeImg}
          onChangeText={onChangeTextinkImg}
          style={{
            minHeight: SIZE.height(10),
            borderWidth: 2,
            borderColor: COLOR.grey,
            borderRadius: 5,
            paddingHorizontal: SIZE.width(3),
            marginHorizontal: SIZE.width(3),
          }}>
          {linkImage}
        </TextInput>
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
            onPress={savePhoto}
            style={{
              height: SIZE.height(7.5),
              width: SIZE.width(65),
              marginTop: SIZE.width(4),
              borderWidth: 1,
              borderRadius: SIZE.width(2),
              alignItems: 'center',
              marginLeft: SIZE.width(17.5),
              justifyContent: 'center',
              marginBottom: SIZE.width(4),
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
