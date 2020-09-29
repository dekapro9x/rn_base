import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {AppContainer, Loading} from '../../elements';
import {COLOR, SIZE} from '../../utils';
import DataStore from './items/DataStore';
import ItemStore from './items/ItemStore';

export default function DirectionMap() {
  const [isLoadingRefresh, setStateIsLoadingRefresh] = useState(false);
  const [loadNextPage, setStateLoadNextPage] = useState(false);
  //Tải lại danh sách:
  const refreshPage = () => {};
  const nextPage = () => {};
  const renderItem = ({item, index}) => {
    return <ItemStore item={item} index={index}></ItemStore>;
  };

  return (
    <AppContainer
      haveTitle
      nameScreen={'DirectionMap'}
      goBackScreen
      style={{backgroundColor: COLOR.width}}>
      <FlatList
        data={DataStore}
        renderItem={(item, index) => renderItem(item, index)}
        // ListHeaderComponent={() => {}}
        contentContainerStyle={{paddingBottom: SIZE.width(15)}}
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={100}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        keyExtractor={(item, index) => `${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingRefresh}
            onRefresh={() => refreshPage()}
          />
        }
        onEndReached={() => {}}
        ListFooterComponent={() => (loadNextPage ? <Loading /> : null)}
      />
    </AppContainer>
  );
}
