import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR} from '../../utils';

export default function DownLoadImg() {
  return (
    <AppContainer
      haveTitle
      nameScreen={'DownLoad Image'}
      goBackScreen
      style={{backgroundColor: COLOR.white}}>
      {/* {renderListVideo()} */}
    </AppContainer>
  );
}
