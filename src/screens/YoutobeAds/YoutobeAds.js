import React from 'react';
import {Text, FlatList} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR} from '../../utils';
import ItemVideo from './items/ItemVideo';
import {DataVideo} from './data/DataVideo';

export default function YoutobeAds() {
  const itemVideo = ({item, index}) => {
    return <ItemVideo item={item}></ItemVideo>;
  };

  const renderListVideo = () => {
    return (
      <FlatList
        data={DataVideo}
        renderItem={itemVideo}
        keyExtractor={(item, index) => `${index}`}></FlatList>
    );
  };
  return (
    <AppContainer
      haveTitle
      nameScreen={'Youtobe Asd'}
      goBackScreen
      style={{backgroundColor: COLOR.white}}>
      {renderListVideo()}
    </AppContainer>
  );
}
