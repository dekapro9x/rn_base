import React, {useState} from 'react';
import {FlatList, Text, View, TouchableOpacity, Animated} from 'react-native';
import Modal from 'react-native-modal';

import {AppContainer, Loading} from '../../elements';
import ItemAnimation from './items/ItemAnimation';
import {COLOR, SIZE} from '../../utils';
import DataAnimation from './utils/DataAnimation';

export default function DirectionMap() {
  const [showList, setStateShowList] = useState(false);
  const [nameScreen, setStateNameScreen] = useState('Menu Animation');
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemAnimationClick, setStateItemAnimationClick] = useState({});

  //Tắt modal:
  const unVisibleModal = () => {
    setModalVisible(false);
    setStateShowList(true);
  };

  //Hiển thị danh sách Animation:
  const visibleListAnimation = () => {
    setStateShowList(false);
    setStateNameScreen('Menu Animation');
  };

  //Hiển thị danh sách ItemAnimation:
  const pressShowListItemAnimation = (item) => () => {
    setStateShowList(true);
    setStateNameScreen('List Animation');
    setStateItemAnimationClick(item);
  };

  //Hiển thị modal mô phỏng hiệu ứng.
  const pressShowModalAnimation = () => {
    setModalVisible(true);
  };

  //Item Menu Animtaion:
  const renderItemMenuAnimation = ({item, index}) => {
    return (
      <View
        style={{
          height: SIZE.height(8),
          width: SIZE.width(100),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLOR.app_orange,
          marginBottom: SIZE.width(0.5),
        }}>
        <Text onPress={pressShowListItemAnimation(item)}>{item.name}</Text>
      </View>
    );
  };

  //Item Animation:
  const renderItemAnimation = ({item, index}) => {
    return (
      <ItemAnimation
        pressShowModalAnimation={pressShowModalAnimation}
        item={item}
        index={index}></ItemAnimation>
    );
  };

  //Hiển thị Modal:
  const renderModal = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={unVisibleModal}
          style={{height: 100, width: 100, backgroundColor: 'red'}}>
          <Text>I am the modal content!</Text>
        </TouchableOpacity>
      </Modal>
    );
  };

  // Danh sách hiệu ứng:
  const renderListAnimation = (itemAnimationClick) => {
    return (
      <FlatList
        data={itemAnimationClick.data}
        renderItem={(item, index) => renderItemAnimation(item, index)}
        contentContainerStyle={{paddingBottom: SIZE.width(15)}}
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={100}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={() => {}}
        ListFooterComponent={() => <Loading />}
        ListHeaderComponent={() => {
          return (
            <TouchableOpacity
              onPress={visibleListAnimation}
              style={{
                height: SIZE.height(6),
                width: SIZE.width(100),
                backgroundColor: COLOR.BG_TRANSPARENT_20,
              }}></TouchableOpacity>
          );
        }}
      />
    );
  };

  if (showList) {
    return (
      <AppContainer
        haveTitle
        nameScreen={nameScreen}
        style={{backgroundColor: COLOR.TRANSPARENT}}>
        {renderListAnimation(itemAnimationClick)}
        {renderModal()}
      </AppContainer>
    );
  }

  return (
    <AppContainer
      haveTitle
      goBackScreen
      nameScreen={nameScreen}
      style={{backgroundColor: COLOR.white}}>
      <FlatList
        data={DataAnimation}
        renderItem={(item, index) => renderItemMenuAnimation(item, index)}
        contentContainerStyle={{paddingBottom: SIZE.width(15)}}
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={100}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={() => {}}
        // ListFooterComponent={() => <Loading />}
      />
    </AppContainer>
  );
}
