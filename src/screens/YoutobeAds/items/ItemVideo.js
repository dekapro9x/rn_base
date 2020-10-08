//Library:
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {YouTubeStandaloneIOS} from 'react-native-youtube';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Setup:
import {COLOR, SIZE, isIos} from '../../../utils';
import {getImageWithLinkYouTube, getIDWithLinkYouTube} from '../utils';

//Component:
import {AppImage} from '../../../elements';
import {GetTimeJapan} from '../../../utils/modules/GetTimeJapan';
import {AppText} from '../../../elements/AppText';
import VideoIOS from '../items/VideoIOS';

//Item:
function ItemVideo(props) {
  const {item, index} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [popupStartVideo, setStatePopupStartVideo] = useState(false);
  const [receiveCoupon, setStatereceiveCoupon] = useState(false);
  const [videoHasCoupon, setStateVideoHasCoupon] = useState(false);

  //Mở Video:
  const onPressVideo = async () => {
    if (isIos) {
      if (item.videoHasCoupon) {
        setModalVisible(true);
      } else {
        YouTubeStandaloneIOS.playVideo(getIDWithLinkYouTube(item.url));
      }
    }
  };

  const renderButtonReceiveCoupon = () => {
    setStatereceiveCoupon(true);
  };

  //Tắt modal:
  const unVisibleModal = () => {
    setModalVisible(false);
    setStatePopupStartVideo(false);
    setStatereceiveCoupon(false);
  };
  
  const playVideoNotHasCoupon = () => {
    setStatePopupStartVideo(true);
  };

  //Hiển thị Modal:
  const renderModal = () => {
    if (popupStartVideo) {
      return (
        <Modal
          deviceWidth={SIZE.width(100)}
          isVisible={isModalVisible}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '50%',
              width: '100%',
              backgroundColor: COLOR.TRANSPARENT,
              alignItems: 'center',
            }}>
            <VideoIOS
              renderButtonReceiveCoupon={renderButtonReceiveCoupon}></VideoIOS>
            {receiveCoupon ? (
              <TouchableOpacity
                onPress={unVisibleModal}
                style={{
                  height: SIZE.height(8),
                  width: SIZE.width(80),
                  marginTop: SIZE.width(6),
                  backgroundColor: COLOR.milk,
                  borderWidth: SIZE.width(0.5),
                  borderColor: COLOR.red,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText
                  style={{
                    margin: SIZE.width(4),
                    fontSize: SIZE.H4,
                  }}>
                  Chúc mừng bạn nhận dc coupon mới
                </AppText>
              </TouchableOpacity>
            ) : null}
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          deviceWidth={SIZE.width(100)}
          isVisible={isModalVisible}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '50%',
              width: '100%',
              backgroundColor: COLOR.milk,
              alignItems: 'center',
            }}>
            <AppText style={{margin: SIZE.width(4), fontSize: SIZE.H4}}>
              再生する動画は途中で閉じることができません。再生してもよろしいですか？Video
              này sẽ k thể đóng giữa chừng, bạn có muốn xem k?
            </AppText>
            <TouchableOpacity
              onPress={playVideoNotHasCoupon}
              style={{
                height: SIZE.height(8),
                width: SIZE.width(80),
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                style={{
                  margin: SIZE.width(4),
                  fontSize: SIZE.H4,
                  color: COLOR.white,
                }}>
                はい
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={unVisibleModal}
              style={{
                height: SIZE.height(8),
                width: SIZE.width(80),
                marginTop: SIZE.width(6),
                backgroundColor: COLOR.milk,
                borderWidth: SIZE.width(0.5),
                borderColor: COLOR.red,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                style={{
                  margin: SIZE.width(4),
                  fontSize: SIZE.H4,
                }}>
                閉じる
              </AppText>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  };


  return (
    <TouchableOpacity onPress={onPressVideo} activeOpacity={0.8}>
      <View
        style={{
          width: SIZE.width(100),
          marginTop: index == 0 ? SIZE.width(2) : SIZE.width(12),
        }}>
        <AppImage
          source={{
            uri: getImageWithLinkYouTube(item.url),
          }}
          style={{width: SIZE.width(100), height: SIZE.width(70)}}
          resizeMode="contain"
        />
        <View
          style={[
            {top: SIZE.width(25), left: SIZE.width(40)},
            {
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <AntDesign name={'youtube'} size={70} color={COLOR.red} />
        </View>
      </View>
      <View>
        <AppText
          style={{
            marginLeft: SIZE.width(3),
            marginRight: SIZE.width(3),
            marginTop: SIZE.width(2),
            fontSize: SIZE.H5 * 1.2,
            fontWeight: 'bold',
          }}>
          {item.name}
        </AppText>
        <AppText style={{marginLeft: SIZE.width(3), marginTop: SIZE.width(2)}}>
          {GetTimeJapan.convertTimeJaPanCreateTime(item.createdTime)}
        </AppText>
      </View>
      {renderModal()}
    </TouchableOpacity>
  );
}
export default ItemVideo;
