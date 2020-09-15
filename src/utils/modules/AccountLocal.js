import AsyncStorage from '@react-native-community/async-storage';
import {KEY_ASYNC_STORE} from '../keys';

const AccountLocal = {
  save: async (account) => {
    const accountJson = JSON.stringify(account);
    try {
      const result = await AsyncStorage.setItem(
        KEY_ASYNC_STORE.account,
        accountJson,
      );
      return result;
    } catch (error) {
      return error;
    }
  },

  remove: () => {
    AsyncStorage.removeItem(KEY_ASYNC_STORE.account);
  },

  get: async () => {
    try {
      const result = await AsyncStorage.getItem(KEY_ASYNC_STORE.account);

      if (result) {
        const account = JSON.parse(result);
        return account;
      }
    } catch (error) {
      return null;
    }
  },
};

export {AccountLocal};
