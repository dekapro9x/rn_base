import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {useQuery} from 'react-query';
import {Loading} from '../../elements';
import {NetworkError} from '../../elements/NetworkError';
import {FetchApi} from '../../utils/modules/FetchAPI';
const queryCache = new QueryCache();
export default function ReactQuery(props) {
  function ExampleReactQuery(props) {
    const {isLoading, error, data} = useQuery('repoData', async () => {
      const response = await FetchApi.getListVideo(1, 10);
      console.log('response', response);
      return response.data.content;
    });
    if (isLoading) return <Loading></Loading>;
    if (error) return <NetworkError></NetworkError>;
    console.log('data', data);
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}></View>
    );
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <ExampleReactQuery></ExampleReactQuery>
      </View>
    </ReactQueryCacheProvider>
  );
}
