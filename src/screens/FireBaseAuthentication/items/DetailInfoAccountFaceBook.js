import React, {useState} from 'react';
import {View, Linking} from 'react-native';
import {AppText} from '../../../elements';
import {COLOR, SIZE} from '../../../utils';

export default function DetailInfoAccountFaceBook(props) {
  const {dataDetailInfoAccount} = props;
  const [showMoreListPostStatus, setStateShowMoreListPostStatus] = useState(
    false,
  );

  //Danh sách bài chia sẻ cá nhân:
  const renderListActionPostStatus = () => {
    if (dataDetailInfoAccount.posts && dataDetailInfoAccount.posts.data) {
      let arrPostMessStatus = [];
      dataDetailInfoAccount.posts.data.forEach((element) => {
        if (element.message) {
          arrPostMessStatus.push(element);
        }
      });
      console.log('arrPostMessStatus', arrPostMessStatus);
      let listStatus = null;
      if (!showMoreListPostStatus) {
        listStatus = arrPostMessStatus.map((item, index) => {
          return (
            <AppText
              style={{fontSize: SIZE.H4, fontWeight: 'bold', color: 'red'}}
              key={`${index}`}>
              STT{index + 1}.
              <AppText
                style={{
                  fontSize: SIZE.H5,
                  fontWeight: '400',
                  color: COLOR.black,
                }}>
                {item.message}
              </AppText>
            </AppText>
          );
        });
      } else {
        return (
          <View>
            <AppText
              style={{fontSize: SIZE.H4, fontWeight: 'bold', color: 'red'}}>
              STT{1}.
              <AppText
                style={{
                  fontSize: SIZE.H5,
                  fontWeight: '400',
                  color: COLOR.black,
                }}>
                {arrPostMessStatus[0].message}
              </AppText>
            </AppText>
          </View>
        );
      }
      return <>{listStatus}</>;
    }
    return null;
  };

  //Hiển thị các thông tin cơ bản:
  const renderInfoBasic = (title, analystic, type) => {
    if (type == 'link') {
      return (
        <AppText
          style={{fontSize: SIZE.H5 * 0.8, color: 'blue', fontWeight: 'bold'}}>
          {title}:{' '}
          <AppText
            onPress={() => {
              Linking.openURL(analystic);
            }}
            style={{
              fontSize: SIZE.H5 * 0.8,
              color: 'green',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
            }}>
            {analystic}
          </AppText>
        </AppText>
      );
    }
    return (
      <AppText
        style={{fontSize: SIZE.H5 * 0.8, color: 'blue', fontWeight: 'bold'}}>
        {title}:{' '}
        <AppText
          style={{
            fontSize: SIZE.H5 * 0.8,
            color: 'red',
            fontWeight: 'bold',
          }}>
          {analystic}
        </AppText>
      </AppText>
    );
  };

  // Hiển thị danh sách bài post gần nhất:
  const showMorePostSTT = () => {
    setStateShowMoreListPostStatus(!showMoreListPostStatus);
  };
  return (
    <View
      style={{
        minHeight: SIZE.height(40),
        width: SIZE.width(100),
        alignItems: 'center',
      }}>
      <AppText
        style={{
          fontSize: SIZE.H5,
          color: COLOR.color_bottom_app2,
          fontWeight: 'bold',
        }}>
        Thông tin chi tiết cá nhân :
      </AppText>
      {/* Hiển thị tên */}
      {renderInfoBasic('Họ và tên', dataDetailInfoAccount?.name)}
      {/* Hiển thị tuổi */}
      {renderInfoBasic('Ngày sinh', dataDetailInfoAccount?.birthday)}
      {/* Hiển thị email */}
      {renderInfoBasic('Địa chỉ email', dataDetailInfoAccount?.email)}
      {/* Hiển thị giới tính */}
      {renderInfoBasic(
        'Giới tính',
        dataDetailInfoAccount?.gender == 'male' ? 'Nam' : 'Nữ',
      )}
      {/* Hiển thị địa chỉ: */}
      {renderInfoBasic('Quê quán', dataDetailInfoAccount.hometown?.name)}
      {/* Hiển thị đường dẫn trang cá nhân: */}
      {renderInfoBasic(
        'Đường dẫn trang cá nhân',
        dataDetailInfoAccount?.link,
        'link',
      )}
      {/* Hiển thị địa chỉ hiện tại: */}
      {renderInfoBasic(
        'Địa chỉ hiện tại',
        dataDetailInfoAccount.location?.name,
      )}
      {renderInfoBasic(
        'Tổng số danh sách bạn bè',
        dataDetailInfoAccount.friends.summary?.total_count,
      )}
      <AppText
        onPress={showMorePostSTT}
        style={{
          fontSize: SIZE.H5,
          color: COLOR.color_bottom_app2,
          fontWeight: 'bold',
        }}>
        Chi tiết hoạt động gần nhất :
      </AppText>
      {renderListActionPostStatus()}
    </View>
  );
}
