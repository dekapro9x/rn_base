const changeObject = {};
let isVisible = true;

function broadcast() {
  Object.keys(changeObject).forEach(k => changeObject[k]());
}

const VisibleActionService = {
  get: () => isVisible,
  set: async data => {
    isVisible = data;
  },

  setAndBroadcast: async data => {
    isVisible = data;
    broadcast();
  },

  onChange: (key, cb) => {
    changeObject[key] = () => cb(isVisible);
  },

  deleteKey: key => {
    if (changeObject[key]) {
      delete changeObject[key];
    }
  },
};

export {VisibleActionService};
