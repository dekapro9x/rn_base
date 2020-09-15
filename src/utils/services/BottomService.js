const changeObject = {};
let showBottom = true;
function broadcast() {
  Object.keys(changeObject).forEach((k) => changeObject[k]());
}
const BottomService = {
  get: () => showBottom,
  set: async (event) => {
    showBottom = event;
  },
  setDisplay: async (event) => {
    showBottom = event;
    broadcast();
  },
  onChange: (key, cb) => {
    changeObject[key] = () => cb(showBottom);
  },
  deleteKey: (key) => {
    if (changeObject[key]) {
      delete changeObject[key];
    }
  },
};

export {BottomService};
