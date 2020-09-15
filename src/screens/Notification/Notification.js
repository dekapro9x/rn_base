//Library:
import React, {useState, useRef, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';

//Setup:
import {COLOR, FetchApi} from '../../utils';

//Component:
import ReloadDataScreen from '../../elements/ReloadData';
import {AppContainer, Loading} from '../../elements';
import {ItemNoti} from './items/ItemNoti';
import NotiImportant from './items/NotiImportant';
import {NetworkError} from '../../elements/NetworkError';

//Screen:
function Notifications({route}) {
  const [loading, setStateLoading] = useState(true);
  const [isLoadingRefresh, setStateIsLoadingRefresh] = useState(false);
  const [
    dataPageNormalNotification,
    setStateDataPageNormalNotification,
  ] = useState([]);
  const [
    dataImportantNotification,
    setStateDataImportantNotification,
  ] = useState([]);
  const [loadNextPage, setStateLoadNextPage] = useState(false);
  const [nameScreen, setStateName] = useState('');
  const errorView = useRef(false);
  const page = useRef(1);
  const totalPage = useRef(1);
  const size = useRef(10);

  useEffect(() => {
    onDidMount();
    return () => {};
  }, []);
  const onDidMount = async () => {
    await getNameScreen();
    await getData();
  };

  //Lấy tên màn hình:
  const getNameScreen = () => {
    const {name} = route.params.itemMenu;
    setStateName(name);
  };

  //Lấy danh sách thông báo từ API:
  const getData = async (loadRefresh) => {
    if (loadRefresh) {
      page.current = 1;
      errorView.current = false;
      setStateLoading(false);
      setStateIsLoadingRefresh(true);
    } else {
      errorView.current = false;
      setStateLoading(true);
    }
    const response = await FetchApi.getListNoti(size.current, page.current);
    if (response && response.code == 1000 && response.status_code == 200) {
      const {content, totalPages} = response.data.PageNormalNotification;
      totalPage.current = totalPages;
      setStateDataImportantNotification([
        ...response.data.ListImportantNotification,
      ]);
      setStateDataPageNormalNotification([...content]);
      setStateLoading(false);
    } else {
      errorView.current = true;
      setStateLoading(false);
    }
  };

  //Lấy thêm danh sách thông báo:
  const nextPage = async () => {
    setStateLoadNextPage(true);
    let nextPage = page.current + 1;
    const response = await FetchApi.getListNoti(size.current, nextPage);
    if (response.status_code === 200 && response.code === 1000) {
      const {content} = response.data.PageNormalNotification;
      page.current++;
      setStateDataPageNormalNotification([
        ...dataPageNormalNotification,
        ...content,
      ]);
      setStateLoadNextPage(false);
    } else {
      errorView.current(true);
      setStateLoadNextPage(false);
    }
  };

  //Tải lại danh sách:
  const refreshPage = () => {
    page.current = 1;
    getData();
  };

  //Tải lại danh sách từ đầu nếu trống:
  const pressReloadData = () => {
    getData();
  };

  //Khóa Key:
  const keyExtractor = (item, index) => `${index}${item.id}`;

  //Item Noti:
  const renderItem = ({item, index}) => {
    return <ItemNoti item={item} index={index} nameScreenDetail={nameScreen} />;
  };

  //Hiển thị thông báo quan trọng:
  const renderListNotiImportant = () => {
    if (dataImportantNotification && dataImportantNotification.length > 0) {
      return (
        <NotiImportant
          dataImportantNotification={dataImportantNotification}
          nameScreenDetail={nameScreen}
        />
      );
    }
    return null;
  };

  //Nội dung trang thông báo:
  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (errorView.current) {
      return (
        <NetworkError
          title={
            'ただいま大変混み合っております。しばらく経ってから再度お試しください。'
          }
          onPress={() => getData()}
        />
      );
    }
    if (
      dataPageNormalNotification &&
      dataPageNormalNotification.length == 0 &&
      dataImportantNotification &&
      dataImportantNotification.length == 0 &&
      !errorView.current
    ) {
      return (
        <ReloadDataScreen
          title={'データがありません'}
          iconName={'reload'}
          onPress={pressReloadData}
        />
      );
    }
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataPageNormalNotification}
        ListFooterComponent={() => (loadNextPage ? <Loading /> : null)}
        ListHeaderComponent={() => {
          return renderListNotiImportant();
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingRefresh}
            onRefresh={() => refreshPage()}
          />
        }
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={() => {
          if (totalPage.current > page.current && !loadNextPage) {
            nextPage();
          }
        }}
        onEndReachedThreshold={0.2}
      />
    );
  };

  return (
    <AppContainer
      haveTitle
      nameScreen={nameScreen}
      goBackScreen
      style={{backgroundColor: COLOR.red}}>
      {renderContent()}
    </AppContainer>
  );
}

export default Notifications;
