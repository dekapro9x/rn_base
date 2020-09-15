//Library:
import React from 'react';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';

//Setup:
import {AppContext} from './contexts/AppContext';

import RootNavigator from './navigators/RootNavigator';

enableScreens();

const App = () => {
  return (
    <AppContext>
      <RootNavigator />
    </AppContext>
  );
};

export default App;
