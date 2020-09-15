import {AccountLocal} from '../modules/AccountLocal';

const changeList = {};

let account = null;

function broadcastList() {
  Object.keys(changeList).forEach((k) => changeList[k]());
}

const AccountService = {
  init: async () => {
    const acc = await AccountLocal.get();
    account = acc;
    return account;
  },
  getAccount: () => account,
  setAccount: async (account1) => {
    account = account1;
    await AccountLocal.save(account1);
  },
  updateAccount: async (newAccount) => {
    account = newAccount;
    await AccountLocal.save(newAccount);
    broadcastList();
  },

  onChangeAcount: (key, cb) => {
    changeList[key] = () => cb(account);
  },

  deleteKey: (key) => {
    if (changeList[key]) {
      delete changeList[key];
    }
  },
};

export {AccountService};
