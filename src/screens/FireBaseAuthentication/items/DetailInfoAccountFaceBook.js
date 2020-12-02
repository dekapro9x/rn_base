import React from 'react';
import {View, Linking} from 'react-native';
import {AppText} from '../../../elements';
import {SIZE} from '../../../utils';

export default function DetailInfoAccountFaceBook(props) {
  const {dataDetailInfoAccount} = props;
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
  return (
    <View
      style={{
        minHeight: SIZE.height(40),
        width: SIZE.width(100),
        alignItems: 'center',
      }}>
      <AppText style={{fontSize: SIZE.H5, color: 'red', fontWeight: 'bold'}}>
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
    </View>
  );
}
