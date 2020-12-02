import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import {Loading} from '../../../elements';
import {NetworkError} from '../../../elements/NetworkError';
import {FetchApi} from '../../../utils/modules/FetchAPI';
export default function ExampleReactQuery(props) {
  const {children} = props;
  const {isLoading, error, data} = useQuery('repoData', async () => {
    let x = FetchApi.getListVideo(1, 10);
    const response = await x;
    console.log('response', response);
    return response.data.content;
  });
  if (isLoading) return <Loading></Loading>;
  if (error) return <NetworkError></NetworkError>;
  console.log('data', data);
  return (
    <TouchableOpacity
      onPress={useQuery}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}></TouchableOpacity>
  );
}
