import React, {useState} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import {AppContainer, Loading} from '../../elements';
import ItemAnimation from './items/ItemAnimation';
import {COLOR, SIZE} from '../../utils';
import DataAnimation from './utils/DataAnimation';

export default function DirectionMap() {
  const [showList, setStateShowList] = useState(false);
  const [nameScreen, setStateNameScreen] = useState('Menu Animation');
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemMenuAnimationClick, setStateItemMenuAnimationClick] = useState({});
  const [
    itemAnimationRenderOnModal,
    setStateItemAnimationRenderOnModal,
  ] = useState({});

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
    setStateNameScreen(`rn-${item.name.slice(13, item.name.length)}`);
    setStateItemMenuAnimationClick(item);
  };

  //Hiển thị modal mô phỏng hiệu ứng.
  const pressShowModalAnimation = (item, index) => () => {
    setModalVisible(true);
    setStateItemAnimationRenderOnModal(item);
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
        pressShowModalAnimation={pressShowModalAnimation(item, index)}
        item={item}
        index={index}></ItemAnimation>
    );
  };

  //Hiển thị Modal:
  const renderModal = () => {
    return (
      <Modal
        deviceWidth={SIZE.width(100)}
        isVisible={isModalVisible}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          {itemAnimationRenderOnModal.component}
          <TouchableOpacity
            onPress={unVisibleModal}
            style={{
              height: SIZE.height(8),
              width: SIZE.width(40),
              backgroundColor: 'red',
              marginLeft: SIZE.width(24),
            }}></TouchableOpacity>
        </View>
      </Modal>
    );
  };

  // Danh sách hiệu ứng:
  const renderListAnimation = () => {
    return (
      <FlatList
        data={itemMenuAnimationClick.data}
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
              }}>
              <LinearGradient
                style={{
                  flex: 1,
                  width: SIZE.width(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                colors={['#fe8c00', '#f83600']}>
                <Text style={{fontSize: SIZE.H4, color: COLOR.COLOR_BLUE}}>
                  Go back menu animation
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
        {renderListAnimation()}
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
      />
    </AppContainer>
  );
}
