//Library:
import React from 'react';

//Component:
import PolicyHTML from './items/PolicyHTML';
import {AppHeader} from '../../elements/AppHeader';

export default function Policy({navigation, route}) {
  return (
    <>
      <AppHeader title={'POLICY'} leftGoBack={false}></AppHeader>
      <PolicyHTML navigation={navigation} />
    </>
  );
}
